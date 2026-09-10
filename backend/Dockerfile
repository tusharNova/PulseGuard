# syntax=docker/dockerfile:1
FROM ghcr.io/astral-sh/uv:0.6.14-python3.12-bookworm-slim AS builder

WORKDIR /app

# Enable bytecode compilation and full file copy for virtual environment
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

# Install dependencies using frozen lockfile
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-install-project

# Runtime stage
FROM python:3.12-slim-bookworm AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libpq5 \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder stage
COPY --from=builder /app/.venv /app/.venv

# Copy source code and entrypoint
COPY pyproject.toml ./
COPY config/ ./config/
COPY docker-entrypoint.sh ./

# Normalize line endings and execution permissions
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

# Create non-root unprivileged user for security
RUN groupadd -r pulseguard && useradd -r -g pulseguard -d /app -s /sbin/nologin pulseguard && \
    mkdir -p /app/config/staticfiles && \
    chown -R pulseguard:pulseguard /app

USER pulseguard

WORKDIR /app/config

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-"]
