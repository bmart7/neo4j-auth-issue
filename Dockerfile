FROM node:21.2-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./
COPY .husky ./.husky

RUN npm install

COPY . .

CMD npm run dev
