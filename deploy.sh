#!/usr/bin/env sh

set -e 

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pwdrysdale/vue-state-router.git main:gh-pages

cd -