FROM node:12-alpine as stage
RUN mkdir /opt/mymoney
WORKDIR /opt/mymoney

COPY api/src api/src
COPY api/nest-cli.json api/nest-cli.json
COPY api/tsconfig.build.json api/tsconfig.build.json
COPY api/tsconfig.json api/tsconfig.json
COPY api/package.json api/package.json

COPY common/src common/src
COPY common/translations common/translations
COPY common/package.json common/package.json
COPY common/responses.d.ts common/responses.d.ts
COPY common/tsconfig.build.json common/tsconfig.build.json
COPY common/tsconfig.json common/tsconfig.json

COPY dashboard/src dashboard/src
COPY dashboard/public dashboard/public
COPY dashboard/.eslintignore dashboard/.eslintignore
COPY dashboard/.eslintrc.js dashboard/.eslintrc.js
COPY dashboard/craco.config.js dashboard/craco.config.js
COPY dashboard/package.json dashboard/package.json
COPY dashboard/tsconfig.json dashboard/tsconfig.json

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY .npmrc .npmrc

RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*
RUN npm i -g pnpm

RUN pnpm i -r
RUN pnpm run build --filter ./common
RUN pnpm run build --filter ./api
RUN cd dashboard
RUN touch .env
RUN echo "REACT_APP_SERVER=$REACT_APP_SERVER"  >> .env 
RUN echo "REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID"  >> .env 
RUN echo "SKIP_PREFLIGHT_CHECK=true" >> .env
RUN pnpm run build -p

FROM node:12-alpine
RUN mkdir /opt/mymoney
RUN npm i -g pnpm
WORKDIR /opt/mymoney

COPY --from=stage /opt/mymoney/node_modules node_modules
COPY --from=stage /opt/mymoney/api/dist api/dist
COPY --from=stage /opt/mymoney/api/src api/src
COPY --from=stage /opt/mymoney/api/package.json api/package.json
COPY --from=stage /opt/mymoney/api/tsconfig.json api/tsconfig.json
COPY --from=stage /opt/mymoney/api/nest-cli.json api/nest-cli.json
COPY --from=stage /opt/mymoney/api/node_modules api/node_modules
COPY --from=stage /opt/mymoney/dashboard/build api/static
COPY --from=stage /opt/mymoney/common api/node_modules/common

EXPOSE 4000

RUN cd api
WORKDIR /opt/mymoney/api
CMD pnpm run start:prod
