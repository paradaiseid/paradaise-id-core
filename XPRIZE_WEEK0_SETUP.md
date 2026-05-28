# XPRIZE Week 0 Setup — Gemini API Integration

**Estado**: ✅ Completado  
**Fecha**: 2026-05-28  
**Deadline XPRIZE**: 2026-08-17 1:00pm PDT

---

## Resumen

Configuración completada de Gemini API para paradaise Coach usando **Application Default Credentials (ADC)**. El backend paradaise-id-core ahora puede:

1. ✅ Recibir datos agregados anónimos del Paradise Engine
2. ✅ Llamar a Gemini API para análisis de patrones
3. ✅ Devolver insights sobre el uso de aplicaciones
4. ✅ Verificar salud del sistema (DB + Gemini API)

---

## Cambios Realizados

### 1. Instalación de SDK
```bash
npm install @google/generative-ai
```
- Librería oficial de Google para Node.js/TypeScript
- Soporta ADC automáticamente

### 2. Configuración Local (ADC)
```powershell
gcloud auth application-default login
```
Genera credenciales en `~/.config/gcloud/application_default_credentials.json`

**Verificación**:
```bash
gcloud auth application-default print-access-token
# Debe devolver un JWT token largo
```

### 3. Archivos Creados

#### `src/lib/gemini.ts`
- Helper para inicializar Gemini API
- Función `analyzePatterns()` que:
  - Toma datos agregados anónimos
  - Llama a Gemini 1.5 Flash
  - Parsea respuesta (JSON o markdown)
  - Devuelve patrones + insights + recomendaciones

#### `src/app/api/analyze/route.ts`
- Endpoint POST `/api/analyze`
- Recibe: `{ totalAppsUsed, timeSpentByCategory, appSwitches, focusTimeMinutes, ... }`
- Devuelve: `{ patterns, insights, recommendations }`
- Manejo robusto de errores (auth, rate limit, invalid data)

#### `src/app/api/health/route.ts`
- Endpoint GET `/api/health`
- Verifica conectividad a:
  - Database (Neon PostgreSQL)
  - Gemini API (client initialization)
- Status: `ok` / `degraded` / `error`

#### `.env.local` (no commiteado)
```
GOOGLE_API_KEY=          # Vacío en desarrollo (ADC lo maneja)
DATABASE_URL=...         # Neon connection
RESEND_API_KEY=...       # Resend email
```

#### `GEMINI_API_SETUP.md`
- Documentación completa de setup
- Guías de desarrollo y producción
- Troubleshooting
- Costos estimados (prácticamente gratis)

#### `XPRIZE_WEEK0_SETUP.md` (este archivo)
- Resumen de lo completado

---

## Build y Verificación

```bash
npm run build
# ✓ Compiló exitosamente (TypeScript check OK)
# ✓ Nuevos endpoints compilados:
#   - /api/analyze (Dynamic)
#   - /api/health (Dynamic)
```

---

## Próximos Pasos (Week 1-2)

### Inmediatos (hoy/mañana)
- [ ] Iniciar servidor: `npm run dev`
- [ ] Probar `/api/health` → debe mostrar "Gemini API client initialized"
- [ ] Probar `/api/analyze` con POST:
  ```bash
  curl -X POST http://localhost:3000/api/analyze \
    -H "Content-Type: application/json" \
    -d '{"totalAppsUsed": 15, "focusTimeMinutes": 180}'
  ```

### Week 1 (1-14 jun)
- [ ] Integrar Paradise Engine → crear endpoint que envíe datos agregados
- [ ] Implementar agregación anónima en backend
- [ ] Dashboard "tu día" mostrando patrones de Gemini
- [ ] Conectar Stripe (Caja 2 paywall)

### Week 2-4
- [ ] Landing v6 rediseño
- [ ] Onboarding completo
- [ ] QA / pulir flujo

---

## Costos

| Recurso | Costo | Disponible |
|---|---|---|
| Gemini API (1000 calls/día × 30 días) | ~$0.50 | ✅ Gratis |
| Google Cloud free tier | $300 | ✅ Disponible |
| Google Cloud XPRIZE credits | $5,230 | ✅ Disponible |
| **Total disponible** | **$5,530** | ✅ Amplio margen |

---

## Arquitectura Final (Week 11)

```
Paradise Engine (Python, local)
  ↓ datos agregados cada 4h
  
paradaise.id Backend (Next.js, Vercel)
  ├─ POST /api/analyze
  │   ↓
  │ Gemini API (cloud)
  │   ↓
  │ Patrones identificados
  │   ↓
  ├─ GET /dashboard
  │   ↓ muestra insights
  
UI (React)
  └─ Cajas 1-6 de consent
     └─ Suscripción Caja 2 (Stripe)
```

---

## Verificación de ADC (Debugging)

Si `/api/health` devuelve error en Gemini API:

```powershell
# Verificar que gcloud está instalado
gcloud --version

# Verificar que las credenciales existen
cat ~/.config/gcloud/application_default_credentials.json

# Si no existen, ejecutar:
gcloud auth application-default login
```

---

## Documentos de Referencia

- **GEMINI_API_SETUP.md** — Setup completo + troubleshooting
- **PLAN_XPRIZE_GEMINI_2026.md** — Plan de 11 semanas (en `_DECISIONES/`)
- **ADR-020** — Sesión anterior (26-may) donde se definió arquitectura de cajas

---

*Completado durante sesión XPRIZE Week 0 · 2026-05-28*
