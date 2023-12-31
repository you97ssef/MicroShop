#!/bin/bash

FLAG_FILE=/app/.firstrun

if [ ! -f "$FLAG_FILE" ]; then
    sleep 10
    php artisan migrate
    php artisan db:seed --class=DockerSeeder
    php artisan setup
    touch "$FLAG_FILE"
fi

php artisan migrate

cron &
tail -f /app/storage/logs/lumen.log &
php -S 0.0.0.0:80 -t public