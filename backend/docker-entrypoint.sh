#!/bin/sh
set -e

echo "==> PulseGuard Backend Starting..."

# Wait for PostgreSQL if configured
if [ -n "$POSTGRES_HOST" ]; then
    echo "==> Waiting for PostgreSQL at $POSTGRES_HOST:${POSTGRES_PORT:-5432}..."
    while ! nc -z "$POSTGRES_HOST" "${POSTGRES_PORT:-5432}"; do
        sleep 0.5
    done
    echo "==> PostgreSQL is up and reachable!"
fi

# Run database migrations
echo "==> Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "==> Collecting static files..."
python manage.py collectstatic --noinput --clear || true

echo "==> Executing application command: $@"
exec "$@"
