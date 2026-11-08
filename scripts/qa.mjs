#!/usr/bin/env node
// Quality gate for every page in dist/. Prints a pass/fail table and exits non-zero on any failure.
//
//   node scripts/qa.mjs                      all pages, all checks
//   node scripts/qa.mjs --only iterations/03 limit to pages whose path contains this
//   node scripts/qa.mjs --no-lighthouse      skip Lighthouse (fast loop while building)
//   node scripts/qa.mjs --no-shots           skip the 7-width screenshot set
//   node scripts/qa.mjs --no-external        skip checking external links over the network
//
// Requires a fresh build (npm run build, or SITE_MODE=production npm run build).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { HtmlValidate } from 'html-validate';

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
process.env.SITE_MODE ||= readFileSync('SITE_MODE', 'utf8').trim();
const PROD = process.env.SITE_MODE === 'production';
const BASE = PROD ? '' : '/bellassetmanagement-site';
const PORT = 4329;
const ORIGIN = `http://localhost:${PORT}`;
const DIST = 'dist';
const OUT = 'qa-report';
const WIDTHS = [320, 390, 768, 1024, 1440, 1920, 2560];

const BANNED = [
  /\bclients?\b/i, /\badvisory\b/i, /manage(s|d)? portfolios?/i, /investment strateg/i, /\breturns?\b/i,
  /\bperformance\b/i, /wealth management/i, /\bexclusive\b/i, /\belite\b/i, /world[- ]class/i,
  /passionate/i, /\bguarantee/i, /\bAUM\b/, /assets under management/i, /best[- ]in[- ]class/i, /!/,
];

if (!existsSync(DIST)) { console.error('No dist/. Run the build first.'); process.exit(2); }
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'shots'), { recursive: true });

// ---------- collect pages ----------
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const pages = htmlFiles
  .map((f) => { const rel = relative(DIST, f); const route = rel === '404.html' ? '/404.html' : '/' + rel.replace(/index\.html$/, ''); return { file: f, route, path: BASE + route }; })
  .filter((p) => !only || p.route.includes(only));
const isRedirect = (html) => /http-equiv="refresh"/i.test(html);

const results = []; // { page, check, ok, detail }
const record = (page, check, ok, detail = '') => results.push({ page, check, ok, detail: String(detail).slice(0, 400) });

