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
ARG SUPPORT_USERNAME
RUN yarn build --env VITE_BASE_URL=${BASE_URL} --env VITE_ADDRESS_TRC20=${ADDRESS_TRC20} --env VITE_ADDRESS_BEP20=${ADDRESS_BEP20} --env VITE_ADDRESS_SOL=${ADDRESS_SOL} --env VITE_ADDRESS_ERC20=${ADDRESS_ERC20}  --env VITE_SUPPORT_USERNAME=${SUPPORT_USERNAME} --progress

FROM nginx:alpine AS web
WORKDIR /app

COPY --from=build /app/build ./
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
