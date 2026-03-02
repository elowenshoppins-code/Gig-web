# PRD - GIG ZipFinder Landing Page

## Información del Proyecto
- **Fecha de Inicio**: 20 de Diciembre 2025
- **Nombre del Proyecto**: GIG ZipFinder Landing Page
- **Descripción**: Página web profesional y empresarial para promocionar la aplicación GIG ZipFinder

## Descripción de la Aplicación

GIG ZipFinder es una herramienta para gig workers que ayuda a:
1. **Escanear códigos ZIP**: IA que escanea cada 48 horas todos los códigos postales de Estados Unidos para encontrar disponibilidad en apps de delivery
2. **Número de teléfono gratis**: Proporciona números gratuitos sin renta mensual que reciben llamadas y SMS para registrarse en apps
3. **Guías paso a paso**: Instrucciones detalladas para abrir cuentas en Instacart, DoorDash y Spark Driver

**Modelo de Negocio**: $5.00 USD por app (pago único, sin suscripciones)

## User Personas

### Persona Principal: Gig Worker Aspirante
- **Edad**: 25-45 años
- **Objetivo**: Comenzar a trabajar en apps de delivery pero enfrenta listas de espera
- **Pain Points**: 
  - Rechazado por falta de disponibilidad en su código ZIP
  - No sabe qué códigos ZIP tienen disponibilidad
  - Necesita números de teléfono adicionales para registrarse
- **Necesidades**: Herramienta que le facilite el proceso de registro y le dé acceso inmediato

## Arquitectura Implementada

### Stack Tecnológico
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI
- **Estilo**: Custom design basado en la paleta de colores de la app móvil
- **Deployment**: Preview en Emergent

