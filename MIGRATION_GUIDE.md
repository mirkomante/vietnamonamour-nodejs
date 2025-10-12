# Guida Completa alla Migrazione: WordPress API → vtn-backend API

## 📋 Riepilogo Migrazione Completata

### ✅ **Fase 1: Servizio API** - COMPLETATA
- ✅ Creato `services/vtnApiService.js` con tutti i metodi
- ✅ Gestione errori robusta
- ✅ Sistema di fallback ai dati locali
- ✅ Logging dettagliato per debugging

### ✅ **Fase 2: Configurazione Ambiente** - COMPLETATA
- ✅ File `config.js` per gestione ambienti (dev/prod)
- ✅ Script NPM aggiornati
- ✅ Variabili d'ambiente configurate

### ✅ **Fase 3: Aggiornamento Route** - COMPLETATA
- ✅ `/degustazione` - Integrata con vtn-backend
- ✅ `/carta` - Integrata con vtn-backend
- ✅ `/dolci` - Integrata con vtn-backend
- ⚠️ `/bevande` - Integrata MA richiede correzione manuale (vedi sotto)
- ✅ `/vini` - Integrata con vtn-backend
- ✅ `/distillati` - Integrata con vtn-backend

### ✅ **Fase 4: Template Pug** - COMPLETATA
- ✅ `degustazione.pug` - Aggiornato con nuovi campi
- ✅ `carta.pug` - Aggiornato con nuovi campi
- ✅ `dolci.pug` - Aggiornato con nuovi campi
- ✅ `bevande.pug` - Creato nuovo template
- ✅ `vini.pug` - Già esistente
- ✅ `distillati.pug` - Già esistente

---

## 🔧 CORREZIONE URGENTE RICHIESTA

### **Errore nella Route `/bevande`**

**File**: `routes/menu.js`
**Riga**: 303

**Problema**: La route `/bevande` sta renderizzando il template sbagliato.

```javascript
// ❌ ATTUALE (SBAGLIATO) - Riga 303
res.render('dolci',{
    result: result
});

// ✅ CORRETTO
res.render('bevande',{
    result: result
});
```

**Azione richiesta**: Aprire `routes/menu.js`, andare alla riga 303 e cambiare `'dolci'` in `'bevande'`.

---

## 🆕 Nuovi Campi Integrati nei Template

Tutti i template ora supportano questi nuovi campi da vtn-backend:

1. **`allergeni`** - Array di allergeni (visualizzato con icona ⚠️)
2. **`categoria`** - Categoria del piatto/bevanda
3. **`disponibile`** - Boolean per disponibilità
4. **`attivo`** - Boolean per stato attivazione

### Esempio di Visualizzazione:

```pug
// Allergeni
if piatto.allergeni && piatto.allergeni.length > 0
    div(class="mt-2")
        span(class="text-xs text-red-500 font-medium") ⚠️ Allergeni: 
        span(class="text-xs text-red-500")=piatto.allergeni.join(', ')

// Stato disponibilità
if piatto.disponibile === false
    span(class="text-xs text-orange-500 font-medium bg-orange-100 px-2 py-1 rounded") Non disponibile
```

---

## 🚀 Come Avviare l'Applicazione

### **Prerequisiti**
1. Backend vtn-backend in esecuzione su `http://localhost:8080`
2. Node.js installato
3. Dipendenze installate (`npm install`)

### **Comandi di Avvio**

```bash
# Ambiente di sviluppo (con hot reload)
npm run dev

# Ambiente di sviluppo (senza hot reload)
npm run start:dev

# Ambiente di produzione
npm run start:prod
```

### **Output Atteso all'Avvio**

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

---

## 🧪 Test delle Route

### **Route da Testare**

1. **Homepage**: `http://localhost:3000/`
2. **Menu Degustazione**: `http://localhost:3000/degustazione`
3. **Menu alla Carta**: `http://localhost:3000/carta`
4. **Dolci**: `http://localhost:3000/dolci`
5. **Bevande**: `http://localhost:3000/bevande`
6. **Vini**: `http://localhost:3000/vini`
7. **Distillati**: `http://localhost:3000/distillati`

### **Cosa Verificare**

Per ogni route, controlla:

- ✅ La pagina si carica correttamente
- ✅ I dati vengono visualizzati
- ✅ I nuovi campi (allergeni, disponibilità) sono visibili
- ✅ Il fallback ai dati locali funziona (se vtn-backend è spento)
- ✅ I badge di stato sono visualizzati correttamente

### **Test del Fallback**

