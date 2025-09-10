# Dockerfile for building and running a Node.js application using pnpm and turbo
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
  corepack enable && \
  pnpm install turbo --global

FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
COPY . .
RUN turbo prune --scope="namdo-api" --docker

# The following line is optional, it can be used to install dependencies
FROM base AS installer
WORKDIR /usr/src/app

COPY .gitignore .gitignore
# COPY reset.d.ts reset.d.ts # only if you're using ts-reset library
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /usr/src/app/out/full/ .

RUN pnpm install --frozen-lockfile
COPY turbo.json turbo.json
RUN pnpm be schema
RUN pnpm be build
RUN pnpm prune --production

# RUN pnpm ${APP_NAME} build:${ENVIRONMENT} && \
#     pnpm prune --prod && \
#     pnpm store prune && \
#     apk del .builds-deps


# Clean up unnecessary files
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ARG APP_NAME="namdo-api"
ARG NODE_ENV="production"
ENV APP_NAME=${APP_NAME}
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache openssl && \
  addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nodejs

COPY --from=installer --chown=nodejs:nodejs /usr/src/app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/dist ./apps/${APP_NAME}/dist
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/node_modules ./apps/${APP_NAME}/node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/prisma ./apps/${APP_NAME}/prisma
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/.env.development ./apps/${APP_NAME}/.env.development
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/${APP_NAME}/.env.production ./apps/${APP_NAME}/.env.production
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/packages ./packages

USER nodejs
WORKDIR /usr/src/app/apps/${APP_NAME}

CMD npm start