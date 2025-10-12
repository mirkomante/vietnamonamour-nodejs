# Vietnamonamour - Menu Digitale

Un'applicazione web Node.js per la visualizzazione del menu del ristorante vietnamita Vietnamonamour. Il progetto presenta un'interfaccia elegante e responsive per esplorare i piatti, le bevande e la carta dei vini del ristorante.

## 🍜 Caratteristiche Principali

- **Menu Interattivo**: 6 sezioni complete per esplorare l'offerta culinaria
- **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- **Integrazione WordPress**: Sincronizzazione automatica con il sito principale
- **Fallback Locale**: Funzionamento garantito anche offline
- **UI Moderna**: Design elegante con TailwindCSS e animazioni fluide

## 📋 Sezioni del Menu

1. **Menu Degustazione** - Menù fissi con 3 portate (Terra/Cielo)
2. **Menu alla Carta** - Piatti singoli organizzati per categoria
3. **Dolci** - Dessert tradizionali e moderni
4. **Bevande** - Bevande fredde, calde e specialità vietnamite
5. **Vini** - Carta completa con spumanti, bianchi, rosati e rossi
6. **Distillati** - Whisky, rum, grappe e liquori premium

## 🛠️ Tecnologie Utilizzate

- **Backend**: Node.js + Express.js
- **Template Engine**: Pug
- **Styling**: TailwindCSS + PostCSS
- **API Integration**: WordPress REST API
- **Build Tools**: PostCSS CLI, Nodemon

## 🚀 Installazione e Avvio

### Prerequisiti
- Node.js (versione 14 o superiore)
- npm o yarn

### Setup
```bash
# Clona il repository
git clone https://github.com/username/vietnamonamour-nodejs.git

# Installa le dipendenze
npm install

# Configura le variabili d'ambiente
# Crea un file .env con:
PORT=3000
FILE_PATH=http://localhost:3000/

# Avvia in modalità sviluppo
npm run dev

# Oppure avvia in produzione
npm start
```

### Script Disponibili
- `npm run dev` - Avvia il server con nodemon per lo sviluppo
- `npm start` - Avvia il server in produzione
- `npm run tailwind:css` - Compila i CSS Tailwind in modalità watch

## 📁 Struttura del Progetto

```
vietnamonamour-nodejs/
├── data/
│   └── menu.json              # Dati locali del menu (backup)
├── public/
│   ├── css/
│   │   └── style.css          # CSS compilato da TailwindCSS
│   └── styles/
│       └── tailwind.css       # File sorgente TailwindCSS
├── routes/
│   └── menu.js                # Route per le diverse sezioni
├── views/
│   ├── partials/
│   │   ├── head.pug           # Template head HTML
│   │   └── header.pug         # Header con logo
│   ├── index.pug              # Homepage con menu principale
│   ├── degustazione.pug       # Menu degustazione
│   ├── carta.pug              # Menu alla carta
│   ├── dolci.pug              # Lista dolci
│   ├── vini.pug               # Carta dei vini
│   └── distillati.pug         # Lista distillati
├── index.js                   # Server principale
├── package.json               # Dipendenze e script
├── tailwind.config.js         # Configurazione TailwindCSS
└── postcss.config.js          # Configurazione PostCSS
```

## 🔧 Configurazione

### Variabili d'Ambiente
Crea un file `.env` nella root del progetto:

```env
PORT=3000
FILE_PATH=http://localhost:3000/
```

### Personalizzazione TailwindCSS
Il file `tailwind.config.js` contiene la palette colori personalizzata del ristorante:
- **Marrone**: Colore principale del brand
- **Arancio**: Colore di accento
- **Blu**: Colore secondario

## 🌐 API Integration

L'applicazione si connette all'API WordPress del sito principale per recuperare i dati aggiornati del menu:

```javascript
// Endpoint API utilizzato
https://vietnamonamour.com/wp-json/acf/v3/options/options
```

In caso di errore di connessione, l'applicazione utilizza i dati locali dal file `data/menu.json`.

## 📱 Design Responsive

- **Mobile First**: Progettato per dispositivi mobili
- **Breakpoints**: sm (640px), md (768px), lg (1280px), xl (1440px)
- **Grid System**: Layout flessibile con CSS Grid e Flexbox
- **Typography**: Font Nunito Sans per leggibilità ottimale

## 🎨 Branding

- **Logo**: SVG personalizzato "Vietnamonamour"
- **Colori**: Palette ispirata alla cultura vietnamita
- **Icone**: SVG personalizzate per ogni sezione del menu
- **Layout**: Design pulito e minimalista

## 📄 Licenza

ISC License - Progetto di Mirko Mantellato

## 🤝 Contributi

I contributi sono benvenuti! Per modifiche significative, apri prima una issue per discutere le modifiche proposte.

## 📞 Supporto

Per domande o supporto, contatta il team di sviluppo.

---

*Sviluppato con ❤️ per Vietnamonamour*