1. **Spegni vtn-backend**
2. **Ricarica una pagina del menu**
3. **Verifica nel console**:
   ```
   ⚠️ Errore vtn-backend, uso dati di fallback: ...
   📁 Dati di fallback caricati
   ```

---

## 📊 Sistema di Logging

### **Livelli di Log per Ambiente**

- **Development**: `debug` - Tutti i log visibili
- **Production**: `error` - Solo errori
- **Test**: `silent` - Nessun log

### **Log delle API Calls**

```javascript
// Richiesta
🔗 VTN API Request: GET /api/menu-degustazione

// Successo
✅ VTN API Response: 200 /api/menu-degustazione
✅ Menu degustazione recuperato da vtn-backend

// Errore
❌ VTN API Response Error: 500 /api/menu-degustazione
⚠️ Errore vtn-backend, uso dati di fallback: ...
📁 Dati di fallback caricati
```

---

## 🔄 Flusso di Dati

### **1. Richiesta Utente**
```
Utente → Route Express → vtnApiService
```

### **2. Chiamata API vtn-backend**
```
vtnApiService → vtn-backend API → Risposta JSON
```

### **3. Trasformazione Dati**
```
JSON vtn-backend → Mapping → Formato Template Pug
```

### **4. Rendering**
```
Dati trasformati → Template Pug → HTML → Utente
```

### **5. Fallback (in caso di errore)**
```
Errore API → vtnApiService.loadFallbackData() → data/menu.json → Template
```

---

## 🎨 Struttura Dati per i Template

### **Menu Degustazione**
```javascript
{
  sezione: {
    nome_menu: "Menù Terra",
    descrizione_menu: "Descrizione...",
    prezzo_menu: "30",
    item: [{
      piatto: "Nome piatto",
      descrizione: "Descrizione piatto",
      nascondi: false,
      allergeni: ["glutine", "soia"],
      categoria: "Involtini",
      disponibile: true
    }]
  }
}
```

### **Menu Piatti/Dolci/Bevande**
```javascript
{
  nome_sezione: "Categoria",
  item: [{
    nome: "Nome prodotto",
    descrizione: "Descrizione",
    prezzo: "15",
    allergeni: ["latte"],
    categoria: "Dolci",
    disponibile: true
  }]
}
```

### **Vini**
```javascript
{
  nome_sezione: "I Bianchi",
  item: [{
    nome: "Nome vino",
    caratteristiche: "Extra Brut",
    anno: "2020",
    bottiglia: "75cl",
    certificazione: "D.O.C.G.",
    cantina: "Cantina",
    provenienza: "Toscana",
    prezzo_calice: "8",
    prezzo_bottiglia: "35",
    disponibile: true
  }]
}
```

---

## 🛠️ Troubleshooting

### **Problema: Backend non raggiungibile**

**Sintomo**: Tutti i menu mostrano dati di fallback

**Soluzione**:
1. Verifica che vtn-backend sia in esecuzione: `curl http://localhost:8080/api/health`
2. Controlla i log del server
3. Verifica `VTN_BACKEND_URL` in `config.js`

### **Problema: Template non trovato**

**Sintomo**: Errore "Error: Failed to lookup view"

**Soluzione**:
1. Verifica che il file `.pug` esista in `views/`
2. Controlla il nome del template nella route (es. `bevande` vs `dolci`)

### **Problema: Dati non visualizzati**

**Sintomo**: Pagina bianca o campi vuoti

**Soluzione**:
1. Controlla i log del browser (F12 → Console)
2. Verifica la struttura dati nel console del server
3. Controlla che i nomi dei campi nel template corrispondano ai dati

---

## 📈 Prossimi Passi

### **Quando vtn-backend sarà Online su GCP**

1. **Aggiorna** `config.js`:
   ```javascript
   production: {
     VTN_BACKEND_URL: 'https://api-vtn-backend.gcp.com',
     // ...
   }
   ```

2. **Testa** in produzione:
   ```bash
   NODE_ENV=production npm start
   ```

3. **Verifica** tutte le route con il backend in produzione

### **Miglioramenti Futuri Consigliati**

- [ ] Implementare cache per le risposte API
- [ ] Aggiungere autenticazione alle API
- [ ] Implementare rate limiting
- [ ] Aggiungere monitoring e analytics
- [ ] Creare dashboard admin per gestione menu

---

## 📞 Supporto

Per problemi o domande sulla migrazione, controlla:
1. I log del server
2. Questo documento
3. Il file `CONFIGURATION.md` per dettagli sulla configurazione

---

**Migrazione completata il**: ${new Date().toLocaleDateString('it-IT')}
**Versione**: 2.0.0
**Author**: Mirko Mantellato
