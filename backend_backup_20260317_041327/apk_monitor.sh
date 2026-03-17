#!/bin/bash

# SCRIPT DE BACKUP Y VERIFICACIÓN AUTOMÁTICA DE APK
# Este script asegura que el APK SIEMPRE esté disponible

PERSISTENT_LOCATION="/data/db/apk_storage/gigzipfinder.apk"
BACKUP_LOCATION_1="/data/db/apk_backup/gigzipfinder.apk"
BACKUP_LOCATION_2="/data/db/mongodb_backups/apk/gigzipfinder.apk"
OLD_LOCATION="/app/backend/apk_files/gigzipfinder.apk"

LOG_FILE="/var/log/apk_monitor.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Iniciando verificación de APK ==="

# Crear directorios de backup
mkdir -p /data/db/apk_storage
mkdir -p /data/db/apk_backup
mkdir -p /data/db/mongodb_backups/apk

# Función para encontrar el APK en cualquier ubicación
find_apk() {
    if [ -f "$PERSISTENT_LOCATION" ]; then
        echo "$PERSISTENT_LOCATION"
        return 0
    elif [ -f "$BACKUP_LOCATION_1" ]; then
        echo "$BACKUP_LOCATION_1"
        return 0
    elif [ -f "$BACKUP_LOCATION_2" ]; then
        echo "$BACKUP_LOCATION_2"
        return 0
    elif [ -f "$OLD_LOCATION" ]; then
        echo "$OLD_LOCATION"
        return 0
    else
        return 1
    fi
}

# Verificar si el APK principal existe
if [ ! -f "$PERSISTENT_LOCATION" ]; then
    log "⚠️  APK NO encontrado en ubicación principal: $PERSISTENT_LOCATION"
    
    # Buscar en backups
    FOUND_APK=$(find_apk)
    if [ $? -eq 0 ]; then
        log "✅ APK encontrado en backup: $FOUND_APK"
        log "📋 Restaurando desde backup..."
        cp "$FOUND_APK" "$PERSISTENT_LOCATION"
        log "✅ APK restaurado exitosamente"
    else
        log "❌ ERROR CRÍTICO: No se encontró APK en ninguna ubicación"
        log "ℹ️  Por favor, sube el APK desde /admin/upload"
        exit 1
    fi
else
    log "✅ APK encontrado en ubicación principal"
    SIZE=$(du -h "$PERSISTENT_LOCATION" | cut -f1)
    log "📦 Tamaño del APK: $SIZE"
fi

# Crear backups si no existen
if [ ! -f "$BACKUP_LOCATION_1" ]; then
    log "📋 Creando backup 1..."
    cp "$PERSISTENT_LOCATION" "$BACKUP_LOCATION_1"
    log "✅ Backup 1 creado"
fi

if [ ! -f "$BACKUP_LOCATION_2" ]; then
    log "📋 Creando backup 2..."
    cp "$PERSISTENT_LOCATION" "$BACKUP_LOCATION_2"
    log "✅ Backup 2 creado"
fi

# Verificar permisos
chmod 644 "$PERSISTENT_LOCATION"
log "🔐 Permisos verificados"

# Verificar que está en volumen persistente
if mount | grep -q "/data/db"; then
    log "✅ Volumen persistente confirmado: /data/db está montado"
else
    log "⚠️  ADVERTENCIA: /data/db no aparece como montado"
fi

log "=== Verificación completada ==="
log ""
