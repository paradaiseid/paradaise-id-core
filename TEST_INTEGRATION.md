# Test — Integración Paradise Engine + Gemini API

**Estado**: Lista para testear  
**Fecha**: 2026-05-28  
**Commits**: a3c9ad0 (Gemini API setup) + 570967a (Paradise Engine integration)

---

## Flujo Completo

```
1. Paradise Engine (local) captura datos
    ↓
2. paradise_engine.py --report genera reporte markdown
    ↓
3. /api/sync-paradise lee reporte
    ↓
4. Extrae datos anónimos agregados
    ↓
5. Envía a /api/analyze
    ↓
6. Gemini API analiza patrones
    ↓
7. Devuelve insights + recomendaciones
```

---

## Iniciar Servidor

```powershell
cd C:\Code\paradaise-id-core
npm run dev
```

Verás:
```
  ▲ Next.js 16.2.6
  - Local: http://localhost:3000
  - Environments: .env.local
```

---

## Test 1: Health Check

Verificar que todo está conectado:

```powershell
curl http://localhost:3000/api/health
```

**Respuesta esperada**:
```json
{
  "status": "ok",
  "checks": {
    "database": {"status": "ok"},
    "geminiApi": {"status": "ok", "message": "Gemini API client initialized (ADC ready)"}
  }
}
```

---

## Test 2: Sincronizar Paradise Engine (Flujo Completo)

```powershell
curl http://localhost:3000/api/sync-paradise
```

**Respuesta esperada**:
```json
{
  "ok": true,
  "reportDate": "2026-05-28",
  "aggregatedData": {
    "totalAppsUsed": 11,
    "timeSpentByCategory": {
      "ia": 154.8,
      "navegador": 96.0,
      ...
    },
    "appSwitches": 71,
    "focusTimeMinutes": 258.0,
    "keyboardActivity": {
      "typedMinutes": 45,
      "dictatedMinutes": 29,
      "mixedMinutes": 58
    },
    "dataIntegrity": {
      "sensitiveDataIsolated": true,
      "deepModeOff": true
    }
  },
  "analysis": {
    "patterns": [
      {
        "name": "...",
        "description": "...",
        "confidence": 0.95
      }
    ],
    "insights": ["..."],
    "recommendations": ["..."]
  }
}
```

---

## Test 3: Análisis Manual (sin Paradise Engine)

Si no tienes Paradise Engine corriendo, puedes testear `/api/analyze` directamente:

```powershell
$body = @{
  totalAppsUsed = 15
  timeSpentByCategory = @{work = 420; social = 60}
  appSwitches = 145
  focusTimeMinutes = 180
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/analyze `
  -H "Content-Type: application/json" `
  -d $body
```

**Respuesta**:
```json
{
  "ok": true,
  "analysis": {
    "patterns": [...],
    "insights": [...],
    "recommendations": [...]
  }
}
```

---

## Pasos para Verificación Completa

1. **Terminal 1 — Paradise Engine**:
   ```powershell
   cd C:\Code\paradise-engine
   python paradise_engine.py
   # Dejar corriendo en background
   ```

2. **Terminal 2 — Servidor Next.js**:
   ```powershell
   cd C:\Code\paradaise-id-core
   npm run dev
   ```

3. **Terminal 3 — Tests**:
   ```powershell
   # Health check
   curl http://localhost:3000/api/health
   
   # Esperar 10-20 segundos
   
   # Sincronizar Paradise Engine
   curl http://localhost:3000/api/sync-paradise
   ```

4. **Inspeccionar logs**:
   - Terminal 2 (Next.js) mostrará logs de [sync-paradise] y [analyze]
   - Debería mostrar que:
     - Paradise Engine report fue leído
     - Datos fueron agregados
     - Gemini API fue llamada
     - Análisis fue completado

---

## Debugging

### Si `/api/health` falla en Gemini API

```powershell
# Verificar que ADC está inicializado
gcloud auth application-default print-access-token
# Debe devolver un JWT token largo

# Si no funciona, ejecutar:
gcloud auth application-default login
```

### Si `/api/sync-paradise` devuelve 404

**Causa**: Reporte de Paradise Engine no existe  
**Solución**:
```powershell
# Generar reporte
cd C:\Code\paradise-engine
python paradise_engine.py --report
```

### Si Gemini API falla en `/api/sync-paradise`

Los datos agregados se devuelven de todas formas (`analysis.error` mostrará `gemini_analysis_failed`).

---

## Próximos Pasos (Week 2+)

1. **Dashboard "tu día"** — mostrar patrones en la UI
2. **Scheduler** — sincronizar automáticamente cada noche
3. **Gemini Nano** — análisis local en Chrome 148+ (más privacidad)
4. **Stripe paywall** — al final del onboarding

---

*Test plan creado: 2026-05-28 · Week 1 en progreso*
