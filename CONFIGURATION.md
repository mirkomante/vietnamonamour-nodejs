# Configurazione Ambiente - Vietnamonamour

## Panoramica

Il progetto Vietnamonamour supporta diversi ambienti di configurazione per sviluppo, produzione e test. La configurazione è gestita tramite variabili d'ambiente con fallback intelligenti per garantire sicurezza e flessibilità.

## File di Configurazione

### `.env.example`
Template delle variabili d'ambiente. Copia questo file in `.env` e personalizza i valori per il tuo ambiente.

### `config.js`
File principale di configurazione che utilizza le variabili d'ambiente con fallback intelligenti.

### `config.example.js`
Template di configurazione legacy (deprecato, usa `.env.example`).

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

### Setup Iniziale

1. **Copia il file template:**
   ```bash
   cp .env.example .env
   ```

2. **Modifica il file `.env` con i tuoi valori:**
   ```bash
   # Ambiente (development, production, test)
   NODE_ENV=development
   
   # Porta del server
   PORT=3000
   
   # URL del backend VTN (obbligatorio in produzione)
   VTN_BACKEND_URL=http://localhost:8080
   
   # Altri parametri...
   ```

### Variabili Disponibili

| Variabile | Default Development | Default Production | Descrizione |
|-----------|-------------------|------------------|-------------|
| `NODE_ENV` | `development` | `production` | Ambiente di esecuzione |
| `PORT` | `3000` | `3000` | Porta del server |
| `FILE_PATH` | `http://localhost:3000/` | `https://vietnamonamour.com/` | URL base per file statici |
| `VTN_BACKEND_URL` | `http://localhost:8080` | **OBBLIGATORIO** | URL del backend VTN |
| `API_TIMEOUT` | `10000` | `15000` | Timeout API in millisecondi |
| `LOG_LEVEL` | `debug` | `error` | Livello di logging |

### Variabili per Categorie (Opzionali)

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `DEGUSTAZIONE_CATEGORY_ID` | `b1d71cbe-9fdf-4f1e-ac1b-6974284d44c7` | ID categoria degustazione |
| `BUSINESS_LUNCH_CATEGORY_ID` | `49c6b34c-ede2-4cc9-8ed2-5a34ea6e044c` | ID categoria business lunch |
| `PIATTI_CATEGORY_IDS` | Array di ID separati da virgola | ID categorie piatti |
| `DOLCI_CATEGORY_ID` | `da660752-2540-47e5-81d5-005b7f62ef6a` | ID categoria dolci |

### Esempi di Utilizzo

```bash
# Sviluppo con backend personalizzato
NODE_ENV=development VTN_BACKEND_URL=http://192.168.1.100:8080 npm run dev

# Produzione con variabili d'ambiente
NODE_ENV=production VTN_BACKEND_URL=https://api-vtn-backend.gcp.com npm start

# Test con timeout personalizzato
NODE_ENV=test API_TIMEOUT=3000 npm run test
```

## Configurazione per GCP

Per il deployment su Google Cloud Platform, configura le variabili d'ambiente:

```bash
# Nel file .env per produzione
NODE_ENV=production
VTN_BACKEND_URL=https://api-vtn-backend.gcp.com
FILE_PATH=https://vietnamonamour.com/
API_TIMEOUT=15000
LOG_LEVEL=error
```

### Sicurezza

- ✅ **Il file `.env` è già nel `.gitignore`** - non verrà mai committato
- ✅ **Le variabili d'ambiente sono obbligatorie in produzione** per `VTN_BACKEND_URL`
- ✅ **Fallback intelligenti** per sviluppo locale

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
