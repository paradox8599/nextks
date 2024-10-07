#!/bin/sh
fly deploy --build-arg "DATABASE_URL=$(cat secret-db_url_dev.txt)" -c $@

