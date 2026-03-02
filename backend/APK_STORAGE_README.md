# APK Storage Configuration

## ⚠️ CRÍTICO: Almacenamiento REALMENTE Persistente

El archivo APK se guarda en el **ÚNICO volumen persistente** del contenedor para garantizar que nunca se pierda.

### 📁 Ubicación del APK

**Ubicación actual (PERSISTENTE GARANTIZADO):**
```
/data/db/apk_storage/gigzipfinder.apk
```

### 🔍 Por Qué Esta Ubicación Específica

**Volúmenes en el contenedor:**
- ✅ `/data/db` → **PERSISTENTE** (montado en volumen de Kubernetes)
- ❌ `/data/` → **NO persistente** (se recrea en cada reinicio)
- ❌ `/app/` → **NO persistente** (efímero)

**¿Por qué /data/db/apk_storage?**
- `/data/db` es el ÚNICO directorio con volumen persistente montado
- Originalmente para MongoDB, pero podemos usar subdirectorios
- Todo lo demás se BORRA al reiniciar el contenedor

**❌ Ubicación antigua (NO persistente):**
```
/app/backend/apk_files/  # Esta se pierde al reiniciar el contenedor
```

### 🔄 Por Qué Se Cambió OTRA VEZ

**Historia de ubicaciones:**
1. ❌ `/app/backend/apk_files/` - Se perdía (efímero)
2. ❌ `/data/apk_files/` - También se perdía (no montado)
3. ✅ `/data/db/apk_storage/` - **REALMENTE persistente**

**El problema:**
- Solo `/data/db` tiene un volumen montado de Kubernetes
- `/data/` sin el subdirectorio `db` NO es persistente
- Fue un error asumir que todo `/data` era persistente

### 📊 Verificación

Para verificar que el APK existe:
```bash
ls -lah /data/db/apk_storage/
```

Para verificar el tamaño:
```bash
du -h /data/db/apk_storage/gigzipfinder.apk
```

Para verificar que está en volumen persistente:
```bash
mount | grep "/data/db"
# Debe mostrar: /dev/nvme0n4 on /data/db type ext4 (rw,relatime)
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
