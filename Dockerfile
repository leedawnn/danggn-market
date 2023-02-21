FROM node:16

WORKDIR /danggn-market/

COPY . /

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
