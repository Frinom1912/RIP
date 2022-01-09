FROM node:13.12.0-alpine

WORKDIR /usr/src/frontend

COPY package.json .

RUN npm install typescript -g
RUN npm install --silent
RUN npm link typescript

COPY . .

CMD ["npm", "start"]