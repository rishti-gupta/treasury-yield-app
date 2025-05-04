#!/usr/bin/env bash

set -e
set -x
set -o pipefail

pushd ../../lambdas
  npm i
  npm run build
popd

rm -f cdk.context.json
npm ci


npx cdk deploy --require-approval never --debug --verbose
