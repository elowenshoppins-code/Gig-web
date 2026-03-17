# Instrucciones Completas de Administración - GIG ZipFinder

## 1. Panel de Carga de APK

**URL**: `https://gif-tools-central.preview.emergentagent.com/admin/upload`

### Pasos:
1. Selecciona el archivo `.apk`
2. Haz clic en "Subir APK"
3. Verifica que se muestre el tamaño del archivo
4. Prueba la descarga con el botón "Probar Descarga"

---

## 2. Panel de Configuración de Tiendas y Analytics

**URL**: `https://gif-tools-central.preview.emergentagent.com/admin/settings`

### Configuraciones Disponibles:

#### A. Google Play Store
- **Campo**: URL de Google Play Store
- **Formato**: `https://play.google.com/store/apps/details?id=com.yourapp`
- **Efecto**: Cuando agregues la URL, el botón de Google Play en la página se activará automáticamente

#### B. Apple App Store
- **Campo**: URL de Apple App Store
- **Formato**: `https://apps.apple.com/us/app/your-app/id123456789`
- **Efecto**: Cuando agregues la URL, el botón de App Store en la página se activará automáticamente

#### C. Google Analytics
- **Campo**: Google Analytics 4 Tracking ID
- **Formato**: `G-XXXXXXXXXX`
- **Cómo obtenerlo**:
  1. Ve a [Google Analytics](https://analytics.google.com)
  2. Crea una propiedad GA4
  3. Copia el Measurement ID (G-XXXXXXXXXX)
  4. Pégalo en el campo

**⚠️ IMPORTANTE**: Después de guardar el GA ID, debes actualizarlo también en el código:
```javascript
// Archivo: /app/frontend/src/utils/analytics.js
// Línea 6: Reemplaza 'G-XXXXXXXXXX' con tu ID real
const TRACKING_ID = 'G-TU-ID-AQUÍ';
```

### Lo que se Trackea Automáticamente:
- ✅ Vistas de página
- ✅ Descargas de APK
- ✅ Clics en botones de Google Play Store
- ✅ Clics en botones de Apple App Store
- ✅ Cambios de idioma

---

## 3. Funcionamiento de los Botones de Tiendas

### Antes de Configurar URLs:
- Botones aparecen deshabilitados
- Muestran badge "Próximamente"

### Después de Configurar URLs:
- Botones se activan automáticamente
- Logos de tiendas se muestran correctamente
- Al hacer clic, redirigen a la tienda correspondiente
- Se trackea el clic en Google Analytics

---

## 4. Nuevas Características Implementadas

### ✅ Aviso de Alta Demanda
- Aparece antes del footer
- Mensaje profesional en 3 idiomas
- Explica que los códigos ZIP se llenan rápido

### ✅ Actualizaciones de Texto
- Hero: "*Condiciones y disponibilidad aplican"
- Features: "Sujeto a disponibilidad por alta demanda de descarga *"
- Pricing: "Te sugiere GRATIS 5 códigos postales"

### ✅ Logos Reales
- Visa, Mastercard, American Express (SVG profesionales)
- Google Play Store badge
- Apple App Store badge

---

## 5. Estructura de URLs Admin

```
/admin/upload        → Subir APK
/admin/settings      → Configurar tiendas y GA
```

---

## 6. Archivos de Configuración

### Backend:
- **APK**: `/app/backend/apk_files/gigzipfinder.apk`
- **Settings**: `/app/backend/config/app_settings.json`

### Frontend:
- **Analytics**: `/app/frontend/src/utils/analytics.js`

---

## 7. Checklist de Lanzamiento

- [ ] Subir APK desde `/admin/upload`
- [ ] Configurar Google Analytics ID en `/admin/settings`
- [ ] Actualizar GA ID en `/app/frontend/src/utils/analytics.js`
- [ ] (Opcional) Agregar URL de Google Play cuando esté disponible
- [ ] (Opcional) Agregar URL de App Store cuando esté disponible
- [ ] Verificar que los botones funcionen correctamente
- [ ] Probar descarga de APK
- [ ] Verificar tracking en Google Analytics

