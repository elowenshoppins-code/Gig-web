#!/bin/bash

# Script de migración automática de APK a ubicación persistente
# Este script asegura que el APK esté en la ubicación correcta

PERSISTENT_DIR="/data/db/apk_storage"
OLD_LOCATION="/app/backend/apk_files/gigzipfinder.apk"
NEW_LOCATION="$PERSISTENT_DIR/gigzipfinder.apk"

echo "=== Script de Migración de APK ==="

# Crear directorio persistente si no existe
mkdir -p "$PERSISTENT_DIR"

# Verificar si el APK ya está en la ubicación correcta
if [ -f "$NEW_LOCATION" ]; then
    echo "✅ APK ya está en ubicación persistente: $NEW_LOCATION"
    ls -lh "$NEW_LOCATION"
    exit 0
fi

# Verificar si existe en la ubicación antigua
if [ -f "$OLD_LOCATION" ]; then
    echo "⚠️  APK encontrado en ubicación NO persistente"
    echo "📦 Migrando de: $OLD_LOCATION"
    echo "📍 Hacia: $NEW_LOCATION"
    
    cp "$OLD_LOCATION" "$NEW_LOCATION"
    
    if [ $? -eq 0 ]; then
        echo "✅ Migración exitosa!"
        ls -lh "$NEW_LOCATION"
        
        # Verificar que está en volumen persistente
        if mount | grep -q "/data/db"; then
            echo "✅ Confirmado: El APK está en volumen persistente"
        else
            echo "⚠️  ADVERTENCIA: /data/db no está montado como volumen persistente"
        fi
    else
        echo "❌ Error durante la migración"
        exit 1
    fi
else
    echo "⚠️  No se encontró APK en ninguna ubicación"
    echo "ℹ️  Sube un APK desde /admin/upload"
fi

echo "=== Fin de script ==="
