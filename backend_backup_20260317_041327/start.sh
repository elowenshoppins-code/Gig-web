#!/bin/bash

# Script de inicio del backend para Railway
# Este script se asegura de que MongoDB y todas las dependencias estén listas

echo "🚀 Iniciando GIG ZipFinder Backend..."

# Verificar variables de entorno
if [ -z "$MONGO_URL" ]; then
    echo "⚠️  MONGO_URL no está configurada. Usando valor por defecto."
    export MONGO_URL="mongodb://localhost:27017"
fi

if [ -z "$DB_NAME" ]; then
    echo "⚠️  DB_NAME no está configurada. Usando valor por defecto."
    export DB_NAME="gigzipfinder"
fi

if [ -z "$PORT" ]; then
    echo "⚠️  PORT no está configurada. Usando 8001."
    export PORT="8001"
fi

echo "✅ MongoDB URL: $MONGO_URL"
echo "✅ Database: $DB_NAME"
echo "✅ Port: $PORT"

# Iniciar el servidor
echo "🚀 Iniciando servidor FastAPI..."
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port $PORT
