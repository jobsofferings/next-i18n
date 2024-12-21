FROM node:20-alpine AS base

# 可选，自定义参数变量，在docker build时通过--build-arg ENV=参数
# ARG ENV

# 测试构建 2

# Install dependencies only when needed
FROM base AS deps
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
# RUN apk update
# RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
# COPY yarn.lock ./
RUN yarn config set registry https://registry.npmmirror.com \
  && yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

RUN echo "Contents of /app after build:" && ls -la /app

# 可使用自定义参数变量来打包
# RUN npm run ${ENV}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

# COPY --from=builder /app/.next /app/.next 
COPY --from=builder /app /app
RUN echo "Contents of /app after copy:" && ls -la /app

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]