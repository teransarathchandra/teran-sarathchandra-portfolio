#!/usr/bin/env bash
# One command for humans, the Stop hook, /goal and CI. Keep it fast.
set -euo pipefail
pnpm run --if-present typecheck
pnpm run --if-present lint
pnpm run build
pnpm run --if-present test
