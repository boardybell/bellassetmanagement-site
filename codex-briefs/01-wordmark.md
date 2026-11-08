# Brief 01: Bell Asset Management wordmark

You are the letterer. Work ONLY inside the current directory. Do not touch anything outside it.

## Purpose
A wordmark for Bell Asset Management, a private holding company. It must read as a sibling of the Bond Bell & Co logo in `_ref/bbco-logo-black.png`: high-contrast didone-style serif capitals (large initial caps, smaller caps for the rest of each word, like "BOND BELL & CO."), and beneath it a spaced small-cap sans descriptor flanked by two short horizontal rules, one on each side (not one continuous rule).

## Text
- Main line: BELL ASSET MANAGEMENT
- Descriptor line beneath: HOLDING COMPANY  (alternatives you may also try on one option: JACKSON, WYOMING)

## Method (required)
Build real vector lettering, not AI-generated text. Use Python with fontTools from this interpreter: `python3` (it has fontTools, brotli, cairosvg, pillow). Fonts in `_ref/` (all SIL Open Font License):
- PlayfairDisplay[wght].ttf (variable, use wght 400 to 500 instances), PlayfairDisplaySC-Regular.ttf
- BodoniModa[opsz,wght].ttf, LibreBodoni[wght].ttf
- IBMPlexSans[wdth,wght].ttf (descriptor line, weight 500)
Convert glyphs to SVG `<path>` outlines (no `<text>`, no font references in the final SVG). Kern and letterspace by eye; optical small caps (scale caps down and slightly embolden or use the SC font) so stroke weights match.

## Options
Produce 5 options, named `wm-01` to `wm-05`. Vary: typeface (Playfair vs Bodoni Moda vs Libre Bodoni), cap-height ratio of small caps, descriptor tracking, rule length, whether the main line is one line or stacked BELL / ASSET MANAGEMENT. At least two should be very close to the BB&Co lockup proportions.

## Deliverables per option (in `wm-NN/`)
- `wm-NN-black.svg` (fill #14120F, transparent background, tight viewBox with even padding)
- `wm-NN-cream.svg` (fill #FDF6EC)
- `wm-NN-black-1335x250.png`, `wm-NN-black-2670x500.png`, `wm-NN-cream-1335x250.png`, `wm-NN-cream-2670x500.png` (transparent, the lockup centered, aspect preserved, rendered with cairosvg)
- also one `wm-NN-preview.png` 1600x900: the black version on #FDF6EC above the cream version on #16233B.

Also produce, in `monogram/`, 3 monogram proposals for a favicon (a single "B" or "BAM" device) as SVG, fill #16233B on #FDF6EC square and the reverse.

## Must not appear
No other text, no people, no imagery, no watermarks, no colors other than #14120F, #FDF6EC, #16233B, #B98B3E. No em dashes in any file.

Finish by writing `NOTES.md` listing each option and its typeface and choices.
