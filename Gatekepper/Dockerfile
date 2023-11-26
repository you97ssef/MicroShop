FROM node

WORKDIR /app
COPY . /app
EXPOSE 80

COPY .env.docker .env

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
