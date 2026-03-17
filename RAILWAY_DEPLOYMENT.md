# 🚂 DEPLOYMENT EN RAILWAY - GUÍA COMPLETA

## 📋 PREREQUISITOS

1. ✅ Cuenta en Railway: https://railway.app
2. ✅ Cuenta en MongoDB Atlas (gratis): https://www.mongodb.com/cloud/atlas
3. ✅ GitHub account (para conectar el repositorio)

---

## 🎯 ARQUITECTURA EN RAILWAY

Tu aplicación se desplegará en **3 servicios separados**:

```
1. Backend (FastAPI)      → Puerto 8001 → /api/*
2. Frontend (React)       → Puerto 3000 → /*
3. MongoDB (Atlas)        → Externo → URL de conexión
```

---

## 📦 PASO 1: PREPARAR MONGODB ATLAS

### 1.1 Crear cluster gratuito

1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta (si no la tienes)
3. Crea un **cluster M0 (gratis)**:
   - Cloud Provider: AWS
   - Region: US East (N. Virginia) - us-east-1
   - Cluster Name: gigzipfinder

### 1.2 Configurar acceso

1. **Database Access** → Add New Database User:
   - Username: `gigzipfinder_user`
   - Password: (genera uno seguro, guárdalo)
   - Built-in Role: `Atlas admin`

2. **Network Access** → Add IP Address:
   - Selecciona: `Allow access from anywhere` (0.0.0.0/0)
   - (Railway usa IPs dinámicas)

### 1.3 Obtener Connection String

1. **Connect** → Drivers
2. Copia la connection string:
   ```
   mongodb+srv://gigzipfinder_user:<password>@gigzipfinder.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
3. Reemplaza `<password>` con tu password
4. **GUARDA ESTA URL** - la necesitarás

---

## 🚀 PASO 2: DEPLOY EN RAILWAY

### 2.1 Crear cuenta y conectar GitHub

1. Ve a: https://railway.app
2. Sign in con GitHub
3. Autoriza Railway

### 2.2 Subir tu código a GitHub

**Opción A: Usar el botón "Save to GitHub" en Emergent**

**Opción B: Manual (si tienes acceso al código)**

```bash
# En tu máquina local, después de descargar el código
git init
git add .
git commit -m "Initial commit - GIG ZipFinder"
git remote add origin https://github.com/TU_USUARIO/gigzipfinder.git
git push -u origin main
```

### 2.3 Crear proyecto en Railway

1. **New Project** → Deploy from GitHub repo
2. Selecciona tu repositorio: `gigzipfinder`
3. Railway detectará automáticamente la estructura

### 2.4 Configurar Backend Service

1. **Settings**:
   - Root Directory: `/backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

2. **Variables** (muy importante):
   ```
   MONGO_URL=mongodb+srv://gigzipfinder_user:<password>@gigzipfinder.xxxxx.mongodb.net
   DB_NAME=gigzipfinder
   CORS_ORIGINS=*
   ```

3. **Generate Domain**:
   - Railway generará: `your-backend.railway.app`
   - **COPIA ESTA URL**

### 2.5 Configurar Frontend Service

1. **Add Service** → GitHub Repo (mismo repo)

2. **Settings**:
   - Root Directory: `/frontend`
   - Build Command: `yarn install && yarn build`
   - Start Command: `yarn global add serve && serve -s build -l $PORT`

3. **Variables**:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```

4. **Generate Domain**:
   - Railway generará: `your-frontend.railway.app`
   - **ESTA ES TU APP**

---

## 🔗 PASO 3: MIGRAR APK A MONGODB ATLAS

**Importante:** Como el APK está en MongoDB GridFS, se migrará automáticamente cuando conectes a MongoDB Atlas.

### 3.1 Migrar datos locales a Atlas (Opcional)

Si quieres migrar tu APK actual:

```bash
# En tu máquina local
mongodump --uri="mongodb://localhost:27017" --db=test_database --out=./backup

mongorestore --uri="mongodb+srv://user:pass@gigzipfinder.xxxxx.mongodb.net" --db=gigzipfinder ./backup/test_database
```

### 3.2 O simplemente sube el APK de nuevo

Una vez desplegado:
1. Ve a: `https://your-frontend.railway.app/admin/upload`
2. Sube tu APK
3. Se guardará automáticamente en MongoDB Atlas

---

## 🌐 PASO 4: CONECTAR DOMINIO PERSONALIZADO

### 4.1 En Railway (Frontend Service)

