// Generates codex-briefs/02..NN hero briefs from one table so every brief carries the same rules.
import { writeFileSync } from 'node:fs';
const GRADES = {
  navy: 'NAVY GRADE: map the image to a duotone/tritone of #0D1626 (deepest shadows) -> #16233B (shadows and mids) -> a cool stone highlight no brighter than #C9CCD3 with only the very brightest highlights reaching #FDF6EC. Overall it must read dark navy like the reference `_ref/bbco-hero.jpg`, with large calm dark areas suitable for cream text set over them.',
  warm: 'WARM GRADE: map the image to a tritone of #14120F (shadows) -> #6E6759 / #8A6425 (mids, warm stone and gold-brown) -> #FDF6EC (highlights). No blue, green, red, or saturated orange anywhere. It must sit quietly on a #FDF6EC page.',
};
const heroes = [
  ['02', '01-colonnade', 'navy', 'Iteration 01 (Ledger family). Full-bleed hero; the thesis line will be set in cream over the LEFT 45% of the frame, so the left 45% must be deep, calm, nearly flat navy shadow with no detail that would fight type.', 'A classical stone colonnade seen from a low oblique angle at dusk: fluted columns receding to the right, a plain entablature above, long shadows. Match the architectural style, angle, and mood of `_ref/bbco-hero.jpg` closely, but a different building and composition.'],
  ['03', '02-cornice', 'navy', 'Iteration 02 (Ledger family). Wide hero band, text sits below the image, not over it.', 'Looking up at the corner of a carved limestone cornice and pediment against a dark evening sky: egg-and-dart moulding, dentils, a single crisp raking light from the left. Same building language as `_ref/bbco-hero.jpg`.'],
  ['04', '03-stair', 'warm', 'Iteration 03 (Ledger family). Small inset plate, roughly 4:5 portrait crop from the center of the frame, shown at about 420 px wide next to large type. Keep the subject centered.', 'A short flight of worn pale limestone steps with a long late-afternoon shadow falling diagonally across them, a plain stone wall beside. Quiet, very simple.'],
  ['05', '04-timber', 'warm', 'Iteration 04 (Architectural family). Large image-led hero with a gold hairline caption beneath.', 'High-country architecture: the ends of heavy dark timber roof beams projecting over a dry-laid granite wall, golden hour light raking across the stone, a sliver of pale sky. Rugged, quiet, mountain-west.'],
  ['06', '05-lake', 'navy', 'Iteration 05 (Architectural family). Split-screen hero: shown as the LEFT half of the screen, cropped to roughly 4:5 portrait from the center. Keep the subject centered.', 'A still alpine lake at first light below a sharp mountain range, faint mist on the water, a few dark conifers at the shoreline. Landscape only, no buildings, no boats.'],
  ['07', '06a-threshold', 'warm', 'Iteration 06 (Architectural family), image 1 of 4 in a scroll sequence. Each image fills a sticky panel; keep the subject centered with calm edges.', 'A deep stone doorway seen from inside: a bright rectangle of daylight, thick walls, light spilling across a stone floor.'],
  ['08', '06b-fence', 'warm', 'Iteration 06, image 2 of 4 in the same sequence (must feel like the same series as 06a: same grade, similar calm).', 'A weathered split-rail timber fence crossing a snow-covered meadow, low winter sun, long blue-free shadows on the snow.'],
  ['09', '06c-river', 'warm', 'Iteration 06, image 3 of 4 in the same sequence.', 'Smooth river stones in shallow clear water, close and overhead, soft light, the water surface barely visible.'],
  ['10', '06d-barn', 'warm', 'Iteration 06, image 4 of 4 in the same sequence.', 'The plain gable end of an old timber barn with vertical board siding, late light, a single small window, nothing else.'],
  ['11', '07-door', 'warm', 'Iteration 07 (Typographic family). The single accent image on an otherwise all-type page, shown as a narrow vertical band or small plate. Keep the subject centered.', 'A heavy bronze door pull on a dark oak plank door, raking light picking out the grain and the metal, very close crop.'],
  ['12', '08-horizon', 'navy', 'Iteration 08 (Typographic family, horizontal rules as structure). Shown as a very wide, short band (about 4:1). The horizon line should sit near the vertical middle.', 'A flat snowfield meeting a dark sky at a perfectly level horizon at blue hour, a faint line of distant low hills, almost abstract, mostly empty.'],
  ['13', '09-granite', 'navy', 'Iteration 09 (Inverse family, navy ground). Shown framed inside thin gold corner marks on a #16233B page, about 16:9.', 'The rusticated granite base and tall arched window of an old bank building at night, seen square-on, heavy blocks, deep shadows. Same building language as `_ref/bbco-hero.jpg`.'],
  ['14', '10-arcade', 'navy', 'Iteration 10 (Inverse family). Full-bleed navy hero that the page later transitions out of into cream.', 'A long barrel-vaulted stone arcade receding into darkness, repeating arches, a soft pool of light on the floor at the far end. Same building language as `_ref/bbco-hero.jpg`.'],
];
for (const [n, slug, grade, purpose, subject] of heroes) {
  writeFileSync(`codex-briefs/${n}-hero-${slug}.md`, `# Brief ${n}: hero ${slug}

You are the illustrator. Work ONLY inside the current directory. Do not read or write anything outside it except \`_ref/\`.

## Purpose
${purpose}
The site is for Bell Asset Management, a private holding company. Restrained, cinematic, architectural photography.

## Subject
${subject}

## Method
1. Use your built-in image generation tool to create the photograph, landscape 1536x1024, photographic realism, natural lens, no stylization.
2. Save the untouched result as \`raw-1.png\`. Generate a second, different variant as \`raw-2.png\`.
3. Grade each with Python (use \`python3\`, it has pillow) to the palette below and save \`graded-1.png\`, \`graded-2.png\` (same size). Add a very fine monochrome film grain (amplitude about 2%) so gradients do not band.
${GRADES[grade]}

## Must not appear
No people or body parts, no silhouettes of people, no animals, no vehicles, no text, letters, numbers, signage, logos, or watermarks, no flags. No hue outside the palette after grading. No modern glass towers. Nothing cropped awkwardly at the frame edges.

## Report
Write \`NOTES.md\`: the exact prompt you used for each variant and how you graded it.
`);
}
console.log(heroes.length, 'briefs written');
