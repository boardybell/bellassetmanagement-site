# Brief 12: hero 08-horizon

You are the illustrator. Work ONLY inside the current directory. Do not read or write anything outside it except `_ref/`.

## Purpose
Iteration 08 (Typographic family, horizontal rules as structure). Shown as a very wide, short band (about 4:1). The horizon line should sit near the vertical middle.
The site is for Bell Asset Management, a private holding company. Restrained, cinematic, architectural photography.

## Subject
A flat snowfield meeting a dark sky at a perfectly level horizon at blue hour, a faint line of distant low hills, almost abstract, mostly empty.

## Method
1. Use your built-in image generation tool to create the photograph, landscape 1536x1024, photographic realism, natural lens, no stylization.
2. Save the untouched result as `raw-1.png`. Generate a second, different variant as `raw-2.png`.
3. Grade each with Python (use `python3`, it has pillow) to the palette below and save `graded-1.png`, `graded-2.png` (same size). Add a very fine monochrome film grain (amplitude about 2%) so gradients do not band.
NAVY GRADE: map the image to a duotone/tritone of #0D1626 (deepest shadows) -> #16233B (shadows and mids) -> a cool stone highlight no brighter than #C9CCD3 with only the very brightest highlights reaching #FDF6EC. Overall it must read dark navy like the reference `_ref/bbco-hero.jpg`, with large calm dark areas suitable for cream text set over them.

## Must not appear
No people or body parts, no silhouettes of people, no animals, no vehicles, no text, letters, numbers, signage, logos, or watermarks, no flags. No hue outside the palette after grading. No modern glass towers. Nothing cropped awkwardly at the frame edges.

## Report
Write `NOTES.md`: the exact prompt you used for each variant and how you graded it.
