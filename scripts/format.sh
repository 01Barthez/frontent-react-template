#!/usr/bin/env bash
set -euo pipefail

echo "[scripts] format: running prettier"
if command -v bun >/dev/null 2>&1; then
  bun run format
else
  npm run format
fi
