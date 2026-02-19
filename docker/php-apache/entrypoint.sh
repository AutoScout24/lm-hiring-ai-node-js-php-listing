#!/bin/sh

# Start PHP-FPM in the background
/usr/local/sbin/php-fpm &

# Start Apache in the foreground
exec /usr/sbin/httpd -D FOREGROUND