FROM node:16.12

WORKDIR /danggn-market/

COPY . /

RUN yarn install
RUN yarn build

CMD yarn start
