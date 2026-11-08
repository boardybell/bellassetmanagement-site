# Archived design iterations

Bond chose iteration 11 (Portico, modeled on a Greek Revival house with an Ionic portico) on
2026-11-07. It is now the site at the root (`src/pages/index.astro`, `src/styles/portico.css`).
The other designs are kept here for reference and are not built or deployed.

- `pages/`: the Astro pages for iterations 01 to 11 and the gallery index, as they were.
- `styles/`: each iteration's stylesheet and layout components, plus `registry.ts` (names and layout notes).
- `gallery-cards/`, `gallery-full/`: the desktop and mobile screenshots shown in the gallery.
- `gallery-shots.mjs`: the script that made them.

The files here reference paths that no longer exist under `src/`. To see the full gallery exactly as it
was, check out the tag instead:

```sh
git checkout gallery-final
npm ci && npm run build && npx astro preview
# open http://localhost:4321/bellassetmanagement-site/iterations/
```
