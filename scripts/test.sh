#!/usr/bin/env bash
# set -euo pipefail

echo "[scripts] test: running unit tests (watch mode)"
if command -v bun >/dev/null 2>&1; then
  bun run test
else
  npm run test
fi
