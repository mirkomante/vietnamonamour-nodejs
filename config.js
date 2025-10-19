// Configurazione per Vietnamonamour
// Utilizza variabili d'ambiente con fallback intelligenti

// Carica le variabili d'ambiente PRIMA di tutto
require('dotenv').config();

// Funzione helper per ottenere variabili d'ambiente con fallback
function getEnvVar(key, defaultValue, required = false) {
  const value = process.env[key];
  
  if (required && !value) {
    throw new Error(`Variabile d'ambiente obbligatoria mancante: ${key}`);
  }
  
  return value || defaultValue;
}

// Funzione helper per parsare array di categorie da stringa
function parseCategoryIds(envVar, defaultIds) {
  const value = process.env[envVar];
  if (!value) return defaultIds;
  
  return value.split(',').map(id => id.trim());
}

// ID delle categorie di default
const DEFAULT_CATEGORY_IDS = {
  DEGUSTAZIONE: 'b1d71cbe-9fdf-4f1e-ac1b-6974284d44c7',
  BUSINESS_LUNCH: 'bf491a67-ba45-45b5-b515-a29aa8dd1b6d',
  PIATTI: ['a89d1e1f-7405-4851-8b15-fe0f42a6d1db', '4fbf8bc5-1271-483f-b784-43c0004eb9fb', '9a2d42fc-d435-4ed0-a2e0-adb7d2ded0d2', '1e66084b-0409-4d73-9fba-af177b37fd20', '9e963d11-f9f5-41d9-a58c-65de284d9b16'],
  DOLCI: 'da660752-2540-47e5-81d5-005b7f62ef6a',
  BEVANDE: 'categoria-bevande-id', // Da definire
  VINI: 'categoria-vini-id', // Da definire
  DISTILLATI: 'categoria-distillati-id' // Da definire
};

module.exports = {
  // Configurazione per ambiente di sviluppo
  development: {
    NODE_ENV: getEnvVar('NODE_ENV', 'development'),
    PORT: parseInt(getEnvVar('PORT', '3000')),
    FILE_PATH: getEnvVar('FILE_PATH', 'http://localhost:3000/'),
    VTN_BACKEND_URL: getEnvVar('VTN_BACKEND_URL', 'http://localhost:8080'),
    API_TIMEOUT: parseInt(getEnvVar('API_TIMEOUT', '10000')),
    LOG_LEVEL: getEnvVar('LOG_LEVEL', 'debug'),
    // ID delle categorie vtn-backend (da variabili d'ambiente o default)
    CATEGORY_IDS: {
      DEGUSTAZIONE: getEnvVar('DEGUSTAZIONE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DEGUSTAZIONE),
      BUSINESS_LUNCH: getEnvVar('BUSINESS_LUNCH_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BUSINESS_LUNCH),
      PIATTI: parseCategoryIds('PIATTI_CATEGORY_IDS', DEFAULT_CATEGORY_IDS.PIATTI),
      DOLCI: getEnvVar('DOLCI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DOLCI),
      BEVANDE: getEnvVar('BEVANDE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BEVANDE),
      VINI: getEnvVar('VINI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.VINI),
      DISTILLATI: getEnvVar('DISTILLATI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DISTILLATI)
    }
  },

  // Configurazione per ambiente di produzione
  production: {
    NODE_ENV: getEnvVar('NODE_ENV', 'production'),
    PORT: parseInt(getEnvVar('PORT', '3000')),
    FILE_PATH: getEnvVar('FILE_PATH', 'https://vietnamonamour.com/'),
    VTN_BACKEND_URL: getEnvVar('VTN_BACKEND_URL', 'https://api-vtn-backend.gcp.com'), // Fallback per produzione
    API_TIMEOUT: parseInt(getEnvVar('API_TIMEOUT', '15000')),
    LOG_LEVEL: getEnvVar('LOG_LEVEL', 'error'),
    // ID delle categorie vtn-backend (da variabili d'ambiente o default)
    CATEGORY_IDS: {
      DEGUSTAZIONE: getEnvVar('DEGUSTAZIONE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DEGUSTAZIONE),
      BUSINESS_LUNCH: getEnvVar('BUSINESS_LUNCH_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BUSINESS_LUNCH),
      PIATTI: parseCategoryIds('PIATTI_CATEGORY_IDS', DEFAULT_CATEGORY_IDS.PIATTI),
      DOLCI: getEnvVar('DOLCI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DOLCI),
      BEVANDE: getEnvVar('BEVANDE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BEVANDE),
      VINI: getEnvVar('VINI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.VINI),
      DISTILLATI: getEnvVar('DISTILLATI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DISTILLATI)
    }
  },

  // Configurazione per ambiente di test
  test: {
    NODE_ENV: getEnvVar('NODE_ENV', 'test'),
    PORT: parseInt(getEnvVar('PORT', '3001')),
    FILE_PATH: getEnvVar('FILE_PATH', 'http://localhost:3001/'),
    VTN_BACKEND_URL: getEnvVar('VTN_BACKEND_URL', 'http://localhost:8080'),
    API_TIMEOUT: parseInt(getEnvVar('API_TIMEOUT', '5000')),
    LOG_LEVEL: getEnvVar('LOG_LEVEL', 'silent'),
    // ID delle categorie vtn-backend per test (da variabili d'ambiente o default)
    CATEGORY_IDS: {
      DEGUSTAZIONE: getEnvVar('DEGUSTAZIONE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DEGUSTAZIONE),
      BUSINESS_LUNCH: getEnvVar('BUSINESS_LUNCH_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BUSINESS_LUNCH),
      PIATTI: parseCategoryIds('PIATTI_CATEGORY_IDS', DEFAULT_CATEGORY_IDS.PIATTI),
      DOLCI: getEnvVar('DOLCI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DOLCI),
      BEVANDE: getEnvVar('BEVANDE_CATEGORY_ID', DEFAULT_CATEGORY_IDS.BEVANDE),
      VINI: getEnvVar('VINI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.VINI),
      DISTILLATI: getEnvVar('DISTILLATI_CATEGORY_ID', DEFAULT_CATEGORY_IDS.DISTILLATI)
    }
  }
};
