FROM keymetrics/pm2:latest-alpine

RUN mkdir /app
COPY ./ /app
WORKDIR /app

RUN yarn install && yarn build

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]