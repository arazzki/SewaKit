FROM php:8.3-cli-alpine

# Install system dependencies & PostgreSQL extensions
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files and install dependencies
COPY composer.json composer.lock* ./
RUN composer install --no-interaction --no-scripts --prefer-dist

# Copy application source
COPY . .

# Generate autoload files
RUN composer dump-autoload --optimize

EXPOSE 8000

CMD ["sh", "-c", "cp -n .env.example .env || true && php artisan key:generate --force && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]
