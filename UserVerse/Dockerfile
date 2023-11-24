FROM php

WORKDIR /app
COPY . /app
EXPOSE 80

RUN apt-get update 

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get -y install libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Cron
RUN apt-get -y install cron

COPY cron-jobs /etc/cron.d/cron-jobs

RUN chmod 0644 /etc/cron.d/cron-jobs \
    && crontab /etc/cron.d/cron-jobs

# Setup
RUN cp .env.docker.production .env \
    && composer install

ENTRYPOINT [ "/bin/bash", "/app/run-app.sh" ]