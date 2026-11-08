#!/bin/sh
# Art-direction record: which Codex raw was chosen for each placement, its grade, and its crop.
# Re-run to regenerate src/assets/img/ from assets/inbox/. Every pick was reviewed by eye first.
set -e
PY=${PY:-python3}
pick() { # pick <inbox-dir> <raw-n> <grade> <name> <aspect> [focus] [extra grade args]
  dir=$1 n=$2 g=$3 name=$4 aspect=$5 focus=${6:-0.5,0.5}; shift 6 2>/dev/null || shift $#
  width=""; case "$1" in --width) width="--width $2"; shift 2;; esac
  [ -f "assets/inbox/$dir/raw-$n.png" ] || { echo "skip $name (no raw yet)"; return 0; }
  $PY scripts/grade.py "$g" "assets/inbox/$dir/raw-$n.png" "assets/graded/$name.png" "$@"
  node scripts/promote-asset.mjs "assets/graded/$name.png" "$name" --aspect "$aspect" --focus "$focus" $width
}
pick 02-hero-01-colonnade 2 navy hero-01-colonnade 16:9
pick 03-hero-02-cornice   2 navy hero-02-cornice   16:9 0.5,0.55
pick 04-hero-03-stair     1 warm plate-03-stair    4:5  0.55,0.5
pick 05-hero-04-timber    1 warm hero-04-timber    16:9 0.5,0.4
pick 15-portrait-05-lake  2 navy hero-05-lake      4:5  0.5,0.5 --width 1440
pick 16-portrait-06a-threshold 1 warm seq-06a-threshold 4:5 0.5,0.55
pick 17-portrait-06b-fence 2 warm seq-06b-fence     4:5 0.5,0.6
pick 18-portrait-06c-river 1 warm seq-06c-river     4:5 0.5,0.5 --gamma 1.1
pick 19-portrait-06d-barn  1 warm seq-06d-barn      4:5 0.5,0.55
pick 11-hero-07-door      1 warm plate-07-door     4:5
pick 12-hero-08-horizon   1 navy band-08-horizon   4:1
pick 13-hero-09-granite   1 navy hero-09-granite   16:9 0.5,0.5 --lift 0.06
pick 14-hero-10-arcade    1 navy hero-10-arcade    16:9
pick 05-hero-04-timber    2 warm sect-04-beams     4:5  0.3,0.45
# Iteration 11, Portico (Greek Revival town-house vocabulary)
pick 24-hero-11-house    2 navy hero-11-portico   16:9 0.5,0.5 # matched to reference photos
pick 26-detail-11-capital 1 warm plate-11-capital  4:5  0.5,0.4
pick 29-detail-11-door-scale 2 warm plate-11-entry 4:5 0.5,0.5 # real door; brass knocker and Yale 2531 pull at true scale 
