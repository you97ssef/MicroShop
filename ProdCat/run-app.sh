#!/bin/bash

FLAG_FILE=/app/.firstrun

if [ ! -f "$FLAG_FILE" ]; then
    sleep 5
fi

tail -f /app/logs/app.log &
exec /app/service