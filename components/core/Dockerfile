# a multi-stage build pattern

# 1. Build Stage
# Based on node:20-alpine.
# Installs dependencies, compiles TypeScript into /dist.
# Produces build artifacts but may contain unnecessary files (devDependencies, TS source code, etc.).
FROM node:20-alpine AS builder
WORKDIR /core
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# 2. Production Stage
# Copies only what’s necessary to run the app (dist/, node_modules, package.json).
#Each FROM creates a new, independent image layer

FROM node:20-alpine AS runtime
WORKDIR /core
ENV NODE_ENV=production
COPY --from=builder /core/node_modules ./node_modules
COPY --from=builder /core/dist ./dist
ENV PORT=3002
# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL
# RUN echo "=> => => => => => ${DATABASE_URL}"

EXPOSE 3002
CMD ["node", "dist/server.js"]
