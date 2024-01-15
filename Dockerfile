# syntax=docker/dockerfile:1
FROM node:18

LABEL version="1.0"
LABEL description="docker container for ease of use with backend local dev server"

RUN mkdir /server
WORKDIR /server

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
EXPOSE 8888
COPY . .
CMD ["npm", "start"]