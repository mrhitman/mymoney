FROM node:12-alpine as stage
RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*
RUN mkdir /app
WORKDIR /app
COPY src src
COPY templates templates
COPY nest-cli.json nest-cli.json
COPY tsconfig.build.json tsconfig.build.json
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN npm i -g pnpm@5.9.4
RUN pnpm i
RUN pnpm run build

FROM node:12-alpine
RUN mkdir /app
WORKDIR /app
COPY --from=stage /app ./
EXPOSE 4000

CMD npm run start:prod
