# syntax=docker/dockerfile:1

# Stage 1: Build production React application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using package-lock.json
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . ./

# Build production bundle with Vite
RUN npm run build

# Stage 2: Minimal runtime Nginx server
FROM nginx:1.27-alpine AS runtime

# Remove default website files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA bundle
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx reverse proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
