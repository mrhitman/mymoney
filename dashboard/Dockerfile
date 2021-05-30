FROM node:16-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY src src
COPY public public
COPY .eslintignore .eslintignore
COPY .eslintrc.js .eslintrc.js
COPY craco.config.js craco.config.js
COPY package.json package.json
COPY tsconfig.json tsconfig.json
RUN npm i -g pnpm
RUN pnpm i

ARG REACT_APP_SERVER=${REACT_APP_SERVER}
ARG REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}
RUN SKIP_PREFLIGHT_CHECK=true \
    REACT_APP_SERVER=${REACT_APP_SERVER} \
    REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID} \
    pnpm run build -p

FROM nginx:alpine
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
