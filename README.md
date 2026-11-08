# Bell Asset Management website

Static Astro site for Bell Asset Management, deployed to GitHub Pages by GitHub Actions.

## Run

```sh
npm ci
npm run dev            # http://localhost:4321/bellassetmanagement-site/ in gallery mode
npm run build          # mode comes from the SITE_MODE file (gallery | production)
SITE_MODE=production npm run build
```

`SITE_MODE` (file at the repo root) switches the whole build:

| | gallery | production |
|---|---|---|
| site | https://boardybell.github.io | https://bellassetmanagement.com |
| base | /bellassetmanagement-site | / |
| robots | every page noindex | indexable, sitemap emitted |
| archive | none | dated snapshot committed to `archive/YYYY-MM-DD/` on deploy |

## Quality gate

```sh
npm run build && npm run qa                 # everything, prints a pass/fail table
node scripts/qa.mjs --only iterations/04    # one iteration
node scripts/qa.mjs --no-lighthouse         # fast loop
```

Checks: html-validate, em dashes (built HTML and `src/`), banned words (Bond Bell & Co copy marked `data-entity="bbco"` and the legal footer are exempt), template artifacts, title vs h1, nav label vs page title and URL, head metadata, noindex policy, img dimensions and alt, `rel="noopener"`, link crawl, console errors, CLS, axe-core, AAA contrast on body text (`p:not(.meta)`), small gold on light ground, focus styles, overflow/clip/overlap at 320 to 2560 px with full-page screenshots in `qa-report/shots/`, reveal timing, no-JS visibility, mobile menu keyboard operation, Lighthouse mobile and desktop.

Gallery pages are noindex by design, so Lighthouse's `is-crawlable` audit is skipped for them only (the report says so). Production pages run the full SEO category.

## Content

All copy lives in `src/content/site.ts`. Iterations read from it, so a wording change lands everywhere at once. Placeholders are written `[CONFIRM: ...]` and fail the production QA.

## Assets

- `codex-briefs/` every brief sent to Codex, numbered. Run one with `scripts/codex-run.sh codex-briefs/NN-slug.md`; output lands in `assets/inbox/NN-slug/` (the Codex CLI ships inside ChatGPT.app).
- Review every image before promotion: dimensions, palette, no people, no text, clean edges.
- `node scripts/promote-asset.mjs assets/inbox/.../graded-1.png <name> --aspect 16:9` crops and resizes into `src/assets/img/`. Astro `<Picture>` emits AVIF, WebP and JPEG at 640/1024/1600/2400 with intrinsic dimensions.
- `node scripts/make-icons.mjs <monogram.svg>` writes the favicon set; `node scripts/make-share-card.mjs <wordmark-cream.svg>` writes the 1200x630 share card.
- `node scripts/gen-fonts.mjs` regenerates `src/styles/fonts.css` with metrics-matched fallback faces.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes with `actions/deploy-pages`. Pages source must be set to GitHub Actions.

## Compliance archive

Every production publish commits a static copy of `dist/` to `archive/YYYY-MM-DD/` (same convention as bondbellandco.com). Retired design iterations live in `archive/iterations/` and are not deployed.
