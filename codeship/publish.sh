#!/bin/sh

git checkout main

npm version patch
npm publish
git push --tags