FROM node:lts-slim

WORKDIR /app

COPY . /app

RUN yarn && yarn build

EXPOSE 80

CMD ["yarn", "start"]