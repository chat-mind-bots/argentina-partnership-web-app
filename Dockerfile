FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app/

RUN yarn build

FROM nginx:alpine AS web
WORKDIR /app

COPY --from=build /app/build ./
#COPY ./nginx/nginx.conf /etc/nginx/nginx.template
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /react-ui/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
