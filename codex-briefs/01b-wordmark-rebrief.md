# Brief 01b: wordmark re-brief (rejections from review)

Work ONLY inside the current directory. Reuse and edit `build_wordmarks.py`.

## Rejected
- wm-02 and wm-05 (Bodoni Moda, optical size 72): hairlines on A, M, N, V-shapes nearly vanish. At a 200 to 300 px header width the letters break apart. Rejected.
- monogram-03 (BAM, Bodoni Moda opsz 48): same hairline failure.

## Fix
Rebuild wm-02 and wm-05 and monogram-03 so that the thinnest stroke of any glyph is at least 6% of the cap height of that glyph:
- Bodoni Moda: use a LOW optical size (opsz 11 to 18), which has sturdier hairlines, weight 450 to 500. If hairlines are still under the 6% floor, switch that option to Libre Bodoni.
- Measure it: render each black SVG at 300 px wide with cairosvg and confirm no glyph has disconnected or invisible strokes. Report the measured minimum hairline in NOTES.md.
- Keep everything else from brief 01 (deliverable names, sizes, colors, transparency, preview, no text elements, no em dashes).

Also regenerate `wordmark-comparison.png` with all five options, and add `wordmark-small.png`: every option rendered at 240 px wide on #FDF6EC, stacked, so legibility at header size can be judged.
