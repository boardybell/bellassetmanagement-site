#!/bin/sh
# scripts/codex-run.sh codex-briefs/NN-slug.md
# Runs one Codex brief, confined to assets/inbox/NN-slug/. Codex CLI ships inside ChatGPT.app.
set -u
CODEX=${CODEX:-/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex}
brief=$1; s=$(basename "$brief" .md); d="$PWD/assets/inbox/$s"; mkdir -p "$d"
"$CODEX" exec --skip-git-repo-check -s workspace-write -C "$d" -o "$d/_last.txt" "$(cat "$brief")" < /dev/null > "$d/_run.log" 2>&1
echo "$s exit=$?"
