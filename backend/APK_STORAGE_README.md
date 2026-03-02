# APK Storage Configuration

## ⚠️ IMPORTANTE: Almacenamiento Persistente

El archivo APK se guarda en un **volumen persistente** para evitar que se pierda cuando el contenedor se reinicia.

### 📁 Ubicación del APK

**Ubicación actual (persistente):**
```
/data/apk_files/gigzipfinder.apk
```

**❌ Ubicación antigua (NO persistente):**
```
/app/backend/apk_files/  # Esta se pierde al reiniciar el contenedor
```

### 🔄 Por Qué Se Cambió

Los contenedores de Kubernetes son **efímeros**, lo que significa que:
- Cuando el contenedor se reinicia, pierde todos los archivos en `/app`
- El directorio `/data` está montado en un **volumen persistente**
- Los archivos en `/data` sobreviven a reinicios y redespliegues

### 📊 Verificación

Para verificar que el APK existe:
```bash
ls -lah /data/apk_files/
```

Para verificar el tamaño:
```bash
du -h /data/apk_files/gigzipfinder.apk
```

### 🔐 Permisos

Los archivos deben tener estos permisos:
```bash
chmod 755 /data/apk_files
chmod 644 /data/apk_files/gigzipfinder.apk
```

### 📤 Cómo Subir un Nuevo APK

1. Ve a: `https://gigzipfinder.com/admin/upload`
2. Selecciona tu archivo APK
3. Haz clic en "Subir APK"
4. El archivo se guardará automáticamente en `/data/apk_files/`

### 🛡️ Backup Manual (Opcional)

Si quieres hacer un backup manual:
```bash
# Crear backup
cp /data/apk_files/gigzipfinder.apk /data/apk_files/gigzipfinder.apk.backup

# Restaurar backup
cp /data/apk_files/gigzipfinder.apk.backup /data/apk_files/gigzipfinder.apk
```

### 🔍 Troubleshooting

**Si el APK desaparece:**
1. Verifica que está en `/data/apk_files/`: `ls -lah /data/apk_files/`
2. Verifica los logs del backend: `tail -f /var/log/supervisor/backend.err.log`
3. Verifica el espacio en disco: `df -h /data`

**Si no puedes subir APK:**
1. Verifica permisos: `ls -la /data/apk_files/`
2. Verifica espacio: `df -h /data` (necesitas ~100MB libres)
3. Verifica que el directorio existe: `mkdir -p /data/apk_files`

### 📝 Notas

- **Tamaño máximo:** ~100MB (tamaño actual del APK)
- **Formato:** Solo archivos `.apk`
- **Persistencia:** ✅ El archivo sobrevive a reinicios
- **Ubicación:** `/data/apk_files/gigzipfinder.apk`
