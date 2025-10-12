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
    LOG_LEVEL: 'debug'
  },

  // Configurazione per ambiente di produzione
  production: {
    NODE_ENV: 'production',
    PORT: process.env.PORT || 3000,
    FILE_PATH: 'https://vietnamonamour.com/',
    VTN_BACKEND_URL: 'https://api-vtn-backend.gcp.com',
    API_TIMEOUT: 15000,
    LOG_LEVEL: 'error'
  },

  // Configurazione per ambiente di test
  test: {
    NODE_ENV: 'test',
    PORT: 3001,
    FILE_PATH: 'http://localhost:3001/',
    VTN_BACKEND_URL: 'http://localhost:8080',
    API_TIMEOUT: 5000,
    LOG_LEVEL: 'silent'
  }
};
