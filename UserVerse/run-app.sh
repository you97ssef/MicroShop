#!/bin/bash

FLAG_FILE=/app/.migrated

if [ ! -f "$FLAG_FILE" ]; then
    sleep 5
    php artisan migrate --seed
    php artisan setup
    touch "$FLAG_FILE"
fi

cron &
tail -f /app/storage/logs/lumen.log &
php -S 0.0.0.0:80 -t public