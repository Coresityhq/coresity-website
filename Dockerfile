# syntax=docker/dockerfile:1

# Coresity web image: the Next.js site exported to static files and served by
# nginx. There is no Node.js in the shipped image.
#
# Build and push through scripts/docker/ (see scripts/docker/README.md).

# deps
# ----
# Node 24 matches "engines" in package.json and .nvmrc. docker-compose.dev.yml
# also targets this stage.
FROM node:24.21.0-bookworm-slim AS deps

ENV NEXT_TELEMETRY_DISABLED=1 \
  NPM_CONFIG_UPDATE_NOTIFIER=false

USER node
WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json .npmrc ./

# node_modules and .next are created here, owned by node, so the dev compose's
# named volumes over them start out writable.
RUN mkdir -p node_modules .next

RUN --mount=type=cache,target=/home/node/.npm,uid=1000 \
  npm ci

# build
# -----
FROM deps AS build

COPY --chown=node:node next.config.ts tsconfig.json postcss.config.mjs ./
COPY --chown=node:node public public
COPY --chown=node:node src src
COPY --chown=node:node scripts/csp-hashes.mjs scripts/
COPY --chown=node:node docker/nginx/security-headers.conf.template docker/nginx/

# `next build` writes the site to out/; csp-hashes.mjs then renders the nginx
# security headers (with the hashes of this build's inline scripts) to
# build/nginx/security-headers.conf.
RUN npm run build

# runtime
# -------
# Runs as the unprivileged nginx user on port 8080 and writes only to /tmp,
# so the container works with a read-only root filesystem.
FROM nginxinc/nginx-unprivileged:1.30.5-alpine AS runtime

# Replace the labels inherited from the nginx base image, which describe nginx.
# scripts/docker sets the real version, revision and created with --label,
# which overrides these defaults.
LABEL org.opencontainers.image.title="coresity-web" \
  org.opencontainers.image.description="Coresity website (Next.js static export, served by nginx)" \
  org.opencontainers.image.version="dev" \
  org.opencontainers.image.revision="" \
  org.opencontainers.image.created="" \
  org.opencontainers.image.source="" \
  org.opencontainers.image.url="" \
  org.opencontainers.image.licenses="" \
  maintainer=""

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/build/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /home/node/app/out /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
