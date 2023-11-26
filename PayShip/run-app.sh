#!/bin/bash

FLAG_FILE=/app/.firstrun

if [ ! -f "$FLAG_FILE" ]; then
    sleep 10
    cd /app/data
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    cd /app
    touch "$FLAG_FILE"
fi

npm start
