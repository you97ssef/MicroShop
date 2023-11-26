#!/bin/bash

FLAG_FILE=/app/.firstrun

if [ ! -f "$FLAG_FILE" ]; then
    sleep 5
fi

dotnet OrderPro.dll