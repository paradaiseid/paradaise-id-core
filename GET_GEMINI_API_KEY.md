# Obtener Gemini API Key

El SDK `@google/generative-ai` requiere una API key explícita. Application Default Credentials (ADC) no funcionan automáticamente.

## Pasos para obtener la API key

### 1. En Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Asegúrate que estés en proyecto **paradaise-gemini** (el que creamos)
3. Ve a **APIs & Services → Credentials** (en el menu izquierdo)

### 2. Crear API Key

1. Click en **+ Create Credentials** (arriba)
2. Selecciona **API Key**
3. Se abrirá un modal con la API key
4. **COPIAR** la API key (texto largo que comienza con `AIza...`)

### 3. Configurar en .env.local

1. Abre `C:\Code\paradaise-id-core\.env.local`
2. Reemplaza:
   ```
   GOOGLE_API_KEY=
   ```
   con:
   ```
   GOOGLE_API_KEY=AIza_TU_API_KEY_AQUI
   ```
3. Guarda el archivo

### 4. Reiniciar servidor

```powershell
# Presionar Ctrl+C en la terminal del servidor (si está corriendo)
npm run dev
```

---

## Verificar que funcionó

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/analyze" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body (@{
    totalAppsUsed = 15
    timeSpentByCategory = @{work = 420; social = 60}
  } | ConvertTo-Json)
```

Si devuelve 200 OK con `"ok": true`, ¡está funcionando!

---

**Seguridad**: La API key estará en `.env.local`, que NO se commitea a GitHub (.gitignore cubre `.env*`).

Para producción en Vercel, configura la variable en Settings → Environment Variables.
