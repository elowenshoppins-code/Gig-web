# 🎯 GIG ZipFinder

La herramienta definitiva para gig workers. Encuentra los mejores códigos ZIP con disponibilidad en Instacart, DoorDash y Spark Driver usando inteligencia artificial.

---

## 🚀 Deploy Rápido en Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

**Tiempo estimado:** 10 minutos  
**Costo:** Gratis ($5 crédito/mes incluido)

[📖 Guía completa de deployment →](./RAILWAY_DEPLOYMENT.md)

---

## 📦 Tecnologías

### Backend
- FastAPI (Python 3.11+)
- MongoDB GridFS
- Motor (async MongoDB driver)

### Frontend
- React 18
- Tailwind CSS
- Shadcn/UI Components
- Axios

---

## 🏗️ Estructura del Proyecto

```
/app
├── backend/          # API FastAPI
│   ├── routes/       # Endpoints
│   ├── server.py     # Main app
│   └── requirements.txt
├── frontend/         # React App
│   ├── src/
│   ├── public/
│   └── package.json
├── RAILWAY_DEPLOYMENT.md  # Guía de deployment
└── README.md
```

---

## ⚙️ Variables de Entorno

### Backend
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=gigzipfinder
CORS_ORIGINS=*
```

### Frontend
```env
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
```

---

## 🔧 Desarrollo Local

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
yarn install
yarn start
```

---

## 📱 Características

- ✅ Sugerencias de ZIP codes con IA
- ✅ Análisis cada 48 horas
- ✅ Guías paso a paso
- ✅ Multi-idioma (ES, EN, PT)
- ✅ Descarga de APK
- ✅ Panel de administración

---

## 🌐 Deploy en Railway

**Paso 1:** MongoDB Atlas (gratis)
- Crea cuenta en mongodb.com/cloud/atlas
- Crea cluster M0 (gratis)
- Copia connection string

**Paso 2:** Railway (gratis)
- Crea cuenta en railway.app
- Conecta GitHub
- Deploy backend + frontend

**Paso 3:** Dominio custom (opcional)
- Conecta gigzipfinder.com
- CNAME → railway.app

[Ver guía completa →](./RAILWAY_DEPLOYMENT.md)

---

## 📄 Licencia

Todos los derechos reservados © 2026 GIG ZipFinder

---

## 🆘 Soporte

- 📧 Email: support@gigzipfinder.com
- 📖 Docs: Ver RAILWAY_DEPLOYMENT.md
- 🐛 Issues: GitHub Issues

---

**🚀 Hecho con ❤️ para la comunidad de gig workers**
