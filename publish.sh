#!/usr/bin/env bash

set -e

npm version patch

npm run plugin
npm run build

npm publish