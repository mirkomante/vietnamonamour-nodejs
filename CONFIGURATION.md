# Configurazione Ambiente - Vietnamonamour

## Panoramica

Il progetto Vietnamonamour supporta diversi ambienti di configurazione per sviluppo, produzione e test. La configurazione è gestita tramite il file `config.js` e variabili d'ambiente.

## File di Configurazione

### `config.js`
File principale di configurazione che contiene le impostazioni per tutti gli ambienti.

### `config.example.js`
Template di configurazione che può essere copiato e personalizzato.

## Ambienti Supportati

### 1. Development (Sviluppo)
- **NODE_ENV**: `development`
- **PORT**: `3000`
- **FILE_PATH**: `http://localhost:3000/`
- **VTN_BACKEND_URL**: `http://localhost:8080`
- **API_TIMEOUT**: `10000ms`
- **LOG_LEVEL**: `debug`

### 2. Production (Produzione)
- **NODE_ENV**: `production`
- **PORT**: `3000` (o variabile d'ambiente PORT)
- **FILE_PATH**: `https://vietnamonamour.com/`
- **VTN_BACKEND_URL**: `https://api-vtn-backend.gcp.com`
- **API_TIMEOUT**: `15000ms`
- **LOG_LEVEL**: `error`

### 3. Test
- **NODE_ENV**: `test`
- **PORT**: `3001`
- **FILE_PATH**: `http://localhost:3001/`
- **VTN_BACKEND_URL**: `http://localhost:8080`
- **API_TIMEOUT**: `5000ms`
- **LOG_LEVEL**: `silent`

## Script NPM Disponibili

```bash
# Sviluppo con nodemon (hot reload)
npm run dev

# Avvio in modalità sviluppo
npm run start:dev

# Avvio in modalità produzione
npm run start:prod

# Avvio in modalità test
npm run start:test

# Avvio predefinito (produzione)
npm start
```

## Variabili d'Ambiente

Puoi sovrascrivere le configurazioni tramite variabili d'ambiente:

```bash
# Esempio per sviluppo
NODE_ENV=development npm run dev

# Esempio per produzione
NODE_ENV=production PORT=8080 npm start
```

## Configurazione per GCP

Quando il backend sarà online su Google Cloud Platform, aggiorna il file `config.js`:

```javascript
production: {
  NODE_ENV: 'production',
  PORT: process.env.PORT || 3000,
  FILE_PATH: 'https://vietnamonamour.com/',
  VTN_BACKEND_URL: 'https://api-vtn-backend.gcp.com', // URL reale GCP
  API_TIMEOUT: 15000,
  LOG_LEVEL: 'error'
}
```

## Verifica Configurazione

All'avvio del server, vedrai un output dettagliato con tutte le configurazioni:

```
==================================================
🚀 Vietnamonamour Server avviato!
📡 Ambiente: DEVELOPMENT
🌐 Porta: 3000
📁 File Path: http://localhost:3000/
🔗 VTN Backend: http://localhost:8080
⏱️  API Timeout: 10000ms
📝 Log Level: debug
==================================================
```

## Troubleshooting

### Problema: Configurazione non caricata
**Soluzione**: Verifica che il file `config.js` esista e contenga la configurazione corretta.

### Problema: Ambiente non riconosciuto
**Soluzione**: Assicurati che `NODE_ENV` sia impostato correttamente o usa uno degli script NPM.

### Problema: Backend non raggiungibile
**Soluzione**: Verifica che l'URL del backend sia corretto e che il servizio sia in esecuzione.
