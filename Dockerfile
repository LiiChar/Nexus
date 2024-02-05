FROM node:18-alpine as base

WORKDIR /
COPY yarn.lock .
COPY package.json .
COPY ./dist .
RUN yarn install --network-timeout 300000
EXPOSE 3000
CMD ["node", "index.js"]
