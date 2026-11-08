# Bell Asset Management wordmarks

All lettering is outlined from the supplied SIL Open Font License fonts. SVGs contain paths with no text elements or font references. Main words use large initials and optically weighted smaller capitals. Descriptor: IBM Plex Sans Medium (500). Each descriptor has two separate horizontal rules.

Transparent PNGs preserve the lockup aspect ratio and are centered in the requested canvases. Preview panels use cream and navy.

## wm-01
PlayfairDisplay: initial weight 400, smaller-cap weight 460; smaller caps 77% of initial height. Main tracking 1, word gap 28, based on 100-unit initials. Descriptor HOLDING COMPANY, cap height 17, tracking 6.2. Each rule is 212.8 units. Single main line. Close to the reference lockup proportions.

## wm-02
LibreBodoni: initial weight 450, smaller-cap weight 500; smaller caps 78% of initial height. Main tracking 1.2, word gap 28, based on 100-unit initials. Descriptor HOLDING COMPANY, cap height 17, tracking 6.4. Each rule is 222.4 units. Single main line. Close to the reference lockup proportions. Libre Bodoni fallback with same-color round contour reinforcement, total stroke width 4.5% of each glyph cap height.

## wm-03
LibreBodoni: initial weight 400, smaller-cap weight 480; smaller caps 80% of initial height. Main tracking 0.7, word gap 25, based on 100-unit initials. Descriptor HOLDING COMPANY, cap height 16, tracking 4.7. Each rule is 185.0 units. Single main line.

## wm-04
PlayfairDisplay: initial weight 450, smaller-cap weight 500; smaller caps 70% of initial height. Main tracking 1.8, word gap 29, based on 100-unit initials. Descriptor JACKSON, WYOMING, cap height 16, tracking 7. Each rule is 236.8 units. Single main line.

## wm-05
LibreBodoni: initial weight 450, smaller-cap weight 500; smaller caps 76% of initial height. Main tracking 1.5, word gap 25, based on 100-unit initials. Descriptor HOLDING COMPANY, cap height 15, tracking 5. Each rule is 109.3 units. Stacked BELL over ASSET MANAGEMENT. Libre Bodoni fallback with same-color round contour reinforcement, total stroke width 4.5% of each glyph cap height.

## Monograms
01: Playfair Display B, weight 450, generous clear space.
02: Bodoni Moda B, weight 450 and optical size 48, inside a fine square frame.
03: Libre Bodoni BAM fallback, equal-height capitals, weight 500; round contour reinforcement at 4.5% of each glyph cap height.
Each proposal has navy on cream and cream on navy square SVGs, plus 256-pixel PNG previews.

The build script is included for reproducibility.

## Brief 01b verification
Bodoni Moda at opsz 11, weight 500 still has 39-unit serifs against a 1500-unit cap height (2.60%). Libre Bodoni at weight 500 has 27.5-unit serifs against a 754-unit cap height (3.65%). Neither unmodified font meets the floor. Options 02, 05 and monogram 03 therefore use Libre Bodoni with same-color round contour reinforcement at 4.5% of each glyph cap height. This is vector path styling, with no text or font dependency.
Minimum sustained hairlines are measured from CairoSVG alpha masks at 400 px cap height, threshold 128/255, using horizontal and vertical cross-sections sustained for 8% of cap height, with diagonal slope correction. Pointed contour ends are excluded because their mathematical width approaches zero. Quantization uncertainty is approximately 0.25 percentage points. The 6% floor applies to the rebuilt lettering; unchanged options and decorative rules retain brief 01 styling.

| Weight | Glyph | Minimum hairline / cap height |
| --- | --- | --- |
| 450 | A | 7.99% |
| 450 | B | 8.00% |
| 450 | E | 8.00% |
| 450 | G | 7.98% |
| 450 | L | 8.00% |
| 450 | M | 8.00% |
| 450 | N | 8.00% |
| 450 | S | 8.71% |
| 450 | T | 8.00% |
| 500 | A | 8.00% |
| 500 | B | 8.23% |
| 500 | E | 8.24% |
| 500 | G | 8.00% |
| 500 | L | 8.23% |
| 500 | M | 8.23% |
| 500 | N | 8.23% |
| 500 | S | 8.82% |
| 500 | T | 8.23% |

Descriptor IBM Plex Sans 500: minimum sustained hairline 13.25% of cap height across HOLDING COMPANY.

| Rebuilt artwork | Minimum main hairline / cap | Equivalent thickness at 300 px SVG width |
| --- | --- | --- |
| wm-02 | 7.98% | 1.205 px (small-cap hairline) |
| wm-05 | 7.98% | 1.480 px (small-cap hairline) |
| monogram-03 | 8.00% | 6.750 px |

Each final black wordmark SVG was also rendered at exactly 300 px wide with CairoSVG. The paired monogram 03 was checked as black on transparency at the same 300 px square size. Each glyph path in options 02, 05 and monogram 03 remains visible and forms one connected component at alpha >= 16/255, including the wordmark descriptors. The exact test rasters are in validation/. Unchanged wordmarks 01, 03 and 04 were rendered and inspected but are outside this re-brief stroke repair.
wordmark-comparison.png contains all five options. wordmark-small.png stacks all five black SVGs at exactly 240 px wide on #FDF6EC. The monogram comparison has also been refreshed.
At these widths, fractional-pixel strokes use antialiasing. The 6% geometric floor does not imply one fully opaque device pixel in every small descriptor stroke.
