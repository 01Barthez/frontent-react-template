#!/usr/bin/env bash
# set -euo pipefail

echo "[scripts] lint: running eslint"
if command -v bun >/dev/null 2>&1; then
  bun run lint
else
  npm run lint
fi
