# 🧪 Instrucciones de Prueba - GIG ZipFinder

## ✅ Cambios Realizados

### 1. ✅ Eliminación de "Google Voice"
- ❌ Removido de Purchase.jsx (3 idiomas)
- ❌ Removido de Dashboard.jsx (3 idiomas)
- ✅ Ahora dice: "Guía de Número Telefónico" / "Phone Number Guide"

### 2. ✅ Botón "Comprar Ahora" en Hero
- ✅ Nuevo botón prominente con gradiente cyan-green
- ✅ Scroll directo a la sección de compra (#buy-now)
- ✅ Diseño destacado con efecto glow

### 3. ✅ Verificación de Independencia de Emergent
- ✅ Desplegado en Railway (cuenta del usuario)
- ✅ MongoDB propio (configurado en Railway)
- ✅ Claves de Stripe propias del usuario
- ⚠️ **NOTA:** El sistema usa `EMERGENT_LLM_KEY` para la búsqueda de IA (GPT-4o). Esta es una clave universal proporcionada por Emergent que permite usar OpenAI sin necesidad de tener una cuenta propia. **PUEDES CAMBIARLA** por tu propia `OPENAI_API_KEY` si lo deseas.

---

## 💳 Tarjetas de Prueba de Stripe

Stripe proporciona tarjetas de prueba que puedes usar para probar el flujo completo de pago **SIN CARGOS REALES**.

### ✅ Tarjetas que FUNCIONAN (Aprobadas)

| Número de Tarjeta | Descripción | CVV | Fecha |
|------------------|-------------|-----|-------|
| `4242 4242 4242 4242` | Visa básica (siempre aprobada) | Cualquier 3 dígitos | Cualquier fecha futura |
| `4000 0025 0000 3155` | Visa con 3D Secure | Cualquier 3 dígitos | Cualquier fecha futura |
| `5555 5555 5555 4444` | Mastercard básica | Cualquier 3 dígitos | Cualquier fecha futura |
| `3782 822463 10005` | American Express | Cualquier 4 dígitos | Cualquier fecha futura |

### ❌ Tarjetas que FALLAN (Para probar manejo de errores)

| Número de Tarjeta | Error Simulado |
|------------------|----------------|
| `4000 0000 0000 0002` | Tarjeta declinada |
| `4000 0000 0000 9995` | Fondos insuficientes |
| `4000 0000 0000 0069` | Tarjeta expirada |

---

## 📋 Flujo de Prueba Completo

### Paso 1: Verificar Homepage
1. Ve a `https://www.gigzipfinder.com`
2. ✅ Verifica que el botón **"Comprar Ahora"** es el primero y más destacado en el Hero
3. ✅ Haz clic en "Comprar Ahora" y verifica que te lleva a la sección de apps (scroll suave)

### Paso 2: Seleccionar una App
1. En la sección "Selecciona Tu Plataforma Gig", elige una app (Instacart, DoorDash o Spark)
2. ✅ Verifica que los textos NO mencionen "Google Voice"
3. ✅ Debe decir: "Guía para obtener número gratis" (sin mencionar Google Voice)

### Paso 3: Realizar Compra de Prueba
1. Haz clic en "Obtener Códigos ZIP"
2. ✅ Verifica que la página de pago muestra $20.00 USD
3. ✅ Acepta términos y condiciones
4. Usa una de las tarjetas de prueba:
   - Número: `4242 4242 4242 4242`
   - Fecha: Cualquier mes/año futuro (ej: 12/26)
   - CVV: Cualquier 3 dígitos (ej: 123)
   - Código postal: Cualquiera (ej: 10001)
5. ✅ Haz clic en "Pagar $20.00 USD"
6. ✅ Deberías ser redirigido a Stripe (entorno de prueba)
7. ✅ Completa el pago en Stripe

### Paso 4: Verificar Dashboard
1. Después del pago exitoso, deberías ser redirigido al Dashboard
2. ✅ Verifica que puedes ver los códigos ZIP sugeridos
3. ✅ Haz clic en "Buscar Nuevos Códigos" para probar la búsqueda con IA
4. ✅ Verifica la descarga de guías:
   - Guía de [App] en inglés y español
   - Guía de Número Telefónico (sin mencionar Google Voice)

### Paso 5: Probar Múltiples Idiomas
1. Cambia el idioma en el selector (🇺🇸 🇪🇸 🇧🇷)
2. ✅ Verifica que en NINGÚN idioma aparece "Google Voice"
3. ✅ Verifica que los botones funcionan en todos los idiomas

---

## 🔧 Cómo Cambiar a tu Propia Clave de OpenAI

Si deseas usar tu propia cuenta de OpenAI en lugar de la clave universal de Emergent:

1. Ve a Railway → Tu proyecto `gigzipfinder`
2. Selecciona el servicio `backend`
3. Ve a la pestaña "Variables"
4. Cambia `EMERGENT_LLM_KEY` por `OPENAI_API_KEY`
5. Pega tu clave de OpenAI (empieza con `sk-proj-...`)
6. También necesitarás actualizar el código en `server.py`:
   ```python
   # Cambiar:
   api_key=emergent_key
   # Por:
   api_key=os.environ.get('OPENAI_API_KEY')
   ```
7. Haz clic en "Deploy" para aplicar los cambios

---

## 📊 Checklist Final

- [ ] ✅ Botón "Comprar Ahora" visible y funcional en Hero
- [ ] ✅ No se menciona "Google Voice" en ninguna página
- [ ] ✅ Flujo de pago funciona con tarjetas de prueba de Stripe
- [ ] ✅ Dashboard muestra códigos ZIP correctamente
- [ ] ✅ Búsqueda de IA funciona (requiere EMERGENT_LLM_KEY o OPENAI_API_KEY)
- [ ] ✅ Descarga de guías funciona
- [ ] ✅ Sistema funciona en 3 idiomas (inglés, español, portugués)
- [ ] ✅ Aplicación 100% independiente (desplegada en Railway del usuario)

---

## 🚨 IMPORTANTE: Claves de Stripe

Tu aplicación actualmente usa claves de Stripe en modo **LIVE** (producción):
- `sk_live_51Sz8H72STw3g54WA...`
- `pk_live_51Sz8H72STw3g54WA...`

Si quieres probar SIN hacer cargos reales, necesitas:
1. Ir a Stripe Dashboard
2. Cambiar a modo "Test"
3. Obtener tus claves de TEST:
   - `sk_test_...`
   - `pk_test_...`
4. Actualizar las variables en Railway

**⚠️ Con claves LIVE, las tarjetas de prueba NO funcionarán. Necesitas claves TEST para usar las tarjetas de prueba.**

---

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que todas las variables de entorno estén configuradas en Railway
2. Revisa los logs del servicio en Railway
3. Asegúrate de que MongoDB esté conectado correctamente

¡Todo listo para probar! 🎉
