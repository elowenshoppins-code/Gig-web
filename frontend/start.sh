#!/bin/bash

# Script de inicio del frontend para Railway

echo "🚀 Iniciando GIG ZipFinder Frontend..."

# Verificar variables de entorno
if [ -z "$REACT_APP_BACKEND_URL" ]; then
    echo "⚠️  REACT_APP_BACKEND_URL no está configurada."
    echo "ℹ️  El frontend usará el origen actual para las API calls."
fi

echo "✅ Backend URL: ${REACT_APP_BACKEND_URL:-'(usando origen actual)'}"

# Construir si es necesario
if [ ! -d "build" ]; then
    echo "📦 Construyendo aplicación..."
    yarn build
fi

# Iniciar servidor
echo "🚀 Iniciando servidor de desarrollo..."
cd /app/frontend
yarn start
