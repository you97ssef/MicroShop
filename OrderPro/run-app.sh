#!/bin/bash

FLAG_FILE=/app/.firstrun

if [ ! -f "$FLAG_FILE" ]; then
    sleep 10
    touch "$FLAG_FILE"
fi

dotnet OrderPro.dll