FROM node:lts-alpine
RUN apk add git
USER node
ENV PATH $PATH:/srv/node_modules/.bin
ENV CORE_MODULES_BIN ./node_modules/@core-modules/*/node_modules/.bin
WORKDIR /srv
