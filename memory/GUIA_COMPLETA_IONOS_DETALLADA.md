# GUÍA COMPLETA Y DETALLADA: Migrar GIG ZipFinder a IONOS
## De principio a fin, paso a paso, para principiantes

---

## 📋 ÍNDICE

1. [Preparación: Exportar código de Emergent](#paso-1)
2. [Contratar y configurar IONOS VPS](#paso-2)
3. [Conectarse al servidor por SSH](#paso-3)
4. [Subir archivos al servidor](#paso-4)
5. [Instalar todo lo necesario](#paso-5)
6. [Configurar Backend (FastAPI)](#paso-6)
7. [Configurar Frontend (React)](#paso-7)
8. [Configurar Nginx (servidor web)](#paso-8)
9. [Migrar Base de Datos MongoDB](#paso-9)
10. [Configurar el dominio gigzipfinder.com](#paso-10)
11. [Instalar SSL (HTTPS)](#paso-11)
12. [Verificar que todo funcione](#paso-12)
13. [Configurar backups automáticos](#paso-13)
14. [Mantenimiento diario](#paso-14)

---

<a name="paso-1"></a>
## 1️⃣ PASO 1: PREPARACIÓN - EXPORTAR CÓDIGO DE EMERGENT

### ¿Qué vamos a hacer?
Vamos a crear una copia completa de tu aplicación actual para transferirla a IONOS.

### Método A: Usar GitHub (RECOMENDADO - Más profesional)

#### 1.1 Crear repositorio en GitHub

**En tu navegador:**
1. Ve a https://github.com
2. Si no tienes cuenta, crea una (es gratis)
3. Haz clic en el botón verde "New" o "+" → "New repository"
4. Completa:
   - **Repository name:** `gigzipfinder`
   - **Description:** "GIG ZipFinder - Landing Page"
   - **Visibilidad:** Elige "Private" (para que solo tú lo veas)
5. NO marques ninguna opción de README, .gitignore, etc.
6. Haz clic en "Create repository"

**Te mostrará una página con comandos.** Copia la URL que dice algo como:
```
https://github.com/TU_USUARIO/gigzipfinder.git
```

#### 1.2 Subir código a GitHub desde Emergent

**En terminal de Emergent:**
```bash
cd /app

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Initial commit - GIG ZipFinder"

# Conectar con GitHub (usa TU URL del paso anterior)
git remote add origin https://github.com/TU_USUARIO/gigzipfinder.git

# Subir código
git push -u origin main
```

**Si te pide usuario/contraseña:**
- Usuario: tu email de GitHub
- Contraseña: NO uses tu contraseña normal, usa un **Personal Access Token**

**Para crear token:**
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → Dale un nombre como "IONOS Deploy"
3. Marca: "repo" (todo)
4. "Generate token"
5. COPIA el token (solo se muestra una vez)
6. Úsalo como contraseña

**✅ Listo!** Tu código está en GitHub, ahora puedes descargarlo en IONOS fácilmente.

---

### Método B: Descargar archivo ZIP (Alternativa simple)

**En terminal de Emergent:**
```bash
cd /app

# Crear archivo comprimido
tar -czf gigzipfinder-backup.tar.gz \
  frontend/ \
  backend/ \
  --exclude=frontend/node_modules \
  --exclude=backend/venv \
  --exclude=backend/__pycache__

# Ver tamaño del archivo
ls -lh gigzipfinder-backup.tar.gz
```

**Descargar a tu computadora:**

Si tienes acceso a la carpeta de Emergent:
1. Localiza el archivo `gigzipfinder-backup.tar.gz`
2. Descárgalo a tu computadora (en Descargas o Escritorio)

---

<a name="paso-2"></a>
## 2️⃣ PASO 2: CONTRATAR IONOS VPS

### ¿Qué es un VPS?
Un "Servidor Privado Virtual" - es como tener tu propia computadora en internet que está encendida 24/7.

### 2.1 Ir a IONOS y elegir plan

1. **Abre tu navegador** y ve a: https://www.ionos.com/hosting/vps-hosting

2. **Verás varios planes**, busca estos:
   - **VPS M** (Recomendado para empezar)
     - Precio: ~$10-15 USD/mes
     - 4 GB RAM
     - 2 vCores CPU
     - 160 GB almacenamiento
   
   - **VPS L** (Si esperas mucho tráfico)
     - Precio: ~$20-30 USD/mes
     - 8 GB RAM
     - 4 vCores
     - 240 GB almacenamiento

3. **Haz clic en "Comprar ahora"** o "Buy now" en el plan que elijas

### 2.2 Configurar tu VPS

Te llevará a una página de configuración:

**IMPORTANTE - Selecciona estas opciones:**

1. **Operating System (Sistema Operativo):**
   - ✅ Selecciona: **"Ubuntu 22.04 LTS"**
   - ❌ NO elijas Windows Server (es más caro y no lo necesitas)

2. **Data Center Location (Ubicación del servidor):**
   - Elige el más cercano a tu audiencia principal
   - Para USA: "USA - East Coast" o "USA - West Coast"

3. **Additional Options:**
   - NO necesitas agregar nada más por ahora
   - Puedes activar backups automáticos más tarde

4. **Haz clic en "Continue" o "Continuar"**

### 2.3 Completar la compra

1. **Ingresa tus datos:**
   - Email (importante - aquí llegarán las credenciales)
   - Información de pago

2. **Revisa el resumen:**
   - VPS M: ~$10-15/mes
   - Ubuntu 22.04
   - Total: ~$10-15/mes

3. **Completar pago**

### 2.4 Esperar email de confirmación

**Recibirás 1 o 2 emails:**

**Email 1: Confirmación de compra**
```
Asunto: Your IONOS order confirmation
```

**Email 2: Credenciales de acceso (MUY IMPORTANTE)**
```
Asunto: Your IONOS VPS access details
Contendrá:
- IP Address: 123.456.789.012
- Username: root
- Password: TuPasswordTemporal123!
```

**⚠️ GUARDA ESTE EMAIL** - lo necesitarás en el siguiente paso.

---

<a name="paso-3"></a>
## 3️⃣ PASO 3: CONECTARSE AL SERVIDOR POR SSH

### ¿Qué es SSH?
SSH es como "Remote Desktop" pero por texto - te permite controlar tu servidor desde tu computadora.

### 3.1 WINDOWS - Conectarse usando PowerShell

**Opción 1: PowerShell (Recomendado - viene en Windows 10/11)**

1. **Abrir PowerShell:**
   - Presiona tecla `Windows + X`
   - Selecciona "Windows PowerShell" o "Terminal"

2. **Conectar al servidor:**
```powershell
ssh root@TU_IP_SERVIDOR
```

**Ejemplo real:**
```powershell
ssh root@123.456.789.012
```

3. **Primera conexión - Mensaje de seguridad:**
Te preguntará:
```
The authenticity of host '123.456.789.012' can't be established.
Are you sure you want to continue connecting (yes/no)?
```
**Escribe:** `yes` y presiona Enter

4. **Ingresar contraseña:**
```
root@123.456.789.012's password:
```
- Pega la contraseña del email (clic derecho para pegar)
- NO verás nada mientras escribes (es normal)
- Presiona Enter

5. **Cambiar contraseña (primera vez):**
Te pedirá cambiar la contraseña:
```
Current password: [tu password temporal]
New password: [tu nueva password segura]
Retype new password: [repite la nueva password]
```

**✅ ¡Conectado!** Verás algo como:
```
Welcome to Ubuntu 22.04 LTS
root@vps-123456:~#
```

---

**Opción 2: PuTTY (Alternativa si PowerShell no funciona)**

1. **Descargar PuTTY:**
   - Ve a: https://www.putty.org/
   - Descarga "putty.exe"
   - Ejecuta el archivo

2. **Configurar conexión:**
   - En "Host Name": escribe tu IP (ejemplo: 123.456.789.012)
   - En "Port": deja 22
   - En "Connection type": deja SSH
   - Haz clic en "Open"

3. **Continúa desde el paso 3 del PowerShell** (mensaje de seguridad, contraseña, etc.)

---

### 3.2 MAC/LINUX - Conectarse usando Terminal

1. **Abrir Terminal:**
   - Mac: `Cmd + Espacio` → escribe "Terminal"
   - Linux: `Ctrl + Alt + T`

2. **Conectar:**
```bash
ssh root@TU_IP_SERVIDOR
```

3. **Sigue los pasos 3-5 de la sección Windows** (son iguales)

---

### 3.3 Consejos para trabajar en SSH

**Comandos básicos que usarás:**
```bash
ls          # Ver archivos en la carpeta actual
cd /ruta    # Ir a una carpeta
pwd         # Ver en qué carpeta estás
nano file   # Editar un archivo (Ctrl+X para salir)
exit        # Cerrar conexión SSH
```

**Si te quedas atascado:**
- Presiona `Ctrl + C` para cancelar comando actual
- Escribe `exit` para cerrar SSH y volver a intentar

---

<a name="paso-4"></a>
## 4️⃣ PASO 4: SUBIR ARCHIVOS AL SERVIDOR

### Método A: Usando GitHub (RECOMENDADO)

Si subiste tu código a GitHub en el Paso 1, esto es MUY fácil:

**En tu servidor IONOS (conectado por SSH):**

```bash
# 1. Instalar Git (si no está instalado)
apt update
apt install -y git

# 2. Crear carpeta para tu aplicación
mkdir -p /var/www
cd /var/www

# 3. Clonar tu repositorio
git clone https://github.com/TU_USUARIO/gigzipfinder.git

# Te pedirá usuario/contraseña de GitHub:
# Usuario: tu email de GitHub
# Password: tu token de GitHub (del Paso 1)

# 4. Verificar que se descargó
cd gigzipfinder
ls -la
```

**Deberías ver:**
```
drwxr-xr-x  frontend/
drwxr-xr-x  backend/
```

**✅ Listo!** Tu código está en el servidor.

**VENTAJA:** En el futuro, puedes actualizar con:
```bash
cd /var/www/gigzipfinder
git pull
```

---

### Método B: Subir archivo ZIP con SCP

Si creaste el archivo `.tar.gz` en el Paso 1:

#### Desde Windows (PowerShell):

```powershell
# En PowerShell (NO en el servidor)
# Asegúrate de estar en la carpeta donde está tu archivo

cd C:\Users\TuUsuario\Downloads

# Subir archivo
scp gigzipfinder-backup.tar.gz root@TU_IP_SERVIDOR:/root/

# Te pedirá la contraseña del servidor
```

#### Desde Mac/Linux (Terminal):

```bash
# En Terminal (NO en el servidor)
cd ~/Downloads

# Subir archivo
scp gigzipfinder-backup.tar.gz root@TU_IP_SERVIDOR:/root/
```

**Luego, en el servidor IONOS:**

```bash
# Conectarte por SSH si no estás conectado
ssh root@TU_IP_SERVIDOR

# Descomprimir
cd /root
mkdir -p /var/www
tar -xzf gigzipfinder-backup.tar.gz -C /var/www/

# Verificar
cd /var/www
ls -la
```

---

### Método C: Usando interfaz web (más lento pero visual)

**Si prefieres subir archivos con interfaz gráfica:**

1. **Instalar FileZilla (cliente FTP/SFTP):**
   - Descargar de: https://filezilla-project.org/
   - Instalar en tu computadora

2. **Conectar a tu servidor:**
   - Host: `sftp://TU_IP_SERVIDOR`
   - Usuario: `root`
   - Contraseña: tu contraseña del servidor
   - Puerto: `22`
   - Clic en "Quickconnect"

3. **Subir archivos:**
   - Lado izquierdo: archivos de tu computadora
   - Lado derecho: archivos del servidor
   - Arrastra carpetas `frontend/` y `backend/` al lado derecho
   - Destino: `/var/www/`

**Nota:** Este método es MÁS LENTO que GitHub o SCP.

---

<a name="paso-5"></a>
## 5️⃣ PASO 5: INSTALAR TODO LO NECESARIO

### ¿Qué vamos a instalar?
- Node.js (para React)
- Python (para FastAPI)
- MongoDB (base de datos)
- Nginx (servidor web)
- PM2 (mantener apps corriendo)
- Certbot (SSL gratis)

**⏱️ Tiempo estimado:** 15-20 minutos

### 5.1 Actualizar el sistema

```bash
# Conectado por SSH a tu servidor IONOS

# Actualizar lista de paquetes
apt update

# Actualizar paquetes instalados
apt upgrade -y
```

**Esto puede tomar 5-10 minutos.** Verás muchos textos pasando. Es normal.

---

### 5.2 Instalar Node.js y Yarn

**Node.js (para React):**

```bash
# Agregar repositorio de Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Instalar Node.js
apt install -y nodejs

# Verificar instalación
node --version    # Debe mostrar: v20.x.x
npm --version     # Debe mostrar: 10.x.x
```

**Yarn (mejor que npm):**

```bash
npm install -g yarn

# Verificar
yarn --version    # Debe mostrar: 1.22.x
```

---

### 5.3 Instalar Python y herramientas

```bash
# Instalar Python 3 y pip
apt install -y python3 python3-pip python3-venv

# Verificar instalación
python3 --version    # Debe mostrar: Python 3.10.x
pip3 --version       # Debe mostrar: pip 22.x.x
```

---

### 5.4 Instalar MongoDB

**MongoDB (Base de datos):**

```bash
# Importar clave GPG de MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Agregar repositorio
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Actualizar e instalar
apt update
apt install -y mongodb-org

# Iniciar MongoDB
systemctl start mongod
systemctl enable mongod

# Verificar que esté corriendo
systemctl status mongod
```

**Deberías ver:**
```
● mongod.service - MongoDB Database Server
   Active: active (running)
```

**Presiona `q` para salir.**

---

### 5.5 Instalar Nginx

**Nginx (Servidor web):**

```bash
# Instalar Nginx
apt install -y nginx

# Iniciar Nginx
systemctl start nginx
systemctl enable nginx

# Verificar
systemctl status nginx
```

**Probar en navegador:**
- Ve a: `http://TU_IP_SERVIDOR`
- Deberías ver: "Welcome to nginx!"

---

### 5.6 Instalar Certbot (SSL)

**Certbot (para HTTPS gratis):**

```bash
apt install -y certbot python3-certbot-nginx
```

---

### 5.7 Instalar PM2

**PM2 (mantener apps corriendo 24/7):**

```bash
npm install -g pm2

# Verificar
pm2 --version
```

---

### 5.8 Instalar Git (si no lo hiciste antes)

```bash
apt install -y git
```

---

### ✅ VERIFICACIÓN - Todo instalado correctamente

```bash
# Copia y pega este script para verificar todo:

echo "=== Verificando instalaciones ==="
echo ""
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Yarn: $(yarn --version)"
echo "Python: $(python3 --version)"
echo "pip: $(pip3 --version)"
echo "MongoDB: $(mongod --version | head -n 1)"
echo "Nginx: $(nginx -v 2>&1)"
echo "Certbot: $(certbot --version)"
echo "PM2: $(pm2 --version)"
echo "Git: $(git --version)"
echo ""
echo "=== Fin de verificación ==="
```

**Si todos muestran versiones, ¡perfecto!**

---

<a name="paso-6"></a>
## 6️⃣ PASO 6: CONFIGURAR BACKEND (FastAPI)

### ¿Qué haremos?
1. Crear entorno virtual Python
2. Instalar dependencias
3. Configurar variables de entorno
4. Probar que funcione
5. Configurar PM2 para que corra 24/7

### 6.1 Ir a la carpeta del backend

```bash
cd /var/www/gigzipfinder/backend
# o si usaste otro método:
# cd /var/www/backend
```

### 6.2 Crear entorno virtual Python

```bash
# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
source venv/bin/activate

# Tu prompt cambiará a:
# (venv) root@vps-123456:/var/www/gigzipfinder/backend#
```

**Esto aísla las dependencias de Python de tu app.**

### 6.3 Instalar dependencias

```bash
# Asegúrate de estar en /var/www/gigzipfinder/backend
# y que el entorno virtual esté activado (debe decir "venv")

pip install -r requirements.txt
```

**Esto instalará:** FastAPI, Uvicorn, MongoDB driver, etc.
**Tiempo:** 2-3 minutos

### 6.4 Configurar archivo .env

```bash
# Crear/editar archivo .env
nano .env
```

**Contenido del archivo:**
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=gigzipfinder
```

**Guardar archivo:**
- Presiona `Ctrl + O` (guardar)
- Presiona `Enter` (confirmar nombre)
- Presiona `Ctrl + X` (salir)

### 6.5 Crear carpeta para APK

```bash
mkdir -p /var/www/gigzipfinder/backend/apk_files
mkdir -p /var/www/gigzipfinder/backend/config
```

### 6.6 Probar que el backend funcione

```bash
# Estando en /var/www/gigzipfinder/backend
# Con entorno virtual activado

# Probar manualmente
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
```

**Deberías ver:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8001
```

**Probar en otra terminal o navegador:**
```bash
# En otra ventana de terminal SSH:
curl http://localhost:8001/api/
```

**Debería responder:**
```json
{"message":"Hello World"}
```

**Si funciona:**
- Presiona `Ctrl + C` para detener el servidor
- Continuaremos configurándolo con PM2

**Si NO funciona, revisa:**
```bash
# Ver logs de error
tail -f /var/log/supervisor/backend.err.log
```

### 6.7 Configurar PM2 (mantener backend corriendo 24/7)

**Crear archivo de configuración PM2:**

```bash
nano /var/www/gigzipfinder/backend/ecosystem.config.js
```

**Contenido:**
```javascript
module.exports = {
  apps: [{
    name: 'gigzipfinder-backend',
    script: 'venv/bin/uvicorn',
    args: 'server:app --host 0.0.0.0 --port 8001',
    cwd: '/var/www/gigzipfinder/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      PYTHONPATH: '/var/www/gigzipfinder/backend',
      NODE_ENV: 'production'
    },
    error_file: '/var/log/pm2/gigzipfinder-backend-error.log',
    out_file: '/var/log/pm2/gigzipfinder-backend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
```

**Guardar:** `Ctrl + O`, `Enter`, `Ctrl + X`

**Crear carpeta de logs:**
```bash
mkdir -p /var/log/pm2
```

**Iniciar con PM2:**
```bash
cd /var/www/gigzipfinder/backend
pm2 start ecosystem.config.js
```

**Verificar que esté corriendo:**
```bash
pm2 status
```

**Deberías ver:**
```
┌─────┬────────────────────────┬─────────┬─────────┐
│ id  │ name                   │ status  │ cpu     │
├─────┼────────────────────────┼─────────┼─────────┤
│ 0   │ gigzipfinder-backend   │ online  │ 0%      │
└─────┴────────────────────────┴─────────┴─────────┘
```

**Configurar PM2 para iniciar al reiniciar servidor:**
```bash
pm2 save
pm2 startup
```

**Te mostrará un comando, cópialo y ejecútalo.**

**✅ Backend configurado y corriendo!**

---

<a name="paso-7"></a>
## 7️⃣ PASO 7: CONFIGURAR FRONTEND (React)

### ¿Qué haremos?
1. Configurar variables de entorno
2. Instalar dependencias
3. Compilar para producción
4. Optimizar para web

### 7.1 Ir a la carpeta del frontend

```bash
cd /var/www/gigzipfinder/frontend
```

### 7.2 Configurar archivo .env

```bash
nano .env
```

**Contenido (IMPORTANTE - usa TU dominio):**
```bash
REACT_APP_BACKEND_URL=https://gigzipfinder.com
```

**Si aún NO tienes el dominio configurado, usa temporalmente la IP:**
```bash
REACT_APP_BACKEND_URL=http://TU_IP_SERVIDOR
```

**Guardar:** `Ctrl + O`, `Enter`, `Ctrl + X`

### 7.3 Instalar dependencias

```bash
# Asegúrate de estar en /var/www/gigzipfinder/frontend

yarn install
```

**Esto puede tomar 5-10 minutos.**

**Verás muchos paquetes instalándose. Es normal.**

### 7.4 Compilar para producción

```bash
yarn build
```

**Esto:**
- Compila React a JavaScript optimizado
- Minimiza archivos
- Crea carpeta `build/` lista para producción

**Tiempo:** 2-5 minutos

**Al terminar, verás:**
```
Compiled successfully!

File sizes after gzip:

  [tamaños de archivos...]

The build folder is ready to be deployed.
```

### 7.5 Verificar que se creó la carpeta build

```bash
ls -la build/
```

**Deberías ver:**
```
index.html
static/
  css/
  js/
  media/
```

**✅ Frontend compilado y listo!**

---

<a name="paso-8"></a>
## 8️⃣ PASO 8: CONFIGURAR NGINX (Servidor Web)

### ¿Qué hace Nginx?
- Sirve tu frontend (archivos HTML/CSS/JS)
- Redirige llamadas API al backend
- Maneja HTTPS (SSL)
- Comprime archivos para velocidad

### 8.1 Crear configuración de Nginx

```bash
nano /etc/nginx/sites-available/gigzipfinder
```

**Contenido completo (copia todo):**

```nginx
# GIG ZipFinder - Configuración Nginx

server {
    listen 80;
    listen [::]:80;
    
    server_name gigzipfinder.com www.gigzipfinder.com;
    
    # Si usas IP temporalmente, cambia server_name a:
    # server_name TU_IP_SERVIDOR;
    
    # Logs
    access_log /var/log/nginx/gigzipfinder-access.log;
    error_log /var/log/nginx/gigzipfinder-error.log;
    
    # Tamaño máximo de carga (para APK)
    client_max_body_size 100M;
    
    # Frontend - React (archivos estáticos)
    location / {
        root /var/www/gigzipfinder/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Seguridad
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # Cache para archivos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API - FastAPI
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Favicon
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }
    
    # Robots.txt
    location = /robots.txt {
        log_not_found off;
        access_log off;
    }
}
```

**Guardar:** `Ctrl + O`, `Enter`, `Ctrl + X`

### 8.2 Activar configuración

```bash
# Crear enlace simbólico (activar sitio)
ln -s /etc/nginx/sites-available/gigzipfinder /etc/nginx/sites-enabled/

# Verificar configuración (IMPORTANTE)
nginx -t
```

**Deberías ver:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Si hay error:**
- Revisa que copiaste todo el archivo correctamente
- Verifica rutas en `root` y `proxy_pass`

### 8.3 Eliminar configuración default (opcional)

```bash
rm /etc/nginx/sites-enabled/default
```

### 8.4 Reiniciar Nginx

```bash
systemctl restart nginx
```

### 8.5 Verificar que Nginx esté corriendo

```bash
systemctl status nginx
```

**Debe decir:** `Active: active (running)`

### 8.6 Probar en navegador

**Abre tu navegador y ve a:**
- `http://TU_IP_SERVIDOR`

**Deberías ver tu landing page de GIG ZipFinder!**

**Si ves error 502 Bad Gateway:**
```bash
# Verificar que backend esté corriendo
pm2 status

# Ver logs
pm2 logs gigzipfinder-backend

# Reiniciar backend
pm2 restart gigzipfinder-backend
```

**✅ Nginx configurado correctamente!**

---

<a name="paso-9"></a>
## 9️⃣ PASO 9: MIGRAR BASE DE DATOS MONGODB

### ¿Qué haremos?
Copiar todos los datos de MongoDB desde Emergent a IONOS.

### 9.1 Exportar datos desde Emergent

**En terminal de Emergent (o donde esté tu app actual):**

```bash
# Crear backup de MongoDB
mongodump --uri="mongodb://localhost:27017" --db=gigzipfinder --out=/tmp/backup

# Comprimir
cd /tmp
tar -czf mongodb-backup.tar.gz backup/

# Verificar tamaño
ls -lh mongodb-backup.tar.gz
```

### 9.2 Transferir a tu computadora

**Opción A: Descargar el archivo si tienes acceso**
- Descarga `/tmp/mongodb-backup.tar.gz` a tu computadora

**Opción B: Si Emergent tiene acceso a internet, sube a servicio temporal**
```bash
# Usar transfer.sh (válido 14 días)
curl --upload-file /tmp/mongodb-backup.tar.gz https://transfer.sh/mongodb-backup.tar.gz
```

**Te dará una URL, cópiala**

### 9.3 Subir a servidor IONOS

**Método A: Desde tu computadora con SCP**

```bash
# En tu computadora (NO en el servidor)
scp mongodb-backup.tar.gz root@TU_IP_IONOS:/root/
```

**Método B: Descargar directamente en IONOS (si usaste transfer.sh)**

```bash
# En servidor IONOS
cd /root
wget LA_URL_QUE_TE_DIO_TRANSFER.SH -O mongodb-backup.tar.gz
```

### 9.4 Importar datos en IONOS

```bash
# En servidor IONOS
cd /root

# Descomprimir
tar -xzf mongodb-backup.tar.gz

# Importar a MongoDB
mongorestore --db=gigzipfinder backup/gigzipfinder/

# Ver resultado
mongo gigzipfinder --eval "db.getCollectionNames()"
```

**Deberías ver las colecciones de tu base de datos.**

**✅ Base de datos migrada!**

---

<a name="paso-10"></a>
## 10🔟 PASO 10: CONFIGURAR DOMINIO gigzipfinder.com

### ¿Dónde compraste el dominio?

#### CASO A: Dominio comprado en IONOS

1. **Ir a panel de IONOS:**
   - https://my.ionos.com

2. **Ir a "Domains" → "gigzipfinder.com"**

3. **Click en "DNS"**

4. **Agregar registros:**

**Registro A (dominio principal):**
```
Tipo: A
Nombre: @
Valor: TU_IP_SERVIDOR_IONOS
TTL: 3600
```

**Registro A (www):**
```
Tipo: A
Nombre: www
Valor: TU_IP_SERVIDOR_IONOS
TTL: 3600
```

5. **Guardar cambios**

---

#### CASO B: Dominio comprado en Google Domains

1. **Ir a:** https://domains.google.com

2. **Click en tu dominio "gigzipfinder.com"**

3. **Ir a "DNS" en el menú lateral**

4. **Scroll hasta "Custom records"**

5. **Agregar registros:**

**Registro 1:**
```
Name: @
Type: A
TTL: 3600
Data: TU_IP_SERVIDOR_IONOS
```

**Registro 2:**
```
Name: www
Type: A
TTL: 3600
Data: TU_IP_SERVIDOR_IONOS
```

6. **Save**

---

#### CASO C: Dominio en otro proveedor (Namecheap, GoDaddy, etc.)

**Principio general (aplica a todos):**

1. **Ir al panel de tu proveedor de dominio**

2. **Buscar sección "DNS Management" o "Advanced DNS"**

3. **Agregar estos 2 registros:**
   - **Tipo A** con nombre `@` apuntando a tu IP
   - **Tipo A** con nombre `www` apuntando a tu IP

4. **Guardar**

---

### 10.2 Verificar propagación DNS

**⏱️ Tiempo de propagación:** 5 minutos a 48 horas (usualmente 1-2 horas)

**Verificar online:**
1. Ve a: https://dnschecker.org
2. Ingresa: `gigzipfinder.com`
3. Selecciona tipo: `A`
4. Click "Search"

**Deberías ver tu IP en varios lugares del mundo.**

**Verificar desde terminal:**
```bash
# En tu computadora o servidor
nslookup gigzipfinder.com
```

**Debería mostrar tu IP:**
```
Server:  8.8.8.8
Address:  8.8.8.8#53

Non-authoritative answer:
Name:    gigzipfinder.com
Address: TU_IP_SERVIDOR
```

### 10.3 Actualizar .env del frontend (si usabas IP)

**Si antes usabas la IP, ahora cambia a dominio:**

```bash
# En servidor IONOS
nano /var/www/gigzipfinder/frontend/.env
```

**Cambiar a:**
```
REACT_APP_BACKEND_URL=https://gigzipfinder.com
```

**Recompilar frontend:**
```bash
cd /var/www/gigzipfinder/frontend
yarn build
```

**Reiniciar Nginx:**
```bash
systemctl restart nginx
```

**✅ Dominio configurado!**

---

<a name="paso-11"></a>
## 1️⃣1️⃣ PASO 11: INSTALAR SSL (HTTPS) CON LET'S ENCRYPT

### ¿Por qué HTTPS?
- Google lo requiere
- Los navegadores marcan HTTP como "No seguro"
- Es GRATIS con Let's Encrypt

### ⚠️ IMPORTANTE: Antes de continuar

1. **Tu dominio DEBE estar apuntando a tu servidor** (verificado en Paso 10)
2. **Nginx DEBE estar corriendo** con tu configuración

**Verificar:**
```bash
# Dominio funciona?
curl -I http://gigzipfinder.com

# Nginx corriendo?
systemctl status nginx
```

### 11.1 Instalar certificado SSL con Certbot

```bash
# Comando mágico (usa TU dominio)
certbot --nginx -d gigzipfinder.com -d www.gigzipfinder.com
```

**Te hará preguntas:**

**1. Email address:**
```
Enter email address (used for urgent renewal and security notices)
```
**Ingresa tu email real.** Te avisarán si el certificado está por vencer.

**2. Términos de servicio:**
```
Please read the Terms of Service at ...
Do you agree? (Y)es/(N)o:
```
**Responde:** `Y`

**3. Compartir email con EFF (opcional):**
```
Would you be willing to share your email address with the EFF?
(Y)es/(N)o:
```
**Puedes responder:** `N` (opcional)

**4. Redirect HTTP a HTTPS:**
```
Please choose whether or not to redirect HTTP traffic to HTTPS
1: No redirect
2: Redirect - Make all requests redirect to secure HTTPS access
Select the appropriate number [1-2] then [enter]:
```
**Responde:** `2` (Recomendado - fuerza HTTPS)

### 11.2 Resultado exitoso

**Deberías ver:**
```
Congratulations! You have successfully enabled HTTPS on 
https://gigzipfinder.com and https://www.gigzipfinder.com
```

### 11.3 Verificar que funcione

**En tu navegador, ve a:**
- `https://gigzipfinder.com`

**Deberías ver:**
- 🔒 Candado verde en la barra de direcciones
- "Conexión segura"
- Tu sitio cargando correctamente

**Si visitas `http://` (sin s), debe redirigir automáticamente a `https://`**

### 11.4 Renovación automática

**Los certificados de Let's Encrypt duran 90 días.**

**Certbot instala automáticamente un cron job para renovar.**

**Verificar que funciona la renovación:**
```bash
certbot renew --dry-run
```

**Si ves:**
```
Congratulations, all simulated renewals succeeded
```

**✅ Todo bien! El certificado se renovará automáticamente.**

### 11.5 Verificar configuración de Nginx

```bash
cat /etc/nginx/sites-available/gigzipfinder
```

**Certbot agregó automáticamente:**
- Redirección de HTTP a HTTPS
- Configuración SSL
- Certificados

**✅ HTTPS configurado correctamente!**

---

<a name="paso-12"></a>
## 1️⃣2️⃣ PASO 12: VERIFICAR QUE TODO FUNCIONE

### Checklist completa

#### ✅ 1. Verificar servicios en el servidor

```bash
# Backend (PM2)
pm2 status
# Debe estar "online" en verde

# Nginx
systemctl status nginx
# Debe estar "active (running)"

# MongoDB
systemctl status mongod
# Debe estar "active (running)"
```

**Si alguno está caído:**
```bash
# Reiniciar backend
pm2 restart gigzipfinder-backend

# Reiniciar Nginx
systemctl restart nginx

# Reiniciar MongoDB
systemctl restart mongod
```

#### ✅ 2. Verificar página principal

**En navegador:**
- `https://gigzipfinder.com`

**Debe cargar:**
- ✅ Logo de GIG ZipFinder
- ✅ Hero section
- ✅ Features
- ✅ Selector de idioma funcionando
- ✅ Sin errores en consola

**Abrir consola del navegador:**
- Presiona `F12`
- Tab "Console"
- No debe haber errores en rojo

#### ✅ 3. Probar API backend

**En navegador o terminal:**
```bash
curl https://gigzipfinder.com/api/

# Debe responder:
# {"message":"Hello World"}
```

#### ✅ 4. Probar cambio de idioma

**En tu sitio:**
- Click en selector de idioma (🌐)
- Cambiar entre: English, Español, Português
- Texto debe cambiar inmediatamente

#### ✅ 5. Probar sección de descargas

**En tu sitio:**
- Scroll hasta "Download"
- Verificar que APK se pueda descargar (si subiste uno)
- Botones de tiendas deben mostrar "Próximamente" si no configuraste URLs

#### ✅ 6. Verificar administración

**Panel de carga de APK:**
- `https://gigzipfinder.com/admin/upload`
- Debe cargar correctamente

**Panel de configuración:**
- `https://gigzipfinder.com/admin/settings`
- Debe cargar correctamente

#### ✅ 7. Probar en diferentes dispositivos

- **Desktop**: Chrome, Firefox, Safari
- **Móvil**: En tu teléfono
- **Diferentes navegadores**

#### ✅ 8. Verificar SSL

**En navegador:**
- Debe mostrar 🔒 candado verde
- Click en el candado → "Conexión es segura"
- Certificado válido

#### ✅ 9. Verificar velocidad

**Test de velocidad:**
- Ve a: https://pagespeed.web.dev/
- Ingresa: `https://gigzipfinder.com`
- Analizar

**Objetivo:**
- Performance: >80
- Accessibility: >90
- Best Practices: >90
- SEO: >80

#### ✅ 10. Verificar logs (sin errores)

```bash
# Logs de backend
pm2 logs gigzipfinder-backend --lines 50

# Logs de Nginx
tail -f /var/log/nginx/gigzipfinder-error.log

# No debe haber errores críticos
```

### 🎉 Si TODO está ✅ = ¡MIGRACIÓN EXITOSA!

---

<a name="paso-13"></a>
## 1️⃣3️⃣ PASO 13: CONFIGURAR BACKUPS AUTOMÁTICOS

### ¿Por qué hacer backups?
- Proteger tu base de datos
- Recuperar en caso de error
- Mantener versiones anteriores

### 13.1 Crear script de backup

```bash
nano /root/backup-gigzipfinder.sh
```

**Contenido del script:**

```bash
#!/bin/bash

# Script de Backup - GIG ZipFinder
# Ejecuta automáticamente backups diarios

# Variables
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
APP_DIR="/var/www/gigzipfinder"
MONGO_DB="gigzipfinder"

# Crear directorio de backups
mkdir -p $BACKUP_DIR

echo "=== Iniciando backup: $DATE ==="

# 1. Backup MongoDB
echo "Backing up MongoDB..."
mongodump --db=$MONGO_DB --out=$BACKUP_DIR/mongo_$DATE
tar -czf $BACKUP_DIR/mongo_$DATE.tar.gz -C $BACKUP_DIR mongo_$DATE
rm -rf $BACKUP_DIR/mongo_$DATE

# 2. Backup archivos importantes
echo "Backing up files..."
tar -czf $BACKUP_DIR/files_$DATE.tar.gz \
  $APP_DIR/backend/apk_files \
  $APP_DIR/backend/config \
  $APP_DIR/backend/.env \
  $APP_DIR/frontend/.env \
  /etc/nginx/sites-available/gigzipfinder

# 3. Limpiar backups antiguos (mantener últimos 7 días)
echo "Cleaning old backups..."
find $BACKUP_DIR -type f -name "*.tar.gz" -mtime +7 -delete

# 4. Resumen
echo "=== Backup completado: $DATE ==="
echo "MongoDB backup: mongo_$DATE.tar.gz"
echo "Files backup: files_$DATE.tar.gz"
echo ""
df -h $BACKUP_DIR