### Paleta de Colores (basada en la app)
- Background: Dark navy (#0a1628, #0f172a)
- Primary: Cyan brillante (#00d9ff, #06b6d4)
- Accent: Verde (#4ade80)
- Cards: Azul medio (#1e293b, #334155)
- Text: Blanco y grises

## Cambios Implementados (27 Dic 2025)

### ✅ Actualizaciones de Copy y Disclaimers
1. **Hero Section**: Eliminado disclaimer rojo, ahora muestra "*Condiciones y disponibilidad aplican"
2. **Pricing**: Cambiado a "Te sugiere GRATIS 5 códigos postales con alta disponibilidad"
3. **Features**: Actualizado lenguaje de "vender/garantizar" a "SUGERIR"
4. **FAQ**: Eliminada pregunta sobre "soporte por email", actualizados disclaimers
5. **Todos los componentes**: Enfatizan que NO garantizamos disponibilidad, solo sugerimos

### ✅ Logos de Tarjetas
- Implementados logos reales de Visa, Mastercard y American Express (SVG desde Wikimedia)
- Reemplazados emojis por imágenes profesionales

### ✅ Sistema Multilenguaje (i18n)
- Implementado selector de idioma en header: 🇺🇸 English, 🇪🇸 Español, 🇧🇷 Português
- Todas las secciones traducidas completamente
- Rutas funcionando correctamente

### ✅ Páginas Legales
- **Privacy Policy**: `/privacy` - Completa con disclaimers sobre Stripe, no almacenamiento de datos
- **Terms of Service**: `/terms` - Con disclaimers de no afiliación con apps de terceros
- Ambas páginas en 3 idiomas

### ✅ Sistema de Carga y Descarga de APK
**Backend**:
- Endpoint `POST /api/apk/upload-apk` para subir APK
- Endpoint `GET /api/apk/download-apk` para descargar APK
- Endpoint `GET /api/apk/apk-info` para verificar si existe APK

**Frontend**:
- Panel de admin en `/admin/upload` para subir APK
- DownloadSection actualizada para descargar APK real
- Verifica disponibilidad antes de mostrar botón de descarga

### ✅ Manual de Instalación APK (27 Dic 2025)
**Nuevo componente**: `InstallGuide.jsx`
- Página dedicada con guía paso a paso para instalar APK en Android
- 5 pasos ilustrados con imágenes generadas por IA
- Sección de troubleshooting con 4 problemas comunes y soluciones
- Sección de video tutorial (preparada para futuro)
- **Rutas multilenguaje**:
  - `/como-instalar` (Español)
  - `/how-to-install` (English)
  - `/como-instalar-pt` (Português)
- **Integración**:
  - Botón "Cómo Instalar" en DownloadSection
  - Link en Footer > Enlaces Rápidos
  - Botón "Volver al Inicio" para navegación
- **Características**:
  - Responsive design (móvil primero)
  - Imágenes ilustrativas profesionales
  - Tips útiles en cada paso
  - Contact support al final

### 📝 Disclaimers Importantes Añadidos
- Footer: Disclaimer amarillo sobre no afiliación y no almacenamiento de datos de pago
- Features: "Por la alta demanda, NO garantizamos que los códigos duren abiertos"
- FAQ: Actualizadas respuestas enfatizando que solo SUGERIMOS, no garantizamos

## Estado Actual
✅ **Landing Page Multilenguaje Completada con Sistema de APK**

### ✅ Completado

1. **Header/Navegación**
   - Logo de GIG ZipFinder
   - Navegación sticky con scroll
   - Enlaces a secciones: Características, Cómo Funciona, Precios, FAQ
   - Botón CTA "Descargar APK"
   - Menú móvil responsive

2. **Hero Section**
   - Título principal con texto gradiente
   - Descripción del valor único (IA escaneo cada 48h)
   - Doble CTA: "Descargar APK Gratis" y "Cómo Funciona"
   - Imagen de delivery driver
   - Card flotante animada mostrando ZIP code con disponibilidad
   - Stats: 48h, $5, 0% listas espera
   - Efectos visuales: glows, blur backgrounds

3. **Features Section**
   - 6 características principales en grid 3x2
   - Iconos de Lucide React (MapPin, Phone, BookOpen, Zap, Shield, TrendingUp)
   - Cards con hover effects
   - Primeras 3 cards con imágenes de fondo
   - Badges de apps soportadas: Instacart, DoorDash, Spark Driver

4. **How It Works Section**
   - 4 pasos numerados con iconos
   - Cards conectadas visualmente
   - Números circulares con gradiente cyan-verde
   - Descripción clara de cada paso
   - Responsive design

5. **Pricing Section**
   - Card de precio destacada con animación pulse-glow
   - Badge "OFERTA DE LANZAMIENTO"
   - Lista de features incluidas (5 items con checkmarks)
   - Badge de pago seguro con Stripe
   - Métodos de pago aceptados (Visa, Mastercard, Amex)
   - CTA principal

6. **Download Section**
   - Logo animado (floating)
   - 3 opciones de descarga:
     - APK para Android (activa)
     - Google Play Store (próximamente)
     - Apple App Store (próximamente)
   - Stats: Gratis, 4.8★, 10MB
   - Requisitos del sistema

7. **FAQ Section**
   - 10 preguntas frecuentes
   - Accordion de Shadcn UI
   - Estilo consistente con colores de la marca
   - Link de contacto por email

8. **Footer**
   - Logo y descripción de la marca
   - Enlaces rápidos a todas las secciones
   - Apps soportadas con checkmarks
   - Iconos sociales funcionales:
     - TikTok: https://www.tiktok.com/@gigzipfinder
     - Instagram: https://www.instagram.com/gigzipfinder
     - Email: support@gigzipfinder.com
   - Copyright y links legales
   - Badge "Sirviendo a gig workers en todo Estados Unidos"

9. **Diseño y UX**
   - Animaciones suaves: fadeInUp, float, pulse-glow
   - Hover effects en cards y botones
   - Smooth scrolling
   - Custom scrollbar con colores de marca
   - Efectos de glow y borders animados
   - Responsive: móvil, tablet, desktop
   - Fuentes: Inter + Space Grotesk

10. **Assets Utilizados**
    - Logo oficial: icon_192x192.png
    - Imágenes profesionales de Unsplash (delivery workers, tech, móviles)
    - Screenshots de la app móvil como referencia

## Backlog Priorizado

### P0 (Crítico - Próximos Pasos)
- [ ] Subir archivo APK real para descarga
- [ ] Configurar enlaces de descarga funcionales
- [ ] Añadir analytics (Google Analytics o similar)

### P1 (Alta Prioridad)
- [ ] Integración con Stripe para pagos dentro de la app
- [ ] Formulario de contacto funcional
- [ ] Sistema de email marketing para lista de espera (stores)
- [ ] SEO optimization (meta tags, structured data)
- [ ] Sitemap y robots.txt

### P2 (Media Prioridad)
- [ ] Backend para manejo de descargas y analytics
- [ ] Blog o sección de recursos
- [ ] Testimonios de usuarios reales
- [ ] Video explicativo de la app
- [ ] Chat support o chatbot

### P3 (Baja Prioridad)
- [ ] Versión en inglés (i18n)
- [ ] Programa de afiliados
- [ ] Panel de admin para actualizar contenido

## Enlaces Importantes

- **Repositorio**: /app
- **Frontend URL**: https://gif-tools-central.preview.emergentagent.com
- **TikTok**: https://www.tiktok.com/@gigzipfinder?_r=1&_t=ZP-940uhCdyVaR
- **Instagram**: https://www.instagram.com/gigzipfinder?igsh=MWt1djhrZzRlZjJmcg==

## Notas Técnicas

- La página es estática (solo frontend) sin backend por ahora
- Descarga de APK muestra alerta placeholder (requiere archivo real)
- Todos los links externos (redes sociales) funcionan correctamente
- Diseño optimizado para conversión: múltiples CTAs, social proof, FAQ completo

## Estado Actual
✅ **MVP de Landing Page Completado** - Listo para agregar APK real y lanzar
