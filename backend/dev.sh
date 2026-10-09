#!/bin/bash

set -e

if [ "$1" = "-u" ]; then
   docker compose -f docker-compose.dev.yml up -d --remove-orphans

elif [ "$1" = "-b" ]; then
   docker compose -f docker-compose.dev.yml build "$2"

else [ "$1" = "-d" ]
   docker compose -f docker-compose.dev.yml down
fi