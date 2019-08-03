#!/bin/bash

ENV=${1:-'prod'}

echo "Build using config file: $ENV"

npm install

npm run clean
npm run copy-bin

cross-env NODE_ENV=production $(npm bin)/webpack --config ./webpack/webpack.config.$ENV.js