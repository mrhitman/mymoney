FROM node:16-alpine as stage
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
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build

FROM node:16-alpine
RUN npm i -g pnpm
RUN mkdir /app
WORKDIR /app
COPY --from=stage /app ./
EXPOSE 4000

CMD pnpm run start:prod
