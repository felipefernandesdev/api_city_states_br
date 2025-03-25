FROM node:18-alpine3.18

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3333

CMD ["npm", "run", "start"]
