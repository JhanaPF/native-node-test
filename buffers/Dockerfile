FROM node:22-slim 

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 3006

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fs http://localhost:3006/ | grep yes || exit 1

CMD ["node", "--max-old-space-size=128", "app.js"]