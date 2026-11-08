The font files in `src/fonts/` and `assets/fonts-original/` are Playfair Display, Source Serif 4, and
IBM Plex Sans, each licensed under the SIL Open Font License 1.1. The license texts are in this folder
(and alongside the originals). The files in `src/fonts/` are modified versions: instanced to weights
400 to 500 and subset to Latin. Playfair Display and IBM Plex have Reserved Font Names, so their modified files are renamed BAM Display
(`BAMDisplay-var.woff2`) and BAM Label (`BAMLabel-500.woff2`), in the file name, the font's name table,
and the CSS family. Source Serif 4 has no Reserved Font Name. The unmodified originals keep their names.
