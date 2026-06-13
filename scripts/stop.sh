#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

docker compose -f "$ROOT_DIR/docker-compose.dev.yml" down -v
