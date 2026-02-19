# ---- Start generic PHP & Web server setup ----
# Build argument (e.g., 8.3 or 8.4)
ARG PHP_VERSION=8.3

FROM php:${PHP_VERSION}-fpm-alpine AS php-httpd

# Extract only the major.minor version (ignoring the patch number)
ENV SHORT_PHP_VERSION=${PHP_VERSION%.*}

#run "docker build --build-arg PHP_VERSION=8.4 --platform linux/amd64 -t {tag_name} --target {target_name} {context}"

COPY ./${SHORT_PHP_VERSION}/base /usr/local/etc

# Install Apache
RUN apk update && apk add --no-cache apache2 apache2-proxy apache2-ssl apache2-utils \
    && rm -rf /var/cache/apk/*

#Configure APACHE
ENV SERVER_NAME=leasingmarkt
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

COPY ./httpd/base/custom /etc/apache2/conf.d/custom

RUN echo 'Include /etc/apache2/conf.d/custom/*.conf' >> /etc/apache2/httpd.conf

RUN mkdir -p /var/www/logs && \
    mkdir -p /var/www/html

WORKDIR /var/www/html

# Expose the default HTTP port
EXPOSE 80

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Use the php-fpm user and group
RUN chown -R www-data:www-data /var/www /var/www/logs /usr/local/bin/entrypoint.sh \
    && chmod -R 755 /var/www /var/www/logs /usr/local/bin/entrypoint.sh

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# ---- Finish generic PHP & Web server setup ----

# ---- Start Laravel base setup ----
FROM php-httpd AS laravel-base

# Configure PHP with basic Laravel dependencies
# see: https://laravel.com/docs/10.x/deployment#server-requirements
# Missing mycript, it excludes > php 8.4 -> sodium is used instead
RUN curl -sSLf -o /usr/local/bin/install-php-extensions https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions \
    && chmod +x /usr/local/bin/install-php-extensions \
    && install-php-extensions \
        ctype \
        curl \
        dom \
        fileinfo \
        mbstring \
        pdo \
        pdo_mysql \
        xml \
        redis \
        opcache \
        simplexml \
        sodium

# ---- Finish Laravel base setup ----

# ---- Start LM base setup ----
FROM laravel-base AS lm-backend

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install zip, xdebug and composer
RUN apk add --no-cache less zip && \
    install-php-extensions xdebug

RUN chown www-data:www-data /usr/bin/composer

RUN chown -R www-data:www-data /var/www && \
    chmod -R 0755 /var/www /var/www/logs \
# ---- Finish LM base setup ----