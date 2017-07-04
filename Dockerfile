FROM alpine:edge

ENV TIMEZONE Europe/Budapest

MAINTAINER Péter Schmíz <peter.schmiz@possible.com>

RUN apk update && \
    apk upgrade && \
    apk add --update \
    git \
    bash \
    lftp \
    nodejs \
    yarn && \
    rm -rf /var/cache/apk/*
