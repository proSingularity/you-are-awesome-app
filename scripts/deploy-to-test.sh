#!/bin/bash

npx expo login --username "${EXPO_CLI_USERNAME}" --password "${EXPO_CLI_PASSWORD}"
npm run deploy:test
npx expo logout