# Instrucciones para Cargar el APK de GIG ZipFinder

## Acceso al Panel de Administración

Para subir el archivo APK y hacerlo disponible para descarga en la página web:

### URL del Panel Admin:
```
https://gif-tools-central.preview.emergentagent.com/admin/upload
```

## Pasos para Subir el APK:

1. **Accede a la URL del admin** (link arriba)

2. **Selecciona el archivo APK**:
   - Haz clic en el botón de selección de archivo
   - Busca y selecciona el archivo `GIGZipFinder.apk` de tu computadora
   - Solo se aceptan archivos con extensión `.apk`

3. **Sube el archivo**:
   - Haz clic en el botón "Subir APK"
   - Espera a que termine la carga (verás un mensaje de éxito ✅)

4. **Verifica**:
   - El panel mostrará información del APK actual (tamaño en MB)
   - Puedes probar la descarga usando el botón "Probar Descarga"

5. **Listo**:
   - El APK estará inmediatamente disponible en la página principal
   - Los usuarios podrán descargarlo haciendo clic en "Descargar APK para Android"

## Actualizar el APK:

Para subir una nueva versión del APK, simplemente repite el proceso. El archivo anterior será reemplazado automáticamente.

## Ubicación del Archivo:

El APK se almacena en el servidor en:
```
/app/backend/apk_files/gigzipfinder.apk
```

## Endpoints de la API:

- **Subir APK**: `POST /api/apk/upload-apk`
- **Descargar APK**: `GET /api/apk/download-apk`
- **Info del APK**: `GET /api/apk/apk-info`

## Notas Importantes:

- ⚠️ El panel de admin NO tiene autenticación actualmente
- 📱 Solo se aceptan archivos `.apk`
- 💾 El archivo se almacena en el servidor de forma persistente
- 🔄 Puedes actualizar el APK cuantas veces necesites
