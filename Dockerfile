FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --force

COPY . /app/
ARG SERVICE_2_ENV_VAR
ARG MODE
ARG BASE_URL
ARG BACKEND_ENDPOINT
ARG BACKEND_PORT
ENV BASE_URL=${BASE_URL}
ENV BACKEND_ENDPOINT=${BACKEND_ENDPOINT}
ENV BACKEND_PORT=${BACKEND_PORT}
ENV MODE=${MODE}
RUN yarn build --env BASE_URL=BASE_URL --env MODE=MODE --progress

FROM nginx:alpine AS web
WORKDIR /app

COPY --from=build /app/build ./
#COPY ./nginx/nginx.conf /etc/nginx/nginx.template
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /react-ui/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
