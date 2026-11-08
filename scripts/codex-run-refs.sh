#!/bin/sh
# scripts/codex-run-refs.sh codex-briefs/NN-slug.md : like codex-run.sh, attaching every image in _ref/.
set -u
CODEX=${CODEX:-/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex}
brief=$1; s=$(basename "$brief" .md); d="$PWD/assets/inbox/$s"
imgs=""; for f in "$d"/_ref/*.png; do imgs="$imgs -i $f"; done
"$CODEX" exec ${CODEX_MODEL:+-m $CODEX_MODEL} ${CODEX_EFFORT:+-c model_reasoning_effort="$CODEX_EFFORT"} --skip-git-repo-check -s workspace-write -C "$d" $imgs -o "$d/_last.txt" "$(cat "$brief")" < /dev/null > "$d/_run.log" 2>&1
echo "$s exit=$?"
