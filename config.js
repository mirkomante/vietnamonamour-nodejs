// Configurazione per Vietnamonamour
// Basata su config.example.js

module.exports = {
  // Configurazione per ambiente di sviluppo
  development: {
    NODE_ENV: 'development',
    PORT: 3000,
    FILE_PATH: 'http://localhost:3000/',
    VTN_BACKEND_URL: 'http://localhost:8080',
    API_TIMEOUT: 10000,
    LOG_LEVEL: 'debug',
    // ID delle categorie vtn-backend
    CATEGORY_IDS: {
      DEGUSTAZIONE: 'b1d71cbe-9fdf-4f1e-ac1b-6974284d44c7',
      PIATTI: ['a89d1e1f-7405-4851-8b15-fe0f42a6d1db', '4fbf8bc5-1271-483f-b784-43c0004eb9fb', '9a2d42fc-d435-4ed0-a2e0-adb7d2ded0d2', '1e66084b-0409-4d73-9fba-af177b37fd20', '9e963d11-f9f5-41d9-a58c-65de284d9b16'],
      DOLCI: 'da660752-2540-47e5-81d5-005b7f62ef6a',
      BEVANDE: 'categoria-bevande-id', // Da definire
      VINI: 'categoria-vini-id', // Da definire
      DISTILLATI: 'categoria-distillati-id' // Da definire
    }
  },

  // Configurazione per ambiente di produzione
  production: {
    NODE_ENV: 'production',
    PORT: process.env.PORT || 3000,
    FILE_PATH: 'https://vietnamonamour.com/',
    VTN_BACKEND_URL: 'https://api-vtn-backend.gcp.com',
    API_TIMEOUT: 15000,
    LOG_LEVEL: 'error',
    // ID delle categorie vtn-backend (stessi ID in produzione)
    CATEGORY_IDS: {
      DEGUSTAZIONE: 'b1d71cbe-9fdf-4f1e-ac1b-6974284d44c7',
      PIATTI: ['a89d1e1f-7405-4851-8b15-fe0f42a6d1db', '4fbf8bc5-1271-483f-b784-43c0004eb9fb', '9a2d42fc-d435-4ed0-a2e0-adb7d2ded0d2', '1e66084b-0409-4d73-9fba-af177b37fd20', '9e963d11-f9f5-41d9-a58c-65de284d9b16'],
      DOLCI: 'da660752-2540-47e5-81d5-005b7f62ef6a',
      BEVANDE: 'categoria-bevande-id',
      VINI: 'categoria-vini-id',
      DISTILLATI: 'categoria-distillati-id'
    }
  },

  // Configurazione per ambiente di test
  test: {
    NODE_ENV: 'test',
    PORT: 3001,
    FILE_PATH: 'http://localhost:3001/',
    VTN_BACKEND_URL: 'http://localhost:8080',
    API_TIMEOUT: 5000,
    LOG_LEVEL: 'silent',
    // ID delle categorie vtn-backend per test
    CATEGORY_IDS: {
      DEGUSTAZIONE: 'b1d71cbe-9fdf-4f1e-ac1b-6974284d44c7',
      PIATTI: ['a89d1e1f-7405-4851-8b15-fe0f42a6d1db', '4fbf8bc5-1271-483f-b784-43c0004eb9fb', '9a2d42fc-d435-4ed0-a2e0-adb7d2ded0d2', '1e66084b-0409-4d73-9fba-af177b37fd20', '9e963d11-f9f5-41d9-a58c-65de284d9b16'],
      DOLCI: 'da660752-2540-47e5-81d5-005b7f62ef6a',
      BEVANDE: 'categoria-bevande-id',
      VINI: 'categoria-vini-id',
      DISTILLATI: 'categoria-distillati-id'
    }
  }
};
