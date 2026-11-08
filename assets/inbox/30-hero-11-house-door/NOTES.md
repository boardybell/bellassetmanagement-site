# Brief 30: hero front door correction

Generated with the built-in image generation tool. No color grading or other post-processing was applied to the delivered PNGs.

## Outputs

| File | Pixel dimensions | Format |
| --- | --- | --- |
| raw-1.png | 1536 x 1024 | PNG |
| raw-2.png | 1536 x 1024 | PNG |

Both outputs retain the full 3:2 landscape frame. The prompts requested the largest native resolution available; the tool returned 1536 x 1024 pixels. The delivered files are unscaled tool outputs.

Both entrances were inspected in enlarged crops before saving the final variants. Each shows one white leaf with four panels and an uninterrupted center stile, with no vertical meeting seam. The crops were used only for inspection and are not deliverables.

## Exact prompt for raw-1.png

Inputs, in order: _ref/a-current.png as the edit target, and _ref/b-real-door.png as the architectural reference.

```text
Use case: precise-object-edit.
Edit target: Image 1, a-current.png, the full landscape photograph of the white house at dusk.
Architectural reference only: Image 2, b-real-door.png. Use only its single-door construction and panel proportions. Do not reproduce the reference photograph, daylight, mailbox, black hardware, porch objects, or framing.

Make one extremely localized correction to the front entrance under the portico in Image 1. Repaint the existing door as ONE SINGLE white painted door leaf with exactly FOUR raised panels in exactly TWO ROWS and TWO COLUMNS. The TOP ROW consists of TWO TALL vertical panels, each extending continuously from near the top of the door down to approximately two-thirds of the door height. The BOTTOM ROW consists of TWO SHORT rectangular panels. There is only ONE horizontal cross rail between these two rows. The top panels have no horizontal subdivisions. DO NOT add a row of small panels above the tall panels. This is a FOUR-panel door, never a six-panel door. Match the four-panel arrangement visible in Image 2. Both pairs are part of the same continuous slab. Between the left and right panels is a solid, broad, uninterrupted white center stile. There must be NO center seam, NO central crack, NO central dark line, NO meeting edges, NO split, and nothing that reads as paired doors. The white center stile is visibly continuous through the horizontal middle rail. Only the outside perimeter has a door-to-frame gap.

Match the real entrance's narrow sidelight windows and flat white entablature, keeping their existing placement, perspective, scale and foreground column occlusion in Image 1. Add only a very small muted warm-brass thumb-latch pull close to the LEFT outer edge of the single leaf, and one tiny warm-brass knocker centered in its upper part. The hardware must be subtle at this wide viewing distance, warm brass rather than dark or black. No hardware on the center line except the tiny upper knocker. Eliminate the erroneous extra handles. Keep entrance trim clean, with no mailbox.

Freeze every pixel outside the front entrance correction as faithfully as possible. Preserve the entire original house, siding, portico, columns, capitals, balcony, balustrade, brackets, hanging lantern, shutters, roof, both chimneys, trees, foliage, lawn, sky, dusk exposure, window glow, color, shadows, texture, perspective, composition and framing. Preserve the original foreground columns exactly, including their occlusion of the entrance. No global color grading, relighting, sharpening, reinterpretation, reframing or cropping.

Return one full landscape photograph at the largest native resolution supported by the image tool, maintaining Image 1's exact 3:2 aspect ratio and full composition. Do not return a close-up, collage, comparison, annotated image or reference photo. No people, text, house numbers, mailbox, TV antenna, vehicles, logos or watermark.
```

## Exact prompt for raw-2.png

Input: raw-1.png, the first edited version of _ref/a-current.png. This additional built-in edit produced the second variant.

```text
Use case: precise-object-edit.
Edit target: the supplied full landscape house photograph, raw-1.png, which is an edited version of a-current.png.
Make only this tiny hardware correction: on the LEFT outer edge of the single white front door under the portico, replace the small round handle with a miniature, slender, warm-brass THUMB-LATCH PULL. It has a short vertical grip with a tiny thumbpiece above, about 8 pixels high at this 1536-pixel image width. Mount it on the actual door leaf, at approximately x=934, y=710 in the original frame. Its color is muted warm gold, with no black hardware. Retain the tiny brass knocker centered above.

The door already has the correct FOUR raised panels. Preserve these exact FOUR panels: TWO continuous TALL panels in the TOP row and TWO SHORT panels in the BOTTOM row. Preserve its solid uninterrupted white center stile. Keep the door as a SINGLE leaf with NO center seam, crack, vertical meeting line or second handle. Do not add any panel subdivisions or extra top row.

Preserve everything else in the supplied photograph exactly, including door geometry, sidelights, flat entrance entablature, foreground column occlusion, house, siding, all portico columns and capitals, balcony, brackets, lantern, shutters, roof, chimneys, trees, lawn, sky, dusk lighting, warm window glow, colors, shadows, composition and framing. No grading, relighting, cropping or reframing. Keep the original 3:2 landscape frame and use the largest native resolution supported by the image tool. Return one full landscape photograph, no close-up or comparison. No people, text, house numbers, mailbox, TV antenna, vehicles, logos or watermark.
```

