#!/bin/sh
docker build --secret id=DATABASE_URL,src=secret-database_url.txt .
