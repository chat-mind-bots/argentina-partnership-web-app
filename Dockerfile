FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app/
ARG MODE
ARG BASE_URL
RUN yarn build --env BASE_URL=${BASE_URL}  --progress

FROM nginx:alpine AS web
WORKDIR /app

COPY --from=build /app/build ./
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
