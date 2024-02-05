FROM node:latest as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY tsconfig.json ./
COPY src/* src/

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
