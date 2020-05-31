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
COPY package.json package.json
COPY lerna.json lerna.json
COPY yarn.lock yarn.lock

RUN yarn install
RUN npm i -g lerna
RUN lerna bootstrap --nohoist=**
RUN cd api && yarn build

FROM node:12-alpine
RUN mkdir /opt/mymoney
WORKDIR /opt/mymoney
COPY --from=stage /opt/mymoney/api/dist api/dist
COPY --from=stage /opt/mymoney/api/package.json api/package.json
COPY --from=stage /opt/mymoney/api/nest-cli.json api/nest-cli.json
COPY --from=stage /opt/mymoney/api/node_modules api/node_modules
COPY --from=stage /opt/mymoney/common/node_modules common/node_modules

EXPOSE 3000

RUN cd api
CMD yarn start