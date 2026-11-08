from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent
STOPS = np.array([0.0, 0.50, 0.85, 0.985, 1.0])
COLORS = np.array([[13, 22, 38], [22, 35, 59], [55, 70, 94],
                   [201, 204, 211], [253, 246, 236]], dtype=float)

for variant in (1, 2):
    source = Image.open(ROOT / f'raw-{variant}.png').convert('RGB')
    assert source.size == (1536, 1024)
    rgb = np.asarray(source, dtype=float) / 255.0
    luminance = rgb @ np.array([0.2126, 0.7152, 0.0722])
    white = np.percentile(luminance, 99.995)
    tone = np.clip(luminance / white, 0, 1) ** 1.55
    # One scalar noise field perturbs tone before palette mapping, so grain
    # cannot introduce hues outside the specified continuous palette.
    rng = np.random.default_rng(1400 + variant)
    grain = rng.uniform(-0.02, 0.02, tone.shape)
    tone = np.clip(tone + grain, 0, 1)
    output = np.stack([np.interp(tone, STOPS, COLORS[:, c])
                       for c in range(3)], axis=-1)
    output = np.rint(output).astype(np.uint8)
    Image.fromarray(output).save(ROOT / f'graded-{variant}.png')
    print(f'graded-{variant}.png: {source.size}; white={white:.6f}; '
          f'{100 * np.mean(tone <= 0.5):.2f}% in deepest navy range')
