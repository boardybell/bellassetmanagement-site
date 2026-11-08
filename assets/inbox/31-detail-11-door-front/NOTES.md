# Brief 31: thumb-latch pull, straight-on view

## Outputs

| File | Pixel dimensions | Format |
| --- | --- | --- |
| raw-1.png | 1024 x 1536 | PNG |
| raw-2.png | 1024 x 1536 | PNG |

Created with the built-in image generation tool. The largest native portrait resolution was requested; the tool returned 1024 x 1536 for both outputs. The final PNGs are unchanged copies of the generated files, without resampling or color grading.

Before saving, both complete images and enlarged handle crops were visually inspected. In both final variants the top and bottom plates are vertically aligned, and the grip runs straight between them without a sideways bow. No scores or rankings were assigned.

The original photograph is `_ref/a-current.png`. The Yale reference and problem crop were used to understand the construction and incorrect orientation. None of the reference photographs is included as an inset or separate panel in the outputs.

## Exact prompts used for the final variants

Both variants share the first two passes below. Each final pass used the result of the common size-adjustment pass as its edit target. All calls used `transparent_background: false` and local referenced image paths.

### Common first pass

Edit target: `_ref/a-current.png`.

```text
Use case: precise-object-edit.
EDIT ONLY THE SMALL DOOR HANDLE in the supplied full portrait photograph. Return the complete photograph, with the original framing and all other pixels preserved as closely as possible.
Replace the existing bent brass pull with an antique Yale 2531 thumb latch seen absolutely square-on from the front. The required silhouette is a STRAIGHT VERTICAL GRIP. Its left and right edges run straight vertically, with zero sideways bow, zero arc, and no diagonal slant. The top attachment, midpoint, and bottom attachment are collinear at one single x-coordinate. A narrow vertical highlight and subtle side shadow show that the grip stands off the door. The outward curvature is in depth only and is invisible as a lateral curve in this frontal view.
The complete fitting is small: approximately 64 pixels tall on this 1024 by 1536 source photograph. Center it at x=426, y=759. The top of the leaf-shaped thumb lever is around y=727, the top square plate centered at x=426, y=737, and the bottom square plate centered at x=426, y=786. Each plate is a small square, about 10 by 10 pixels, with screw heads. Keep both square plate centers EXACTLY vertically aligned at x=426. The grip between them is a narrow STRAIGHT VERTICAL brass bar, centered at x=426 throughout its length. The thumb lever points up and a little outward toward the viewer. Include a tiny bottom scroll viewed head-on and centered on the same vertical axis. The whole assembly, including thumb lever and scroll, is about one eighth of the door height, like an 11-inch fitting on an 80-inch door. Use warm aged brass, gentle patina, and soft existing lighting.
Completely remove the original larger bowed handle and restore the small exposed area of white paint. The replacement stays on the left side of the door leaf close to its edge, below and left of the knocker.
Preserve exactly the single-leaf four-panel door with NO center seam, the weathered brass knocker, sidelights, reflections, columns, lantern, brackets, shutters, clapboards, porch floor, steps, doormat, shadows, colors, camera viewpoint, and framing. Do not change anything beyond the handle and its immediate tiny shadow. No color grading.
Output one portrait 2:3 image at the largest native portrait size supported by the tool, preferably 2048 by 3072 if available. No crop, inset, detail view, diagram, collage, reference photo, tabletop, people, text, numbers, mailbox, logos, watermark, or added objects.
```

### Common size-adjustment pass

Edit target: the generated result of the common first pass.

```text
Use case: precise-object-edit.
Make one tiny local correction to the supplied full portrait door photograph: reduce the size of the brass thumb-latch handle on the left edge of the white door leaf. Keep its center in exactly the same place. Scale the ENTIRE handle assembly, including both square screw plates, leaf thumb lever, straight grip, and small lower scroll, uniformly to 72 percent of its current height and width. Its total height must be about one eighth of the door leaf height, approximately 64 to 66 pixels on this 1024 by 1536 photograph, equivalent to an 11-inch handle on an 80-inch door. Restore the white door paint where the previous larger handle was.
Preserve the already-correct frontal geometry: two small square brass escutcheon plates with screws centered exactly one above the other, a narrow nearly straight vertical grip sharing the same vertical axis, a leaf-shaped thumb lever pointing up and slightly outward toward the viewer, and a little bottom scroll. The grip's center must remain on the vertical line through both plate centers. No sideways curve, bow, diagonal, or lateral offset. Its standoff from the door is conveyed by soft shading and a restrained highlight. Retain warm aged brass with patina and a realistic antique Yale 2531 character.
Change only this handle and its tiny immediate shadow. Preserve the exact single-leaf four-panel door with NO central seam, the weathered brass knocker, sidelights, reflections, columns, lantern, brackets, shutters, clapboards, brick floor, brick steps, doormat, light, colors, and full original framing. Do not retouch any other part of the photograph. No color grading.
Return one full 2:3 PORTRAIT photograph at the largest native resolution the tool supports. No zoom, crop, inset, comparison, copied reference photos, people, text, numbers, mailbox, logo, watermark, or added objects.
```

### raw-1.png final pass

Edit target: the generated result of the common size-adjustment pass.