1. **Settings** → **Domains**
2. **Custom Domain** → `gigzipfinder.com`
3. Railway te dará un **CNAME record**

### 4.2 En tu proveedor de dominio (Namecheap, GoDaddy, etc.)

1. Ve a tu DNS settings
2. Agrega un registro CNAME:
   ```
   Type: CNAME
   Name: @
   Value: your-frontend.railway.app
   TTL: Auto
   ```

3. Espera 5-30 minutos para propagación

### 4.3 Actualizar backend URL

1. Ve a Frontend Service en Railway
2. **Variables** → Edita:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```
3. Redeploy automáticamente

---

## ✅ PASO 5: VERIFICACIÓN

### 5.1 Probar Backend

```bash
curl https://your-backend.railway.app/api/apk/apk-info
# Debe devolver JSON con el APK
```

### 5.2 Probar Frontend

1. Abre: `https://your-frontend.railway.app`
2. Ve a la sección de descarga
3. El APK debe aparecer disponible

### 5.3 Probar con dominio custom

1. Abre: `https://gigzipfinder.com`
2. Todo debe funcionar igual

---

## 💰 COSTOS EN RAILWAY

**Plan Gratuito:**
- $5 USD de crédito gratis cada mes
- Suficiente para:
  - Backend: ~$3/mes
  - Frontend: ~$2/mes
  - **Total: ~$5/mes = GRATIS**

**Plan Pro ($20/mes):**
- Si necesitas más recursos
- Custom domains ilimitados
- Mejor rendimiento

---

## 🔧 VARIABLES DE ENTORNO - REFERENCIA COMPLETA

### Backend (.env o Railway Variables)
```bash
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=gigzipfinder
CORS_ORIGINS=*
PORT=8001  # Railway lo asigna automáticamente
```

### Frontend (.env o Railway Variables)
```bash
REACT_APP_BACKEND_URL=https://your-backend.railway.app
PORT=3000  # Railway lo asigna automáticamente
```

---

## 📊 MONITOREO

### En Railway Dashboard:

1. **Metrics** - Ver uso de CPU/RAM
2. **Logs** - Ver logs en tiempo real
3. **Deployments** - Historia de deployments

### Comandos útiles:

```bash
# Ver logs del backend
railway logs --service backend

# Ver logs del frontend  
railway logs --service frontend

# Restart servicios
railway restart
```

---

## 🔄 UPDATES / ACTUALIZACIONES

**Cada vez que hagas cambios:**

1. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Update feature X"
   git push
   ```

2. Railway detecta cambios automáticamente
3. Re-deploy automático en ~2 minutos

---

## 🆘 TROUBLESHOOTING

### ❌ "APK no disponible"

1. Verifica que MongoDB Atlas esté conectado:
   ```bash
   curl https://your-backend.railway.app/api/apk/apk-info
   ```

2. Si devuelve `{exists: false}`, sube el APK:
   - Ve a `/admin/upload`
   - Sube tu archivo APK

### ❌ "CORS error"

1. Verifica variable `CORS_ORIGINS=*` en backend
2. O específica tu dominio:
   ```
   CORS_ORIGINS=https://gigzipfinder.com,https://your-frontend.railway.app
   ```

### ❌ "502 Bad Gateway"

1. Backend no está corriendo
2. Verifica logs en Railway
3. Verifica que `MONGO_URL` esté correcta

---

## 🎉 RESULTADO FINAL

**Tu app estará disponible en:**

✅ `https://gigzipfinder.com` (dominio custom)  
✅ `https://your-frontend.railway.app` (Railway subdomain)  
✅ Backend API: `https://your-backend.railway.app/api/*`  
✅ MongoDB: Atlas (persistente y seguro)  
✅ **100% INDEPENDIENTE de Emergent**

---

## 📞 SOPORTE

**Railway:**
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

**MongoDB Atlas:**
- Docs: https://docs.mongodb.com/cloud
- Support: https://www.mongodb.com/contact

---

## 📝 CHECKLIST FINAL

Antes de considerar el deployment completo:

- [ ] MongoDB Atlas configurado
- [ ] Código en GitHub
- [ ] Backend desplegado en Railway
- [ ] Frontend desplegado en Railway
- [ ] Variables de entorno configuradas
- [ ] APK subido y disponible
- [ ] Dominio custom conectado (opcional)
- [ ] Todo funciona sin Emergent

---

**🚀 ¡Tu app está lista para producción y completamente independiente!**
