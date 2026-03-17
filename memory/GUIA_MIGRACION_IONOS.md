# Guía Completa: Transferir GIG ZipFinder de Emergent a IONOS

## ⚠️ IMPORTANTE: Requisitos Previos

Tu aplicación es **Full-Stack** (React + FastAPI + MongoDB), por lo que necesitas:
- **IONOS VPS** o **Cloud Server** (NO funciona con hosting compartido básico)
- Mínimo recomendado: **VPS M** o superior
- SO: Ubuntu 22.04 LTS

---

## Paso 1: Contratar IONOS VPS

### A. Ir a IONOS y Seleccionar VPS
1. Ve a [IONOS VPS](https://www.ionos.com/hosting/vps-hosting)
2. Selecciona un plan (Recomendado: **VPS M** o superior)
   - VPS M: ~$10-15 USD/mes
   - 4 GB RAM
   - 2 vCores
   - 160 GB SSD

3. Selecciona el sistema operativo: **Ubuntu 22.04 LTS**
4. Completa la compra

### B. Configuración Inicial
1. Recibirás por email:
   - IP del servidor
   - Usuario root
   - Contraseña temporal

---

## Paso 2: Conectarse al Servidor

### Desde Windows:
```bash
# Usar PuTTY o PowerShell
ssh root@TU_IP_SERVIDOR
```

### Desde Mac/Linux:
```bash
ssh root@TU_IP_SERVIDOR
```

**Primera vez:** Te pedirá cambiar la contraseña.

---

## Paso 3: Configurar el Servidor (Ubuntu)

### A. Actualizar Sistema
```bash
apt update && apt upgrade -y
```

### B. Instalar Dependencias Básicas
```bash
# Node.js y npm (para React)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Python y pip (para FastAPI)
apt install -y python3 python3-pip python3-venv

# Nginx (servidor web)
apt install -y nginx

# Certbot (SSL gratis)
apt install -y certbot python3-certbot-nginx

# MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org

# Iniciar MongoDB
systemctl start mongod
systemctl enable mongod

# Git
apt install -y git

# PM2 (para mantener apps corriendo)
npm install -g pm2 yarn
```

---

## Paso 4: Preparar Tu Código

### A. Comprimir tu código desde Emergent
```bash
# En tu máquina local o desde Emergent terminal
cd /app
tar -czf gigzipfinder-app.tar.gz frontend/ backend/
```

### B. Subir a IONOS (desde tu máquina local)
```bash
# Opción 1: SCP
scp gigzipfinder-app.tar.gz root@TU_IP_SERVIDOR:/root/

# Opción 2: Usar Git (recomendado)
# Primero sube tu código a GitHub/GitLab
# Luego en el servidor:
cd /var/www
git clone https://tu-repo-github.git gigzipfinder
```

---

## Paso 5: Configurar Backend (FastAPI)

### A. Descomprimir y preparar
```bash
cd /var/www
tar -xzf /root/gigzipfinder-app.tar.gz
cd backend
```

### B. Crear entorno virtual
```bash
python3 -m venv venv
source venv/bin/activate
```

### C. Instalar dependencias
```bash
pip install -r requirements.txt
```

### D. Configurar variables de entorno
```bash
nano .env
```

Contenido del `.env`:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=gigzipfinder
```

### E. Configurar PM2 para mantener backend corriendo
```bash
# Crear archivo de configuración PM2
nano /var/www/backend/ecosystem.config.js
```

Contenido:
```javascript
module.exports = {
  apps: [{
    name: 'gigzipfinder-backend',
    script: 'venv/bin/uvicorn',
    args: 'server:app --host 0.0.0.0 --port 8001',
    cwd: '/var/www/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

### F. Iniciar backend
```bash
cd /var/www/backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Paso 6: Configurar Frontend (React)

### A. Preparar frontend
```bash
cd /var/www/frontend
```

### B. Actualizar .env con tu dominio
```bash
nano .env
```

Contenido:
```
REACT_APP_BACKEND_URL=https://gigzipfinder.com
```

### C. Instalar dependencias y compilar
```bash
yarn install
yarn build
```

Esto creará la carpeta `/var/www/frontend/build/` con tu app lista para producción.

---

## Paso 7: Configurar Nginx

### A. Crear configuración de Nginx
```bash
nano /etc/nginx/sites-available/gigzipfinder
```

Contenido:
```nginx
server {
    listen 80;
    server_name gigzipfinder.com www.gigzipfinder.com;

    # Frontend (React)
    location / {
        root /var/www/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Cache para assets estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API (FastAPI)
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # APK download
    location /api/apk {
        client_max_body_size 100M;
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### B. Activar configuración
```bash
ln -s /etc/nginx/sites-available/gigzipfinder /etc/nginx/sites-enabled/
nginx -t  # Verificar configuración
systemctl restart nginx
```

---

## Paso 8: Configurar Dominio en IONOS

### A. Configurar DNS en IONOS
1. Ve a tu panel de IONOS
2. Busca "Dominios" → "gigzipfinder.com" → "DNS"
3. Agrega los siguientes registros:

| Tipo | Nombre | Valor              | TTL  |
|------|--------|--------------------|------|
| A    | @      | TU_IP_SERVIDOR     | 3600 |
| A    | www    | TU_IP_SERVIDOR     | 3600 |

**Nota:** Si compraste el dominio en otro lugar (Google Domains), haz la configuración DNS allí apuntando a la IP de tu servidor IONOS.

---

## Paso 9: Configurar SSL (HTTPS)

### Certificado SSL GRATIS con Let's Encrypt:
```bash
certbot --nginx -d gigzipfinder.com -d www.gigzipfinder.com
```

Sigue las instrucciones:
1. Ingresa tu email
2. Acepta términos
3. Elige "Redirect" para forzar HTTPS

**Renovación automática:**
```bash
certbot renew --dry-run
```

---

## Paso 10: Migrar Base de Datos MongoDB

### A. Exportar desde Emergent
```bash
# En Emergent terminal
mongodump --uri="mongodb://localhost:27017" --db=gigzipfinder --out=/tmp/backup
tar -czf mongodb-backup.tar.gz /tmp/backup
```

### B. Transferir a IONOS
```bash
scp mongodb-backup.tar.gz root@TU_IP_SERVIDOR:/root/
```

### C. Importar en IONOS
```bash
cd /root
tar -xzf mongodb-backup.tar.gz
mongorestore --db=gigzipfinder /tmp/backup/gigzipfinder/
```

---

## Paso 11: Verificación Final

### A. Verificar servicios corriendo
```bash
# Backend
pm2 status

# Nginx
systemctl status nginx

# MongoDB
systemctl status mongod
```

### B. Verificar logs
```bash
# Backend logs
pm2 logs gigzipfinder-backend

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### C. Probar la aplicación
1. Abre `https://gigzipfinder.com`
2. Verifica que cargue correctamente
3. Prueba descargar APK
4. Verifica que el cambio de idioma funcione
5. Prueba las secciones: Features, Pricing, FAQ

---

## Paso 12: Configurar Backups Automáticos

### A. Crear script de backup
```bash
nano /root/backup-gigzipfinder.sh
```

Contenido:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"

mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --db=gigzipfinder --out=$BACKUP_DIR/mongo_$DATE

# Backup archivos
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/backend/apk_files /var/www/backend/config

# Limpiar backups antiguos (mantener últimos 7 días)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completado: $DATE"
```

```bash
chmod +x /root/backup-gigzipfinder.sh
```

### B. Programar backup diario
```bash
crontab -e
```

Agregar:
```
0 2 * * * /root/backup-gigzipfinder.sh >> /var/log/backup.log 2>&1
```

---

## Paso 13: Monitoreo y Mantenimiento

### A. Configurar PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### B. Configurar alertas (opcional)
```bash
# Instalar monitoreo
apt install -y uptimerobot-cli
```

---

## Costos Mensuales Estimados

| Servicio           | Costo Mensual  |
|--------------------|----------------|
| IONOS VPS M        | $10-15 USD     |
| Dominio .com       | ~$1 USD/mes    |
| SSL                | GRATIS         |
| MongoDB (local)    | GRATIS         |
| **TOTAL**          | **~$11-16/mes**|

---

## Troubleshooting Común

### ❌ Error: "502 Bad Gateway"
**Solución:** Backend no está corriendo
```bash
pm2 restart gigzipfinder-backend
pm2 logs
```

### ❌ Error: MongoDB no conecta
**Solución:**
```bash
systemctl status mongod
systemctl restart mongod
```

### ❌ Error: SSL no funciona
**Solución:**
```bash
certbot renew --force-renewal
systemctl restart nginx
```

### ❌ Frontend muestra página en blanco
**Solución:**
```bash
cd /var/www/frontend
yarn build
systemctl restart nginx
```

---

## Comandos Útiles de Mantenimiento

```bash
# Ver logs en tiempo real
pm2 logs gigzipfinder-backend --lines 100

# Reiniciar backend
pm2 restart gigzipfinder-backend

# Ver uso de recursos
pm2 monit

# Reiniciar Nginx
systemctl restart nginx

# Ver logs de Nginx
tail -f /var/log/nginx/access.log

# Ver espacio en disco
df -h

# Ver uso de memoria
free -h

# Actualizar código (si usas Git)
cd /var/www
git pull
cd frontend && yarn build
cd ../backend && pm2 restart gigzipfinder-backend
```

---

## Alternativa: Usar Docker (Avanzado)

Si prefieres usar Docker en tu VPS de IONOS:

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose

# Crear docker-compose.yml
# (Contacta si necesitas ayuda con esto)
```

---

## ¿Necesitas Ayuda?

Si encuentras problemas durante la migración:
1. Revisa los logs: `pm2 logs` y `/var/log/nginx/error.log`
2. Verifica que todos los servicios estén corriendo
3. Verifica la configuración DNS (puede tomar hasta 48h propagar)

---

## Resumen de Pasos:

1. ✅ Contratar VPS en IONOS
2. ✅ Conectarse por SSH
3. ✅ Instalar dependencias (Node, Python, Nginx, MongoDB)
4. ✅ Subir código al servidor
5. ✅ Configurar backend con PM2
6. ✅ Compilar frontend (yarn build)
7. ✅ Configurar Nginx
8. ✅ Configurar DNS en IONOS
9. ✅ Instalar SSL con Certbot
10. ✅ Migrar base de datos MongoDB
11. ✅ Verificar todo funcione
12. ✅ Configurar backups
