FROM node:17.0

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .


RUN yarn

EXPOSE 3334

COPY . . 

CMD [ "yarn", "start" ]