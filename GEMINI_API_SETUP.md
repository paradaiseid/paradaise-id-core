# Gemini API Setup — paradaise-id-core

Configuración de Gemini API para análisis de patrones usando **Application Default Credentials (ADC)**.

## Arquitectura

```
Paradise Engine (Python, local)
  ↓ (datos agregados anónimos)
Next.js Backend (paradaise-id-core)
  ↓ POST /api/analyze
Gemini API (Google Cloud)
  ↓ (patrones identificados)
Dashboard (usuario ve insights)
```

**Promesa de privacidad**: Solo datos anónimos agregados salen del dispositivo del usuario.

---

## Configuración en Desarrollo Local

### Paso 1: Google Cloud ADC Setup (una sola vez)

Ya ejecutaste esto en la sesión de setup:

```powershell
gcloud auth application-default login
```

Esto genera credenciales en: `~/.config/gcloud/application_default_credentials.json`

**Verificar que funcionó**:
```bash
gcloud auth application-default print-access-token
```

Debe devolver un token JWT largo. Si error: ADC no está inicializado.

### Paso 2: Environment Variables

El archivo `.env.local` ya existe. Mantener así:

```
# .env.local (no commitear)
GOOGLE_API_KEY=          # Déjar vacío en desarrollo (ADC lo busca automáticamente)
DATABASE_URL=...         # Tu Neon connection string
RESEND_API_KEY=...       # Tu Resend API key
```

### Paso 3: Instalar dependencias

```bash
npm install @google/generative-ai
```

✅ Ya hecho en esta sesión.

### Paso 4: Archivo helper creado

**`src/lib/gemini.ts`**:
- Inicializa cliente Gemini con ADC automáticamente
- Función `analyzePatterns()` que llama a Gemini 1.5 Flash
- Maneja errores de API key y rate limits

### Paso 5: Endpoint API creado

**`src/app/api/analyze/route.ts`**:
- `POST /api/analyze` — recibe datos agregados, devuelve patrones
- `GET /api/analyze` — documentación del endpoint
- Parsea respuesta Gemini (JSON o markdown)
- Logging de errores

---

## Usar el Endpoint en Desarrollo

```bash
npm run dev
```

Abre: `http://localhost:3000/api/analyze`

Enviar POST:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "totalAppsUsed": 15,
    "timeSpentByCategory": {"work": 420, "social": 60},
    "appSwitches": 145,
    "focusTimeMinutes": 180
  }'
```

**Respuesta esperada**:
```json
{
  "ok": true,
  "analysis": {
    "patterns": [
      {"name": "...", "description": "...", "confidence": 0.9}
    ],
    "insights": ["..."],
    "recommendations": ["..."]
  },
  "timestamp": "2026-05-28T..."
}
```

---

## Configuración en Producción (Vercel)

### Opción A: Usar Vercel Environment Variables (Recomendado)

1. **En Google Cloud Console**:
   - Crear service account `paradaise-vercel`
   - Generar JSON key (si org policy lo permite; si no, saltar)
   - Copiar el JSON

2. **En Vercel Dashboard**:
   - Ir a Settings → Environment Variables
   - Crear variable `GOOGLE_API_KEY` con la API key de Google Cloud
   - O crear variable `GOOGLE_APPLICATION_CREDENTIALS` con el JSON encoded en base64

3. **En paradaise-id-core**:
   - El código detecta `process.env.GOOGLE_API_KEY` automáticamente
   - `GoogleGenerativeAI` lo usa sin necesidad de ADC

### Opción B: Usar Vercel + Google Cloud ADC (Si org policy bloquea JSON keys)

1. **Conectar Google Cloud a Vercel via OAuth**:
   - Vercel tiene integración nativa con Google Cloud
   - Settings → Integrations → Google Cloud
   - Autorizar Vercel a usar Google Cloud APIs

2. **En el código**: ADC buscará credenciales en el entorno de Vercel automáticamente

**Recomendación**: Opción A es más clara. Opción B requiere setup adicional de Vercel.

---

## Costos Estimados (XPRIZE)

| Componente | Costo aprox |
|---|---|
| Gemini API (input/output tokens) | $0.000001 / 1M tokens (flash) |
| 1000 análisis/día × 30 días | ~$0.50 |
| Google Cloud free tier | $300 + $5,230 de créditos XPRIZE |
| **Total**: Prácticamente gratis | ✅ |

---

## Troubleshooting

### Error: "API key not provided"

**Causa**: ADC no encontró credenciales.

**Solución**:
```powershell
gcloud auth application-default login
# Luego reinicia el servidor Next.js
npm run dev
```

### Error: "Failed to fetch data from Gemini API"

**Causa**: Quota excedida o rate limit.

**Solución**:
- Esperar 5 minutos
- O crear proyecto Google Cloud nuevo (quota se resetea)

### Error: "Invalid API Key"

**Causa**: Si usas `GOOGLE_API_KEY` en `.env.local`, la key es inválida.

**Solución**:
- Dejar `GOOGLE_API_KEY` vacío en `.env.local`
- Usar ADC en desarrollo (`gcloud auth application-default login`)

---

## Próximos pasos

1. **Integrar Paradise Engine** → crear endpoint que reciba datos agregados del daemon local
2. **Frontend Dashboard** → mostrar patrones en la UI (Step 2 de onboarding)
3. **Gemini Nano** → para análisis local simple (Chrome 148+)
4. **Testing** → mock de Gemini API en tests

---

*Documentación creada: 2026-05-28*
*Última actualización: XPRIZE Week 0 setup*
