#!/bin/bash

echo 'Starting build process...'

# Stash any local changes
git stash

# Pull the latest changes from the main branch
git pull origin main

echo 'pull end'

echo 'yarn start'

# Install dependencies
yarn

echo 'yarn end'

# Check if the application is running with PM2
APP_NAME="next_i18n"  # 替换为你的应用名称

if pm2 list | grep -q "$APP_NAME"; then
    echo "$APP_NAME is already running. Restarting..."
    pm2 restart "$APP_NAME"
else
    echo "$APP_NAME is not running. Starting..."
    pm2 start yarn --name "$APP_NAME" -- dev
fi

echo 'Build process completed.'