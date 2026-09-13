#!/bin/sh
set -e

echo "==> PulseGuard Container Starting..."

# Wait for PostgreSQL if configured
if [ -n "$POSTGRES_HOST" ]; then
    echo "==> Waiting for PostgreSQL at $POSTGRES_HOST:${POSTGRES_PORT:-5432}..."
    while ! nc -z "$POSTGRES_HOST" "${POSTGRES_PORT:-5432}"; do
        sleep 0.5
    done
    echo "==> PostgreSQL is up and reachable!"
fi

# Wait for Redis if configured
if [ -n "$REDIS_HOST" ]; then
    echo "==> Waiting for Redis at $REDIS_HOST:${REDIS_PORT:-6379}..."
    while ! nc -z "$REDIS_HOST" "${REDIS_PORT:-6379}"; do
        sleep 0.5
    done
    echo "==> Redis is up and reachable!"
fi

# Run database migrations and collect static files ONLY for web server to prevent race conditions
if [ "$1" = "gunicorn" ] || [ "$1" = "python" -a "$2" = "manage.py" -a "$3" = "runserver" ]; then
    echo "==> Applying database migrations..."
    python manage.py migrate --noinput

    echo "==> Collecting static files..."
    python manage.py collectstatic --noinput --clear || true
fi

echo "==> Executing: $@"
exec "$@"
