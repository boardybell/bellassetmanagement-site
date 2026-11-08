# Brief 06: hero 05-lake

You are the illustrator. Work ONLY inside the current directory. Do not read or write anything outside it except `_ref/`.

## Purpose
Iteration 05 (Architectural family). Split-screen hero: shown as the LEFT half of the screen, cropped to roughly 4:5 portrait from the center. Keep the subject centered.
The site is for Bell Asset Management, a private holding company. Restrained, cinematic, architectural photography.

## Subject
A still alpine lake at first light below a sharp mountain range, faint mist on the water, a few dark conifers at the shoreline. Landscape only, no buildings, no boats.

## Method
1. Use your built-in image generation tool to create the photograph, landscape 1536x1024, photographic realism, natural lens, no stylization.
2. Save the untouched result as `raw-1.png`. Generate a second, different variant as `raw-2.png`.
3. Grade each with Python (use `python3`, it has pillow) to the palette below and save `graded-1.png`, `graded-2.png` (same size). Add a very fine monochrome film grain (amplitude about 2%) so gradients do not band.
NAVY GRADE: map the image to a duotone/tritone of #0D1626 (deepest shadows) -> #16233B (shadows and mids) -> a cool stone highlight no brighter than #C9CCD3 with only the very brightest highlights reaching #FDF6EC. Overall it must read dark navy like the reference `_ref/bbco-hero.jpg`, with large calm dark areas suitable for cream text set over them.

## Must not appear
No people or body parts, no silhouettes of people, no animals, no vehicles, no text, letters, numbers, signage, logos, or watermarks, no flags. No hue outside the palette after grading. No modern glass towers. Nothing cropped awkwardly at the frame edges.

## Report
Write `NOTES.md`: the exact prompt you used for each variant and how you graded it.
