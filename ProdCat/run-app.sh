#!/bin/bash

sleep 5

tail -f /app/logs/app.log &
exec /app/service