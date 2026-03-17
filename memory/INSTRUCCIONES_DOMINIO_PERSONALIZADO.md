# Configuración de Dominio Personalizado: gigzipfinder.com

## Paso 1: Comprar el Dominio

### Opción A: Google Domains (Recomendado)
1. Ve a [Google Domains](https://domains.google.com)
2. Busca `gigzipfinder.com`
3. Si está disponible, agrégalo al carrito
4. Completa la compra (aproximadamente $12 USD/año)

### Opción B: Otras Alternativas
- **Namecheap**: https://www.namecheap.com
- **GoDaddy**: https://www.godaddy.com
- **Cloudflare**: https://www.cloudflare.com/products/registrar/

---

## Paso 2: Obtener la Información de DNS de Emergent

**Contacta al equipo de Emergent** para obtener:
- La dirección IP o CNAME target
- Instrucciones específicas de configuración DNS

**Información que probablemente necesitarás:**
- Tu app ID: `gif-tools-central`
- URL actual: `gif-tools-central.preview.emergentagent.com`

---

## Paso 3: Configurar DNS Records

### En Google Domains:

1. **Accede a tu dominio**:
   - Ve a [Google Domains](https://domains.google.com)
   - Haz clic en tu dominio `gigzipfinder.com`

2. **Ve a la sección DNS**:
   - En el menú lateral, haz clic en "DNS"
   - Selecciona "Administrar registros personalizados"

3. **Agrega los siguientes registros**:

#### Registro A (para el dominio raíz):
```
Tipo: A
Nombre: @
Datos: [IP proporcionada por Emergent]
TTL: 3600
```

#### Registro CNAME (para www):
```
Tipo: CNAME
Nombre: www
Datos: gif-tools-central.preview.emergentagent.com
TTL: 3600
```

#### Ejemplo de configuración típica:
| Tipo  | Nombre | Datos                                          | TTL  |
|-------|--------|------------------------------------------------|------|
| A     | @      | 34.120.XXX.XXX (IP de Emergent)               | 3600 |
| CNAME | www    | gif-tools-central.preview.emergentagent.com   | 3600 |

4. **Guarda los cambios**

---

## Paso 4: Configurar en Emergent (Requiere Soporte)

Necesitarás que el equipo de Emergent configure tu app para aceptar el dominio personalizado.

**Información a proporcionar**:
- Dominio: `gigzipfinder.com`
- También quieres que funcione con: `www.gigzipfinder.com`
- App ID actual: `gif-tools-central`

**El equipo configurará**:
- SSL/TLS certificado (HTTPS automático)
- Redirecciones de www → non-www o viceversa
- Configuración de ingress en Kubernetes

---

## Paso 5: Verificar la Configuración

### A. Verificar propagación DNS (Toma 5 minutos a 48 horas)

1. **Usando herramientas online**:
   - [DNS Checker](https://dnschecker.org)
   - Ingresa `gigzipfinder.com`
   - Verifica que el registro A apunte a la IP correcta

2. **Usando comando en terminal**:
```bash
# Verificar registro A
nslookup gigzipfinder.com

# Verificar registro CNAME para www
nslookup www.gigzipfinder.com
```

### B. Probar en navegador:
1. Espera 5-10 minutos después de configurar DNS
2. Abre `https://gigzipfinder.com` en tu navegador
3. Verifica que cargue tu aplicación correctamente
4. Verifica que `https://www.gigzipfinder.com` también funcione

---

## Paso 6: Actualizar Variables de Entorno (Después de que funcione)

Una vez que el dominio esté funcionando, actualiza las referencias en tu código:

### Frontend .env:
```bash
# Archivo: /app/frontend/.env
REACT_APP_BACKEND_URL=https://gigzipfinder.com
```

### Google Analytics:
Actualiza la propiedad en Google Analytics para usar el nuevo dominio.

### Redes Sociales:
Actualiza los enlaces en:
- TikTok bio
- Instagram bio
- Cualquier otro lugar donde hayas compartido la URL

---

## Paso 7: Configuración Adicional (Opcional pero Recomendado)

### A. Configurar Email con tu dominio:
- **Google Workspace**: `admin@gigzipfinder.com`, `support@gigzipfinder.com`
- Costo: ~$6 USD/usuario/mes

### B. Subdominios útiles:
```
app.gigzipfinder.com     → Para la aplicación móvil (futuro)
api.gigzipfinder.com     → Para la API (si separas frontend/backend)
blog.gigzipfinder.com    → Para blog (futuro)
```

---

## Troubleshooting Común

### ❌ Error: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solución**: DNS no se ha propagado aún. Espera más tiempo (hasta 48h).

### ❌ Error: "This site can't provide a secure connection"
**Solución**: El certificado SSL aún no está configurado. Contacta a Emergent.

### ❌ El dominio apunta a otro lugar
**Solución**: Verifica que hayas ingresado los DNS records correctamente.

### ❌ www.gigzipfinder.com no funciona
**Solución**: Verifica el registro CNAME para "www".

---

## Checklist de Configuración

- [ ] Comprar dominio `gigzipfinder.com`
- [ ] Obtener IP/CNAME de Emergent
- [ ] Configurar registro A en DNS
- [ ] Configurar registro CNAME para www
- [ ] Contactar a Emergent para configuración SSL
- [ ] Esperar propagación DNS (5min - 48h)
- [ ] Verificar https://gigzipfinder.com funciona
- [ ] Verificar https://www.gigzipfinder.com funciona
- [ ] Actualizar REACT_APP_BACKEND_URL en .env
- [ ] Actualizar Google Analytics
- [ ] Actualizar bios de redes sociales

---

## Contacto de Soporte Emergent

Para configurar el dominio personalizado, contacta al equipo de Emergent:
- **Email**: support@emergent.sh (o el email que te proporcionaron)
- **Información necesaria**: 
  - Tu App ID: `gif-tools-central`
  - Dominio deseado: `gigzipfinder.com`
  - Request: Configurar dominio personalizado con SSL

---

## Tiempo Estimado Total

- **Compra de dominio**: 10 minutos
- **Configuración DNS**: 15 minutos
- **Propagación DNS**: 5 minutos - 48 horas
- **Configuración Emergent**: 1-24 horas (según soporte)
- **Total**: 1-3 días para estar completamente operativo

---

## Costos Anuales

- **Dominio .com**: ~$12-15 USD/año
- **Hosting (Emergent)**: Ya incluido en tu plan
- **SSL Certificate**: Gratis (Let's Encrypt vía Emergent)
- **Total**: ~$12-15 USD/año