```text
Use case: precise-object-edit.
Edit only the small brass door handle in this full portrait photo. Make the complete handle assembly 15 percent shorter and 15 percent narrower, retaining the same center point on the left edge of the door leaf. This last small size adjustment should make its total height approximately one eighth of the door leaf height, about 11 inches on an 80-inch door. The top leaf-shaped thumb lever, both small square screw plates, straight vertical grip, and tiny lower scroll all belong to this compact assembly.
Keep the top and bottom square escutcheon plates exactly aligned on one vertical axis. Keep the main grip straight vertically with absolutely no sideways bow or diagonal drift. Its soft highlight and small cast shadow convey projection toward the viewer. Preserve the leaf thumb lever pointing upward and slightly outward, and the little rolled scroll at the bottom viewed square-on. Maintain photorealistic warm aged brass with patina.
Preserve everything outside the handle and its immediate tiny shadow exactly, including all white door paint and four panel moldings, the single door leaf with NO center seam, brass knocker, sidelights and reflections, columns, lantern, brackets, shutters, clapboards, doormat, brick floor, steps, lighting, colors, perspective, and framing. Restore only the tiny areas exposed by shrinking the handle. No color grading or other retouching.
Return one full-frame 2:3 PORTRAIT photograph at the largest native portrait resolution the tool supports. No crop or zoom. No reference-photo insert, comparison panel, people, text, numbers, mailbox, logos, watermark, or new objects.
```

### raw-2.png final pass

Edit target: the generated result of the common size-adjustment pass.

```text
Use case: precise-object-edit.
Edit only the small brass door handle in this full portrait photo. Make the complete handle assembly 15 percent shorter and 15 percent narrower, retaining the same center point on the left edge of the door leaf. This last small size adjustment should make its total height approximately one eighth of the door leaf height, about 11 inches on an 80-inch door. The top leaf-shaped thumb lever, both small square screw plates, straight vertical grip, and tiny lower scroll all belong to this compact assembly.
Keep the top and bottom square escutcheon plates exactly aligned on one vertical axis. Keep the main grip straight vertically with absolutely no sideways bow or diagonal drift. Its soft highlight and small cast shadow convey projection toward the viewer. Preserve the leaf thumb lever pointing upward and slightly outward, and the little rolled scroll at the bottom viewed square-on. Maintain photorealistic warm aged brass with patina.
Preserve everything outside the handle and its immediate tiny shadow exactly, including all white door paint and four panel moldings, the single door leaf with NO center seam, brass knocker, sidelights and reflections, columns, lantern, brackets, shutters, clapboards, doormat, brick floor, steps, lighting, colors, perspective, and framing. Restore only the tiny areas exposed by shrinking the handle. No color grading or other retouching.
Return one full-frame 2:3 PORTRAIT photograph at the largest native portrait resolution the tool supports. No crop or zoom. No reference-photo insert, comparison panel, people, text, numbers, mailbox, logos, watermark, or new objects.
Variant detail: within the brass hardware only, allow a subtle alternate distribution of the existing aged patina and restrained warm highlights. Keep its shape, scale, and straight vertical alignment identical to the requested geometry.
```

## Earlier regenerated attempt

An earlier candidate still showed a sideways bow when enlarged and was not saved as a final variant. Its exact prompt is retained below for completeness. Input images, in order: `_ref/a-current.png`, `_ref/b-yale-2531.png`, `_ref/c-problem-crop.png`.

```text
Use case: precise-object-edit.
Create one photorealistic edited variant of Image 1, a-current.png. Edit only the existing small brass thumb-latch handle on the left edge of the central white door leaf.
Input roles: Image 1 is the only edit target and the complete composition to preserve. Image 2, b-yale-2531.png, is a reference for the antique Yale 2531 handle's construction, square screw plates, leaf thumb lever, scroll terminal, and aged brass finish. Its tabletop side view is NOT the orientation to render. Image 3, c-problem-crop.png, shows the incorrect sideways-bowing handle to replace; do NOT reproduce that bowed silhouette.
Correct front elevation: the Yale 2531 is mounted on the vertical door and viewed square-on from directly in front. Its S-curve projects perpendicular to the door surface, toward the viewer, not across the door. From this view the main grip is nearly straight and strictly vertical. Put the two small square brass escutcheon plates, each with visible screw heads, exactly above one another on the same vertical centerline. The grip runs straight up and down along that shared centerline between the plates. Its middle must not drift to the right or left. Convey its standoff depth only through soft shading, a narrow warm highlight, and a subtle cast shadow. Include the little leaf-shaped thumb lever rising from the top plate, pointing up and slightly outward toward the viewer, plus the small bottom scroll terminal tucked along the vertical axis.
Position and size: retain the existing handle location close to the left edge of the single door leaf, below and left of the knocker. Make the complete assembly about one eighth of the door leaf height, approximately an 11-inch handle on an 80-inch door. In the 1024 by 1536 input, its centerline is approximately x=426 and its center approximately y=759, with total height about 64 to 66 input pixels. Remove the old sideways bow cleanly and restore the surrounding white door paint. Do not alter the door panel moldings.
Materials: warm aged brass with natural patina, soft photographic shading matching the existing light. Use the reference's antique character without a bright modern polished finish.
Strict preservation: change only this handle and its immediate shadow. Preserve the exact photograph, single-leaf four-panel white door with NO central seam, weathered brass knocker, sidelights and their reflections, columns, lantern, black brackets, shutters, clapboards, brick porch floor, brick steps, doormat, light, colors, perspective, and full framing. Do not redraw, recompose, crop, zoom, relight, sharpen, or color-grade the rest.
Output: one portrait image in the original 2:3 aspect ratio at the largest native portrait resolution available. Keep the entire original scene. No inset, no comparison panel, no copied reference photo, no tabletop. No people, text, numbers, mailbox, logo, watermark, added objects, or other changes.
```

