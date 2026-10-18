#!/usr/bin/env bash
set -Eeuo pipefail

# Build and package the ScrollVerse production server. This script never runs
# unless explicitly invoked and never contains credentials.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARTIFACT_DIR="${ARTIFACT_DIR:-$ROOT_DIR/.release}"
ARCHIVE="${ARCHIVE:-$ARTIFACT_DIR/scrollverse-production.tar.gz}"

cd "$ROOT_DIR"
: "${NODE_OPTIONS:=--max-old-space-size=1536}"
export NODE_OPTIONS

pnpm check
pnpm test
pnpm build

rm -rf "$ARTIFACT_DIR/stage"
mkdir -p "$ARTIFACT_DIR/stage"
cp -R dist "$ARTIFACT_DIR/stage/"
cp package.json pnpm-lock.yaml "$ARTIFACT_DIR/stage/"
if [[ -f .env.example ]]; then cp .env.example "$ARTIFACT_DIR/stage/"; fi
cat > "$ARTIFACT_DIR/stage/DEPLOYMENT-MANIFEST.txt" <<EOF
ScrollVerse production artifact
Built: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Entrypoint: NODE_ENV=production node dist/index.js
Required runtime: Node.js 20+ and pnpm
Required runtime environment: the server env values documented in server/_core/env.ts
No secrets are included in this archive.
EOF

tar -C "$ARTIFACT_DIR/stage" -czf "$ARCHIVE" .
printf 'Created %s\n' "$ARCHIVE"

if [[ "${DEPLOY_CONFIRM:-}" != "I_UNDERSTAND_EXTERNAL_DEPLOYMENT" ]]; then
  printf 'Packaging complete. External transfer is disabled by default.\n'
  printf 'To transfer through rsync, set DEPLOY_CONFIRM=I_UNDERSTAND_EXTERNAL_DEPLOYMENT, DEPLOY_HOST, DEPLOY_USER, and DEPLOY_PATH.\n'
  exit 0
fi

: "${DEPLOY_HOST:?DEPLOY_HOST is required for an explicitly confirmed transfer}"
: "${DEPLOY_USER:?DEPLOY_USER is required for an explicitly confirmed transfer}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required for an explicitly confirmed transfer}"

rsync -av --progress "$ARCHIVE" "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
printf 'Transferred the package only. Extract it and configure the service, reverse proxy, TLS, DNS, database, and secrets on the external host.\n'
