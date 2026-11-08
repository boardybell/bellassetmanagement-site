# Brief 12: hero 08-horizon

Generated with the built-in image generation tool. Raw PNGs are untouched byte copies of its outputs; both are 1536×1024.

## Exact prompt — variant 1

Create a photographic image, exactly 1536x1024 landscape. Use case: photorealistic-natural. A flat pristine snowfield meeting a dark blue-hour sky at a perfectly level horizon, a faint thin line of very distant low hills, almost abstract, mostly empty. Restrained cinematic landscape photography for Bell Asset Management, a private holding company. Natural 50mm lens, realistic optical detail, no stylization. Horizon exactly at vertical midpoint; designed for a very wide short 4:1 center crop with horizon in its middle. Smooth dark cloudless sky, subtly wind-smoothed snow with almost imperceptible horizontal texture, no dominant foreground objects, hills extremely low. Cool blue-hour exposure, subdued snow and large calm dark areas suitable for cream text overlay. No sun, moon or stars. No people, body parts, human silhouettes, animals, vehicles, buildings, towers, trees, text, letters, numbers, signs, logos, watermarks or flags. Nothing awkward at frame edges. Save the untouched generated PNG directly to assets/inbox/12-hero-08-horizon/raw-1.png if possible.

## Exact prompt — variant 2

Create a new independent photographic variant, exactly 1536x1024 landscape. Use case: photorealistic-natural. An immense flat snowfield beneath a dark overcast sky at late blue hour. Perfectly horizontal horizon exactly halfway up the frame, barely visible distant low hills forming a fine dark thread; hills a little more visible toward the left and dissolving into haze toward the right. Almost abstract, mostly empty. Restrained cinematic architectural sensibility for a private holding company website. Natural 50mm lens, photographic realism, no stylization. Designed for a very wide 4:1 central band crop with the horizon centered. Snow is smooth with delicate wind-polished texture, no tracks, no dramatic drifts; sky has a faint broad horizontal veil of cloud, no dramatic cloud formations. Underexposed cool navy atmosphere, subtle tonal separation, large calm dark areas suitable for cream text overlay. No sun, moon, stars, people, body parts, human silhouettes, animals, vehicles, buildings, towers, trees, text, letters, numbers, signs, logos, watermarks or flags. No awkwardly cropped objects at edges. Save the untouched generated PNG directly to assets/inbox/12-hero-08-horizon/raw-2.png if possible.

## Grading

Run `grade.py` with `python3`. Pillow converts each image to luminance (Rec. 601 coefficients). Luminance is mapped through a continuous palette ramp with input anchors 0, 35, 105, 220, 255 and output colors #0D1626, #16233B, #394960, #C9CCD3, #FDF6EC. This preserves the deliberately low exposure without stretching the snow to white. Cream is reserved for input values above 220; these subdued scenes do not need to reach it.

Fine deterministic monochrome grain is added to the scalar luminance before palette mapping: uniform ±5.1 levels (2% of 255), seed 1208 plus variant number. All RGB channels derive from the same scalar and palette ramp, preventing stray hues. Images retain original dimensions; no cropping, resizing, sharpening, or geometry changes.

For the intended 4:1 hero use a centered 1536×384 crop (y=320 through 703) or centered object-fit cover. Horizon sits near y=512, the band midpoint. Variant 1 has a smoother clear sky; variant 2 has a faint horizontal cloud veil and more visible left hills.

