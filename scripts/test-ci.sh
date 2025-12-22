#!/usr/bin/env bash
set -euo pipefail

echo "[scripts] test-ci: running tests in CI mode"
if command -v bun >/dev/null 2>&1; then
  bun run test:ci
else
  npm run test:ci
fi
