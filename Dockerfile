FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app/
ARG MODE
ARG BASE_URL
ARG ADDRESS_TRC20
ARG ADDRESS_BEP20
ARG ADDRESS_SOL
ARG ADDRESS_ERC20
RUN yarn build --env BASE_URL=${BASE_URL} --env ADDRESS_TRC20=${ADDRESS_TRC20} --env ADDRESS_BEP20=${ADDRESS_BEP20} --env ADDRESS_SOL=${ADDRESS_SOL} --env ADDRESS_ERC20=${ADDRESS_ERC20}  --progress

FROM nginx:alpine AS web
WORKDIR /app

COPY --from=build /app/build ./
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
