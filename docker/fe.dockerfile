# 기본 이미지 설정
FROM node:20-alpine AS base

ARG APP_NAME
ARG ENVIRONMENT
ENV APP_NAME=${APP_NAME}
ENV ENVIRONMENT=${ENVIRONMENT}

# 사용 모듈 분리
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=${APP_NAME} --docker

# 프로덕션 종속성 설치 & 모듈 빌드
FROM base AS installer
WORKDIR /app

RUN apk add --no-cache libc6-compat && \
    apk --no-cache add --virtual .builds-deps build-base python3 && \
    npm install -g node-gyp corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@8.15.5 --activate

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json ./

RUN pnpm ${APP_NAME} build:${ENVIRONMENT} && \
    pnpm prune --prod && \
    pnpm store prune && \
    apk del .builds-deps

# 프로덕션 이미지 카피 & 실행
FROM base AS runner
WORKDIR /app

# Don't run production as root
# install usermod and change node user to 1001
RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow
RUN groupmod -g 1001 node \
  && usermod -u 1001 -g 1001 node

RUN addgroup --system --gid 3000 nodejs && \
    adduser --system -G nodejs --uid 1000 nextjs -D

USER nextjs

# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=nextjs:nodejs \
    /app/apps/${APP_NAME}/next.config.js \
    /app/apps/${APP_NAME}/package.json \
    ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone/ .
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static/ ./apps/${APP_NAME}/.next/static/
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public/ ./apps/${APP_NAME}/public/

WORKDIR /app/apps/${APP_NAME}

# 애플리케이션 실행
CMD ["node", "server.js"]