FROM node:18-alpine

WORKDIR /app
COPY ./src ./src
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.json .

RUN yarn install
RUN apk update && apk add bash