// ---------- static checks ----------
const htmlvalidate = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: { 'no-inline-style': 'off', 'doctype-style': 'off', 'void-style': 'off', 'attribute-boolean-style': 'off', 'no-trailing-whitespace': 'off', 'long-title': 'off', 'tel-non-breaking': 'off' },
});
const strip = (h) => h.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
const textOf = (h) => strip(h).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
const attrs = (h) => [...h.matchAll(/\s(?:alt|title|content|aria-label|placeholder)="([^"]*)"/g)].map((m) => m[1]).join(' ');
const pageTitle = (h) => (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim() ?? '';

const byRoute = new Map(pages.map((p) => [p.route, p]));
const allRoutes = new Map(htmlFiles.map((f) => { const rel = relative(DIST, f); return ['/' + rel.replace(/index\.html$/, ''), f]; }));

for (const p of pages) {
  const html = readFileSync(p.file, 'utf8');
  const name = p.route;
  if (isRedirect(html)) { record(name, 'redirect page', true, 'meta refresh, skipped content checks'); continue; }

  const report = await htmlvalidate.validateString(html, p.file);
  const msgs = report.results.flatMap((r) => r.messages.map((m) => `${m.ruleId}: ${m.message} (line ${m.line})`));
  record(name, 'html-validate', report.valid, msgs.slice(0, 4).join(' | '));

  const visible = textOf(html) + ' ' + attrs(html);
  const em = /—/.test(html) || /(^|[^-<!])--([^->]|$)/.test(textOf(html));
  record(name, 'no em dashes', !em, em ? (html.match(/.{0,40}(—|--).{0,40}/) || [''])[0] : '');

  const artifacts = [/(^|\s)---(\s|$)/, /\{\{/, /\{%/, /\* \* \*/, /\b(title|layout|slug|date):\s/].filter((r) => r.test(textOf(html)));
  record(name, 'no template artifacts', artifacts.length === 0, artifacts.join(' '));

  // Banned words: entity-scoped copy for Bond Bell & Co LLC is exempt (data-entity="bbco"), as is the legal footer.
  const scoped = strip(html).replace(/<([a-z]+)[^>]*data-entity="(bbco|legal)"[\s\S]*?<\/\1>/gi, ' ');
  const hits = BANNED.filter((r) => r.test(textOf(scoped) + ' ' + attrs(scoped))).map(String);
  record(name, 'no banned words', hits.length === 0, hits.join(' '));

  // Retired positioning (owner's copy revision, 2026-11-07). Scans everything, footer included.
  // "Bell Family Office" is a proper name and is not matched.
  const RETIRED = [/Bell family's/i, /family's own/i, /family's (operating|enterprises|businesses)/i, /privately held holding/i, /holds nothing/i, /sells nothing/i, /this site exists/i, /operating companies/i, /does not lead anywhere/i, /contact@bellassetmanagement/i, /mailto:/i];
  const stale = RETIRED.filter((r) => r.test(textOf(html) + ' ' + attrs(html)) || (/mailto/.test(String(r)) && r.test(html))).map(String);
  record(name, 'no retired positioning', stale.length === 0, stale.join(' '));

  if (PROD) record(name, 'no [CONFIRM] placeholders', !/\[CONFIRM/.test(html), '');

  const title = pageTitle(html);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => (textOf(m[1]) + ' ' + [...m[1].matchAll(/alt="([^"]*)"/g)].map((a) => a[1]).join(' ')).replace(/\s+/g, ' ').trim());
  const head = title.split(' · ')[0].trim();
  const titleOk = h1s.length === 1 && (h1s[0].toLowerCase().includes(head.toLowerCase()) || (name.endsWith('404.html') && /not found/i.test(h1s[0])));
  record(name, 'title matches h1', titleOk, `title="${title}" h1=${JSON.stringify(h1s)}`);

  const metaOk = ['name="description"', 'rel="canonical"', 'property="og:title"', 'property="og:image"', 'name="twitter:card"', 'rel="manifest"', 'rel="icon"', 'rel="apple-touch-icon"'].filter((k) => !html.includes(k));
  record(name, 'head metadata', metaOk.length === 0, metaOk.join(' '));
  const isGallery = !PROD || name.startsWith('/iterations');
  const noindex = /name="robots" content="noindex/.test(html);
  record(name, isGallery ? 'noindex present (gallery)' : 'indexable (production)', isGallery ? noindex : !noindex, '');

  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const badImg = imgs.filter((i) => !/\swidth="\d+"/.test(i) || !/\sheight="\d+"/.test(i) || !/\salt(="|\s|>|\/)/.test(i));
  record(name, 'img width/height/alt', badImg.length === 0, badImg.slice(0, 2).join(' '));

  const ext = [...html.matchAll(/<a\b[^>]*href="(https?:[^"]+)"[^>]*>/g)];
  const badExt = ext.filter((m) => !/rel="[^"]*noopener/.test(m[0])).map((m) => m[1]);
  record(name, 'external links rel=noopener', badExt.length === 0, badExt.join(' '));

  // Nav labels: link text must match the target page's h1/title, and the URL slug must match the label.
  const navs = [...html.matchAll(/<nav\b[\s\S]*?<\/nav>/g)].map((m) => m[0]).join(' ');
  const navLinks = [...navs.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], label: textOf(m[2]).replace(/\s+/g, ' ').trim() })).filter((l) => l.label && !/^https?:/.test(l.href) && !/^mailto:/.test(l.href));
  const navBad = [];
  const norm = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  for (const l of navLinks) {
    const [pathPart, hash] = l.href.split('#');
    const label = norm(l.label);
    if (pathPart === '' && hash) {
      const sec = html.match(new RegExp(`id="${hash}"[\\s\\S]*?<h[1-3][^>]*>([\\s\\S]*?)<\\/h[1-3]>`));
      if (!sec || !norm(textOf(sec[1])).includes(label)) navBad.push(`${l.label} -> #${hash}`);
      continue;
    }
    const route = pathPart.replace(BASE, '') || '/';
    const target = allRoutes.get(route);
    if (!target) { navBad.push(`${l.label} -> ${l.href} (missing)`); continue; }
    const th = readFileSync(target, 'utf8');
    const tTitle = norm(pageTitle(th));
    const slug = norm(route.split('/').filter(Boolean).pop() || 'home');
    const homeish = /^\d+$/.test(slug) || route === '/' || slug === 'iterations';
    const titleMatch = tTitle.includes(label) || (homeish && (label === 'home' || label.includes('bell asset management') || label === 'overview'));
    const slugMatch = homeish || label.includes(slug) || slug.includes(label);
    if (!titleMatch || !slugMatch) navBad.push(`"${l.label}" -> ${route} (title "${pageTitle(th)}")`);
  }
  record(name, 'nav labels match title and URL', navBad.length === 0, navBad.join(' | '));
}

// Copy scan of source: em dashes in code comments, alt text, anything under src/.
const srcFiles = walk('src').filter((f) => /\.(astro|ts|css|mjs|md)$/.test(f));
const srcEm = srcFiles.filter((f) => /—/.test(readFileSync(f, 'utf8')));
record('(source)', 'no em dashes in src', srcEm.length === 0, srcEm.join(' '));

// Required root files
for (const f of ['robots.txt', 'site.webmanifest', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-512.png', 'share-card.png', ...(PROD ? ['CNAME', 'sitemap-index.xml'] : [])]) {
  record('(root)', `file ${f}`, existsSync(join(DIST, f)), '');
}

// ---------- serve ----------
// Astro 7 preview runs as a background daemon; stop any leftover one so we always serve this dist/.
const stopPreview = () => { try { execSync('npx astro preview stop', { stdio: 'ignore' }); } catch {} };
stopPreview();
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: ['ignore', 'pipe', 'pipe'], env: process.env });
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('preview did not start')), 30000);
  const on = (d) => { if (String(d).includes(String(PORT))) { clearTimeout(t); res(); } };
  server.stdout.on('data', on); server.stderr.on('data', on);
});
const cleanup = () => { try { server.kill(); } catch {} stopPreview(); };
process.on('exit', cleanup);

