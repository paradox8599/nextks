#!/bin/sh
name=$1
sed -i '' "s/nextks/$name/g" compose.yaml
sed -i '' "s/nextks/$name/g" fly.toml
sed -i '' "s/nextks/$name/g" package.json
sed -i '' "s/nextks/$name/g" package-lock.json
sed -i '' "s/nextks/$name/g" README.md
