# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Next.js starter template — production image
#
# Multi-stage build: dependencies -> build -> runner.
# The application is served with `next start` (no `output: 'standalone'` is
# required, so the source configuration stays untouched).
# ---------------------------------------------------------------------------

# ---------- base ----------
FROM node:24-alpine AS base
# pnpm version is pinned by the `packageManager` field in package.json.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Husky is a dev-only hook installer; skip it inside the image (there is no
# `.git` directory in the build context).
ENV HUSKY=0
RUN corepack enable

# ---------- dependencies ----------
FROM base AS deps
# `libc6-compat` is required by some native modules (e.g. sharp) on musl.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy manifests first to leverage Docker layer caching.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---------- runner ----------
FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install production dependencies only, keeping the runtime image small.
# `--ignore-scripts` skips the root `prepare` lifecycle script (Husky), which
# is a dev-only hook installer and is absent from the production install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Run as a non-root user.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy the build output and static assets.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["pnpm", "start"]
