FROM php:8.2-fpm-alpine AS base

RUN apk add --update --no-cache --virtual virtual-deps $PHPIZE_DEPS icu-dev postgresql-dev \
    && apk add --no-cache icu postgresql \
    && adduser -D php \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl opcache pdo_pgsql pgsql \
    && pecl clear-cache \
    && apk del virtual-deps \
    && mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

FROM base AS dev

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

USER php

FROM base AS build

WORKDIR /build

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install
# prod optimisation

FROM base AS prod

WORKDIR /var/www/html

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

USER php
