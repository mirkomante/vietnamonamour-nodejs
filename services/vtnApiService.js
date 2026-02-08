const axios = require('axios');
const config = require('../config');

class VtnApiService {
    constructor() {
        // Determina l'ambiente corrente
        const environment = process.env.NODE_ENV || 'development';
        this.config = config[environment];
        
        this.baseURL = this.config.VTN_BACKEND_URL;
        this.timeout = this.config.API_TIMEOUT;
        
        // Configurazione axios
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Interceptor per logging
        this.client.interceptors.request.use(
            (config) => {
                console.log(`🔗 VTN API Request: ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('❌ VTN API Request Error:', error.message);
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => {
                console.log(`✅ VTN API Response: ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error(`❌ VTN API Response Error: ${error.response?.status || 'Network Error'} ${error.config?.url}`);
                if (error.response?.data) {
                    console.error('Response body:', JSON.stringify(error.response.data, null, 2));
                }
                return Promise.reject(error);
            }
        );
    }

    // ========================================
    // METODI PER MENU DEGUSTAZIONE
    // ========================================
    
        async getMenuDegustazione() {
            try {
                console.log('🍽️ Recupero menu degustazione da vtn-backend...');
                const categoryId = this.config.CATEGORY_IDS.DEGUSTAZIONE;
                const response = await this.client.get(`/api/v1/menu-fisso/categoria/${categoryId}/dettagli`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero menu degustazione:', error.message);
                throw new Error(`Impossibile recuperare menu degustazione: ${error.message}`);
            }
        }

        async getBusinessLunch() {
            try {
                console.log('🍽️ Recupero business lunch da vtn-backend...');
                const categoryId = this.config.CATEGORY_IDS.BUSINESS_LUNCH;
                const response = await this.client.get(`/api/v1/menu-fisso/categoria/${categoryId}/dettagli`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero business lunch:', error.message);
                throw new Error(`Impossibile recuperare business lunch: ${error.message}`);
            }
        }

        async getMenuSanValentino() {
            try {
                console.log('🍽️ Recupero menu San Valentino da vtn-backend...');
                const menuId = this.config.CATEGORY_IDS.SAN_VALENTINO;
                const response = await this.client.get(`/api/v1/menu-fisso/${menuId}`);

                if (response.data && response.data.success && response.data.data) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero menu San Valentino:', error.message);
                throw new Error(`Impossibile recuperare menu San Valentino: ${error.message}`);
            }
        }

        async getMenuSanValentinoVegetariano() {
            try {
                console.log('🍽️ Recupero menu San Valentino Vegetariano da vtn-backend...');
                const menuId = this.config.CATEGORY_IDS.SAN_VALENTINO_VEGETARIANO;
                const response = await this.client.get(`/api/v1/menu-fisso/${menuId}`);

                if (response.data && response.data.success && response.data.data) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero menu San Valentino Vegetariano:', error.message);
                throw new Error(`Impossibile recuperare menu San Valentino Vegetariano: ${error.message}`);
            }
        }

        async getCategoriaMenuFisso(categoryId) {
            try {
                console.log(`📋 Recupero categoria menu fisso ${categoryId} da vtn-backend...`);
                const response = await this.client.get(`/api/v1/categoria-menu-fisso/${categoryId}`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && response.data.data) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero categoria:', error.message);
                throw new Error(`Impossibile recuperare categoria: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER MENU PIATTI
    // ========================================
    
        async getMenuPiatti() {
            try {
                console.log('🍜 Recupero menu piatti da vtn-backend...');
                const categoryIds = this.config.CATEGORY_IDS.PIATTI;
                
                // Costruisce la query string con le categorie
                const categoriesParam = categoryIds.join(',');
                const response = await this.client.get(`/api/v1/piatti/categorie/ordine?categorie=${categoriesParam}`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero menu piatti:', error.message);
                throw new Error(`Impossibile recuperare menu piatti: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER DOLCI
    // ========================================
    
        async getDolci() {
            try {
                console.log('🍰 Recupero dolci da vtn-backend...');
                const categoryId = this.config.CATEGORY_IDS.DOLCI;
                const response = await this.client.get(`/api/v1/piatti/categoria/${categoryId}`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero dolci:', error.message);
                throw new Error(`Impossibile recuperare dolci: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER BEVANDE
    // ========================================
    
        async getBevande() {
            try {
                console.log('🥤 Recupero bevande da vtn-backend...');
                const response = await this.client.get(`/api/v1/bevande/raggruppate-per-tipologia`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero bevande:', error.message);
                throw new Error(`Impossibile recuperare bevande: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER VINI
    // ========================================
    
        async getVini() {
            try {
                console.log('🍷 Recupero vini da vtn-backend...');
                const response = await this.client.get(`/api/v1/vini/raggruppati-per-tipologia`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero vini:', error.message);
                throw new Error(`Impossibile recuperare vini: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER DISTILLATI
    // ========================================
    
        async getDistillati() {
            try {
                console.log('🥃 Recupero distillati da vtn-backend...');
                const response = await this.client.get(`/api/v1/liquori/raggruppati-per-tipologia`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero distillati:', error.message);
                throw new Error(`Impossibile recuperare distillati: ${error.message}`);
            }
        }

    // ========================================
    // METODI PER SERVIZI
    // ========================================
    
        async getServizi() {
            try {
                console.log('🛠️ Recupero servizi da vtn-backend...');
                const response = await this.client.get(`/api/v1/servizi`);
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero servizi:', error.message);
                throw new Error(`Impossibile recuperare servizi: ${error.message}`);
            }
        }

    // ========================================
    // METODI DI UTILITÀ
    // ========================================
    
    /**
     * Verifica la connessione al backend
     */
    async checkConnection() {
        try {
            console.log('🔍 Verifica connessione a vtn-backend...');
            const response = await this.client.get('/api/health');
            return {
                connected: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('❌ Connessione a vtn-backend fallita:', error.message);
            return {
                connected: false,
                error: error.message
            };
        }
    }

    /**
     * Recupera informazioni sul backend
     */
    async getBackendInfo() {
        try {
            const response = await this.client.get('/api/info');
            return response.data;
        } catch (error) {
            console.error('❌ Errore nel recupero info backend:', error.message);
            return null;
        }
    }

    
}

// Esporta un'istanza singleton del servizio
module.exports = new VtnApiService();
