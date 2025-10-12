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
                
                // 🔍 DEBUG: Logga la struttura dei dati ricevuti
                console.log('📊 Struttura dati ricevuti da vtn-backend:');
                console.log('Type:', typeof response.data);
                console.log('Is Array:', Array.isArray(response.data));
                console.log('Keys:', response.data ? Object.keys(response.data) : 'N/A');
                console.log('Data sample:', JSON.stringify(response.data, null, 2));
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    console.log('✅ Dati estratti correttamente da vtn-backend');
                    return response.data.data;
                } else {
                    throw new Error('Struttura dati non valida da vtn-backend');
                }
            } catch (error) {
                console.error('❌ Errore nel recupero menu degustazione:', error.message);
                throw new Error(`Impossibile recuperare menu degustazione: ${error.message}`);
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
                
                // 🔍 DEBUG: Logga la struttura dei dati ricevuti
                console.log('📊 Struttura dati piatti ricevuti da vtn-backend:');
                console.log('Type:', typeof response.data);
                console.log('Is Array:', Array.isArray(response.data));
                console.log('Keys:', response.data ? Object.keys(response.data) : 'N/A');
                console.log('Data sample:', JSON.stringify(response.data, null, 2));
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    console.log('✅ Dati piatti estratti correttamente da vtn-backend');
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
                
                // 🔍 DEBUG: Logga la struttura dei dati ricevuti
                console.log('📊 Struttura dati dolci ricevuti da vtn-backend:');
                console.log('Type:', typeof response.data);
                console.log('Is Array:', Array.isArray(response.data));
                console.log('Keys:', response.data ? Object.keys(response.data) : 'N/A');
                console.log('Data sample:', JSON.stringify(response.data, null, 2));
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    console.log('✅ Dati dolci estratti correttamente da vtn-backend');
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
                
                // 🔍 DEBUG: Logga la struttura dei dati ricevuti
                console.log('📊 Struttura dati bevande ricevuti da vtn-backend:');
                console.log('Type:', typeof response.data);
                console.log('Is Array:', Array.isArray(response.data));
                console.log('Keys:', response.data ? Object.keys(response.data) : 'N/A');
                console.log('Data sample:', JSON.stringify(response.data, null, 2));
                
                // ✅ Estrae i dati dall'oggetto di risposta
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    console.log('✅ Dati bevande estratti correttamente da vtn-backend');
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
                const categoryId = this.config.CATEGORY_IDS.VINI;
                const response = await this.client.get(`/api/v1/menu-fisso/categoria/${categoryId}/dettagli`);
                
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
                const categoryId = this.config.CATEGORY_IDS.DISTILLATI;
                const response = await this.client.get(`/api/v1/menu-fisso/categoria/${categoryId}/dettagli`);
                
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

    // ========================================
    // METODI DI FALLBACK
    // ========================================
    
    /**
     * Carica dati di fallback dal file locale
     */
    async loadFallbackData(dataType) {
        try {
            const fs = require('fs');
            const path = require('path');
            
            const filePath = path.join(__dirname, '../data/menu.json');
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            console.log(`📁 Caricamento dati di fallback per ${dataType}...`);
            
            // Restituisce i dati appropriati in base al tipo richiesto
            switch (dataType) {
                case 'degustazione':
                    // Estrae le sezioni dai dati di fallback per degustazione
                    return (data.menu_degustazione || []).map(item => item.sezione);
                case 'piatti':
                    return (data.menu_piatti || []).map(item => item.sezione);
                case 'dolci':
                    return (data.lista_dolci || []).map(item => item.sezione);
                case 'bevande':
                    return (data.lista_bevande || []).map(item => item.sezione);
                case 'vini':
                    return {
                        spumanti: data.carta_spumanti_tabella || [],
                        bianchi: data.carta_bianchi_tabella || [],
                        rosati: data.carta_rosati_tabella || [],
                        rossi: data.carta_rossi_tabella || []
                    };
                case 'distillati':
                    return (data.carta_liquori || []).map(item => item.sezione);
                default:
                    return data;
            }
        } catch (error) {
            console.error(`❌ Errore nel caricamento dati di fallback per ${dataType}:`, error.message);
            return [];
        }
    }
}

// Esporta un'istanza singleton del servizio
module.exports = new VtnApiService();
