# External hosting deployment

This project builds a full-stack Node application. The supported production artifact is `dist/` plus the package manifests; it is not a static-only `dist/public` upload. The local helper `scripts/deploy-external-host.sh` runs checks, builds the app, creates a secret-free tarball, and stops before any external transfer unless the operator explicitly sets the confirmation variable.

## 1. Prepare the host

Use a supported Linux host with Node.js 20 or newer, pnpm matching the repository's `packageManager` field, a process supervisor such as systemd or a managed Node service, and a reverse proxy with TLS. Configure the production environment in the host's secret manager. Do not commit `.env`, private keys, database URLs, Stripe keys, OAuth secrets, or Manus credentials.

The application listens on `PORT` (default `3000`) and binds to `0.0.0.0`. Set a private application port such as `3000`, then proxy `scrollverse.co` and `www.scrollverse.co` to that port. Confirm the database and any required provider integrations independently before enabling related UI actions.

## 2. Build and package locally

```bash
cd /home/ubuntu/scrollverse-portal
chmod +x scripts/deploy-external-host.sh
./scripts/deploy-external-host.sh
```

The result is `.release/scrollverse-production.tar.gz`. The default run performs `pnpm check`, `pnpm test`, and the guarded production build, then creates a package containing `dist/`, `package.json`, `pnpm-lock.yaml`, and an optional `.env.example`. It does not upload, publish, edit DNS, change billing, or change the domain account.

## 3. Optional explicit transfer

Only after the owner has selected and authenticated the external host, set the host variables in the shell or secret manager. The script uses `rsync` over the operator's configured SSH identity:

```bash
DEPLOY_CONFIRM=I_UNDERSTAND_EXTERNAL_DEPLOYMENT \
DEPLOY_HOST=host.example.com \
DEPLOY_USER=deploy \
DEPLOY_PATH=/srv/scrollverse/releases \
./scripts/deploy-external-host.sh
```

This transfers the package only. It does not extract files, configure secrets, restart a service, alter DNS, or issue a certificate. Those actions must follow the selected host's owner-controlled runbook.

## 4. Install and run on the host

```bash
mkdir -p /srv/scrollverse/releases/2026-10-17
tar -xzf scrollverse-production.tar.gz -C /srv/scrollverse/releases/2026-10-17
cd /srv/scrollverse/releases/2026-10-17
pnpm install --prod --frozen-lockfile
# Configure secrets through the host secret manager, not this archive.
NODE_ENV=production PORT=3000 pnpm start
```

For a service manager, use an equivalent command such as `NODE_ENV=production PORT=3000 node dist/index.js`, set the working directory to the extracted release, and keep the previous release available for rollback. Run database migrations only when the owner has reviewed the schema change and the host database target; this deployment helper does not run `db:push` automatically.

## 5. Reverse proxy and DNS checklist

Point the chosen DNS records to the external host, issue TLS certificates through the selected provider, proxy both the apex and `www` hostname as intended, and preserve WebSocket upgrade headers for the chess/socket routes. Verify `/`, `/source-collections`, `/synchronization-video-library`, `/meta-ai-legion-archive`, and `/price-of-freedom` over HTTPS. Confirm that `/api/trpc` reaches the Node process and that OAuth redirect origins match the deployed hostname before enabling sign-in.

A successful local build or managed preview does not prove that `scrollverse.co` has been restored. Public reachability, billing entitlement, DNS, TLS, and external hosting state must be checked on the selected provider after an owner-controlled deployment.

## 6. Rollback

Keep at least one previous extracted release. If a post-deploy smoke check fails, point the service manager back to the previous release, restart it, and preserve the failed release for diagnosis. Do not delete the prior release until the new release has passed browser, API, database, media-boundary, and accessibility checks.
