FROM node:16.13.1-alpine

WORKDIR /usr/todo-list

COPY package.json .

RUN npm install

COPY . .

RUN npx tsc -p ./tsconfig.json

EXPOSE 3000

CMD ["node", "./dist/bin/www.js"]