// ---------- link crawl ----------
{
  const { LinkChecker } = await import('linkinator');
  const checker = new LinkChecker();
  const start = `${ORIGIN}${BASE}/`; // always crawl the whole site from the root
  const r = await checker.check({ path: start, recurse: true, timeout: 15000, linksToSkip: flag('--no-external') ? ['^(?!http://localhost)'] : ['^mailto:', '^https://boardybell\\.github\\.io', '^https://bellassetmanagement\\.com'] /* own canonical/og URLs: checked after deploy */, retry: true });
  const broken = r.links.filter((l) => l.state === 'BROKEN').map((l) => `${l.status} ${l.url} (from ${l.parent})`);
  record('(crawl)', `links resolve (${r.links.length} checked)`, broken.length === 0, broken.slice(0, 5).join(' | '));
}

// ---------- browser checks ----------
const browser = await chromium.launch();
for (const p of pages) {
  const html = readFileSync(p.file, 'utf8');
  if (isRedirect(html)) continue;
  const name = p.route;
  const shotDir = join(OUT, 'shots', name.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_') || 'root');
  mkdirSync(shotDir, { recursive: true });

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const consoleMsgs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) consoleMsgs.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => consoleMsgs.push(`pageerror: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/404.html') && !name.endsWith('404.html')) consoleMsgs.push(`${r.status()} ${r.url()}`); });
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(ORIGIN + p.path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Reveal timing: each [data-reveal] must be fully visible within 600ms of entering the viewport.
  const slow = await page.evaluate(async () => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    const late = [];
    for (const el of els) {
      el.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 600));
      if (parseFloat(getComputedStyle(el).opacity) < 0.99) late.push(el.tagName + '.' + el.className);
    }
    window.scrollTo(0, 0);
    return late;
  });
  record(name, 'reveals complete within 600ms', slow.length === 0, slow.slice(0, 3).join(' '));

  const cls = await page.evaluate(() => window.__cls);
  record(name, 'CLS 0.00', cls < 0.005, cls.toFixed(4));

  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  record(name, 'axe-core (AA + best practice)', axe.violations.length === 0, axe.violations.map((v) => `${v.id} x${v.nodes.length}: ${v.nodes[0]?.target}`).join(' | '));
  // AAA contrast for body text on cream.
  const aaa = await new AxeBuilder({ page }).withRules(['color-contrast-enhanced']).include('main p:not(.meta)').analyze();
  record(name, 'AAA contrast on body text (p:not(.meta))', aaa.violations.length === 0, aaa.violations.flatMap((v) => v.nodes.slice(0, 3).map((n) => `${n.target}: ${n.any[0]?.message}`)).join(' | '));

  // Gold below 24px must be gold-ink. Text set in #B98B3E on light grounds under 24px fails.
  const goldSmall = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => {
    const s = getComputedStyle(e); if (!e.childNodes.length || ![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
    return s.color === 'rgb(185, 139, 62)' && parseFloat(s.fontSize) < 24 && !e.closest('[data-ground="dark"]');
  }).map((e) => e.tagName + '.' + e.className).slice(0, 3));
  record(name, 'no small gold on light ground', goldSmall.length === 0, goldSmall.join(' '));

  // Keyboard: every focusable element reachable and shows a visible focus style.
  const focusIssues = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('a[href],button,[tabindex="0"]')) {
      if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') continue;
      el.focus({ focusVisible: true });
      const s = getComputedStyle(el);
      if (document.activeElement === el && s.outlineStyle === 'none' && s.boxShadow === 'none' && !el.matches('.skip')) out.push(el.outerHTML.slice(0, 60));
    }
    return out;
  });
  await page.evaluate(() => document.activeElement?.blur());
  record(name, 'visible focus states', focusIssues.length === 0, focusIssues.slice(0, 2).join(' | '));

  // Visual checks at every width: horizontal overflow, clipped text, overlapping text, text touching the viewport edge.
  const visual = [];
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: w < 768 ? 844 : 900 });
    await page.evaluate(() => { window.scrollTo(0, 0); document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('in')); });
    await page.waitForTimeout(650);
    const issues = await page.evaluate(() => {
      const out = [];
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > vw + 1) out.push(`horizontal scroll ${document.documentElement.scrollWidth}>${vw}`);
      const boxes = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const n = walker.currentNode; if (!n.textContent.trim()) continue;
        const el = n.parentElement; const s = getComputedStyle(el);
        if (s.visibility === 'hidden' || s.display === 'none' || el.closest('.visually-hidden,.skip,[aria-hidden="true"],[hidden]')) continue;
        const r = document.createRange(); r.selectNodeContents(n);
        for (const b of r.getClientRects()) {
          if (b.width < 1 || b.height < 1) continue;
          boxes.push({ el, b, t: n.textContent.trim().slice(0, 30) });
          if (b.left < 4 || b.right > vw - 4) out.push(`text at viewport edge: "${n.textContent.trim().slice(0, 30)}"`);
        }
        // clipping: element narrower than its content
        if (el.scrollWidth > el.clientWidth + 1 && ['hidden', 'clip'].includes(s.overflowX) && s.textOverflow !== 'ellipsis') out.push(`clipped: "${n.textContent.trim().slice(0, 30)}"`);
      }
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], c = boxes[j];
        if (a.el === c.el || a.el.contains(c.el) || c.el.contains(a.el)) continue;
        const ox = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left);
        const oy = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top);
        if (ox > 2 && oy > 2) out.push(`overlap: "${a.t}" / "${c.t}"`);
      }
      return [...new Set(out)].slice(0, 6);
    });
    if (issues.length) visual.push(`${w}px: ${issues.join('; ')}`);
    if (!flag('--no-shots')) await page.screenshot({ path: join(shotDir, `${w}.png`), fullPage: true });
  }
  record(name, `no overflow/clip/overlap at ${WIDTHS.length} widths`, visual.length === 0, visual.slice(0, 3).join(' || '));

  // Mobile menu must be keyboard operable if present.
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = await page.$('[data-menu-toggle]');
  if (menu && await menu.isVisible()) {
    await menu.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
    const expanded = await menu.getAttribute('aria-expanded');
    const firstLinkVisible = await page.evaluate(() => { const id = document.querySelector('[data-menu-toggle]').getAttribute('aria-controls'); const a = document.getElementById(id)?.querySelector('a'); return !!a && a.getBoundingClientRect().height > 0 && getComputedStyle(a).visibility !== 'hidden'; });
    await page.keyboard.press('Escape'); await page.waitForTimeout(200);
    const closed = await menu.getAttribute('aria-expanded');
    record(name, 'mobile menu keyboard operable', expanded === 'true' && firstLinkVisible && closed === 'false', `open=${expanded} link=${firstLinkVisible} esc=${closed}`);
  }

  record(name, 'zero console errors/warnings', consoleMsgs.length === 0, consoleMsgs.slice(0, 3).join(' | '));
  await ctx.close();

  // Without JavaScript nothing may stay invisible.
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const np = await nojs.newPage();
  await np.goto(ORIGIN + p.path, { waitUntil: 'load' });
  const hidden = await np.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
  record(name, 'content visible without JS', hidden === 0, `${hidden} hidden`);
  await nojs.close();
}
await browser.close();

// ---------- Lighthouse ----------
if (!flag('--no-lighthouse')) {
  const lighthouse = (await import('lighthouse')).default;
  const desktopConfig = (await import('lighthouse/core/config/desktop-config.js')).default;
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-first-run'] });
  for (const p of pages) {
    if (isRedirect(readFileSync(p.file, 'utf8'))) continue;
    for (const form of ['mobile', 'desktop']) {
      // Gallery pages are deliberately noindex; skip only that one SEO audit there and say so.
      const skip = !PROD || p.route.startsWith('/iterations') || p.route.endsWith('404.html') ? ['is-crawlable'] : [];
      const cfg = form === 'desktop' ? { ...desktopConfig, settings: { ...desktopConfig.settings, skipAudits: skip } } : { extends: 'lighthouse:default', settings: { skipAudits: skip } };
      const r = await lighthouse(ORIGIN + p.path, { port: chrome.port, output: 'json', logLevel: 'error' }, cfg);
      const c = r.lhr.categories;
      const scores = ['performance', 'accessibility', 'best-practices', 'seo'].map((k) => Math.round((c[k]?.score ?? 0) * 100));
      const fails = Object.values(r.lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual').map((a) => a.id).slice(0, 5);
      record(p.route, `lighthouse ${form} ${scores.join('/')}${skip.length ? ' (is-crawlable skipped: noindex by design)' : ''}`, scores.every((s) => s >= 95), fails.join(' '));
    }
  }
  await chrome.kill();
}
cleanup();

// ---------- report ----------
writeFileSync(join(OUT, 'report.json'), JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
const byPage = new Map();
for (const r of results) { if (!byPage.has(r.page)) byPage.set(r.page, { pass: 0, fail: [] }); const e = byPage.get(r.page); r.ok ? e.pass++ : e.fail.push(r); }
console.log('\nPAGE'.padEnd(46) + 'PASS  FAIL');
for (const [pg, e] of byPage) console.log(pg.padEnd(45) + String(e.pass).padStart(4) + String(e.fail.length).padStart(6) + (e.fail.length ? '  ✗' : '  ✓'));
if (failed.length) {
  console.log('\nFAILURES');
  for (const f of failed) console.log(`✗ ${f.page}  [${f.check}]  ${f.detail}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots: ${OUT}/shots/`);
process.exit(failed.length ? 1 : 0);
