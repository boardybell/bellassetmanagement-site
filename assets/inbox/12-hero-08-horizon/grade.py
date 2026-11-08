from PIL import Image
import random

ANCHORS = [0, 35, 105, 220, 255]
COLORS = [(13, 22, 38), (22, 35, 59), (57, 73, 96), (201, 204, 211), (253, 246, 236)]

for variant in (1, 2):
    source = Image.open(f'raw-{variant}.png').convert('RGB')
    assert source.size == (1536, 1024), source.size
    rng = random.Random(1208 + variant)
    pixels = []
    for r, g, b in source.getdata():
        value = max(0, min(255, 0.299*r + 0.587*g + 0.114*b + rng.uniform(-5.1, 5.1)))
        index = next((i for i in range(4) if value <= ANCHORS[i+1]), 3)
        fraction = (value - ANCHORS[index]) / (ANCHORS[index+1] - ANCHORS[index])
        pixels.append(tuple(round(a + fraction*(z-a)) for a, z in zip(COLORS[index], COLORS[index+1])))
    result = Image.new('RGB', source.size)
    result.putdata(pixels)
    result.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {result.size}, RGB, channel extrema {result.getextrema()}')
