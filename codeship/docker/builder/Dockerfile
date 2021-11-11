FROM node:12

WORKDIR /app

ARG NPM_REGISTRY_URL
ARG NPM_AUTH_TOKEN
ARG GITHUB_TOKEN
RUN echo "//${NPM_REGISTRY_URL}/:_authToken=${NPM_AUTH_TOKEN}" > "${HOME}/.npmrc"
RUN yarn global add lerna@3.14.1

COPY package.json yarn.lock ./
RUN yarn install

COPY . .git/ ./

RUN git config --global user.name "Codeship"
RUN git config --global user.email "noreply@noreply.com"
RUN git remote set-url origin "https://x-access-token:$GITHUB_TOKEN@github.com/adamatti/adamatti-npm-libs.git"