const dotenv        = require('dotenv');
const axios         = require('axios');
const config        = require('../config');
const vtnApiService = require('../services/vtnApiService');

dotenv.config();

// Determina l'ambiente corrente
const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

const   file_path       = currentConfig.FILE_PATH,
        vtn_backend_url = currentConfig.VTN_BACKEND_URL,
        api_timeout     = currentConfig.API_TIMEOUT;

const   express     = require('express'),
        router      = express.Router();

const   fs          = require('fs'),
        menu        = setupMenuData();
    


function setupMenuData(){
    let parsed_menu = new Object();


    fs.readFile('./data/menu.json', 'utf8', (error, data) => {
        
        if(error){
            console.log(error);
            return;
        }

        let data_parsed = JSON.parse(data);

        Object.keys(data_parsed).forEach(key => {

            parsed_menu[key]   = data_parsed[key]
        });

        parsed_menu    = JSON.parse(data);
    
    })


    return parsed_menu;

}

console.log('out')

router.get('/', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path

    result.index = [
        {label:'I menù pranzo',link:'/business-lunch',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Menu pranzo" aria-describedby="Business lunch menu" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M8 20h48v32H8z" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" d="M12 24h40v24H12z" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="20" cy="32" r="2" fill="#202020"></circle><circle cx="32" cy="32" r="2" fill="#202020"></circle><circle cx="44" cy="32" r="2" fill="#202020"></circle><circle cx="20" cy="40" r="2" fill="#202020"></circle><circle cx="32" cy="40" r="2" fill="#202020"></circle><circle cx="44" cy="40" r="2" fill="#202020"></circle><path d="M16 16h32v4H16z" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>'},
        {label:'I menù degustazione',link:'/degustazione',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M6 45v-2a26 26 0 0 1 52 0v2M28.6 17.1a4 4 0 1 1 6.7.1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" d="M2 45h60m-2 0l-2 5a4.2 4.2 0 0 1-4 3H10c-1.7 0-3.2-1.3-4-3l-2-5" stroke-width="2"></path></svg>'},
        {label:'Il menù alla carta',link:'/carta',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Menu alla carta" aria-describedby="lista dei piatti" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M46 2L32.1 30M58 10L40 30M22 62h20"></path><path d="M2.1 30a30 30 0 0 0 59.8 0z"></path></svg>'},
        {label:'I nostri dolci',link:'/dolci',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Dolci" aria-describedby="Lista dolci" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="fill-none stroke-marrone-400" d="M2 52h60"></path><path d="M40.3 22.9L62 42v20H6c-3.2 0-4-2-4-4V42c0-18.5 14-30 22-30a7.4 7.4 0 0 1 3.5 1.4M2 42h60"></path><circle cx="34" cy="18" r="8"></circle><path d="M34 10c1.7-4.6-1.5-8-6-8"></path></svg>'},
        {label:'Bevande',link:'/bevande',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Bevande" aria-describedby="lista bevande" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M43 34.5a20 20 0 1 0-34 .1"></path><circle cx="26" cy="20" r="2"></circle><path d="M26 24c12 0 24 16.8 24 28 0 6-3.4 8-8 8H10c-5.1 0-8-2-8-8 0-10.9 12-28 24-28zm16.5 10H9.4"></path><path d="M45.2 37.6L56 32l6 4-13 10"></path></svg>'},
        {label:'I nostri vini',link:'/vini',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="I nostri vini" aria-describedby="lista dei vini" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M22 52v7c0 1.7 1.7 3 7.6 3h4.7c6.3 0 7.6-1.3 7.6-3v-7m.1-22v-2c0-6-6-12-6-16m-8 0c0 4-6 10-6 16v2"></path><path data-name="layer1" d="M28 2h8v10h-8zm-6 28h20v22.01H22z"></path></svg>'},
        {label:'I nostri distillati',link:'/distillati',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="distillati" aria-describedby="lista distillati" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M20 62h24M32 46v16m21.9-34C53.1 17 46 2 46 2H18s-7.1 14.3-7.9 26"></path><path data-name="layer1" d="M10.1 28c0 .7-.1 1.4-.1 2 0 11.1 10.1 16 22 16s22-4.9 22-16c0-.7 0-1.3-.1-2z"></path></svg>'}
      ]
    
    res.render('index',{
        result: result
    });
});


router.get('/degustazione', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I menù degustazione',link:'/degustazione',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M6 45v-2a26 26 0 0 1 52 0v2M28.6 17.1a4 4 0 1 1 6.7.1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" d="M2 45h60m-2 0l-2 5a4.2 4.2 0 0 1-4 3H10c-1.7 0-3.2-1.3-4-3l-2-5" stroke-width="2"></path></svg>'}
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero dati da vtn-backend...');
        
        // Chiamata per ottenere nome e descrizione della categoria
        const categoryId = currentConfig.CATEGORY_IDS.DEGUSTAZIONE;
        const categoriaData = await vtnApiService.getCategoriaMenuFisso(categoryId);
        
        // Chiamata per ottenere i dettagli del menu
        const vtnData = await vtnApiService.getMenuDegustazione();
        
        // 🔍 DEBUG: Analizza i dati ricevuti
        console.log('🔍 DEBUG - Analisi dati vtn-backend:');
        console.log('vtnData type:', typeof vtnData);
        console.log('vtnData isArray:', Array.isArray(vtnData));
        console.log('vtnData keys:', vtnData ? Object.keys(vtnData) : 'N/A');
        console.log('vtnData sample:', JSON.stringify(vtnData, null, 2));
        
        // Aggiorna il label e la descrizione della pagina con i dati della categoria
        if (categoriaData && categoriaData.nome) {
            result.pagina.label = categoriaData.nome;
        }
        if (categoriaData && categoriaData.descrizione) {
            result.pagina.descrizione = categoriaData.descrizione;
        }
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Dati recuperati da vtn-backend');
        } else {
            console.log('❌ Dati non validi - vtnData non è un array');
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('degustazione');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('degustazione',{
        result: result
    });

})

router.get('/business-lunch', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I menù pranzo',link:'/business-lunch',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M6 45v-2a26 26 0 0 1 52 0v2M28.6 17.1a4 4 0 1 1 6.7.1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" d="M2 45h60m-2 0l-2 5a4.2 4.2 0 0 1-4 3H10c-1.7 0-3.2-1.3-4-3l-2-5" stroke-width="2"></path></svg>'}
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero business lunch da vtn-backend...');
        
        // Chiamata per ottenere nome e descrizione della categoria
        const categoryId = currentConfig.CATEGORY_IDS.BUSINESS_LUNCH;
        const categoriaData = await vtnApiService.getCategoriaMenuFisso(categoryId);
        
        // Chiamata per ottenere i dettagli del menu
        const vtnData = await vtnApiService.getBusinessLunch();
        
        // 🔍 DEBUG: Analizza i dati ricevuti
        console.log('🔍 DEBUG - Analisi dati business lunch vtn-backend:');
        console.log('vtnData type:', typeof vtnData);
        console.log('vtnData isArray:', Array.isArray(vtnData));
        console.log('vtnData keys:', vtnData ? Object.keys(vtnData) : 'N/A');
        console.log('vtnData sample:', JSON.stringify(vtnData, null, 2));
        
        // Aggiorna il label e la descrizione della pagina con i dati della categoria
        if (categoriaData && categoriaData.nome) {
            result.pagina.label = categoriaData.nome;
        }
        if (categoriaData && categoriaData.descrizione) {
            result.pagina.descrizione = categoriaData.descrizione;
        }
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Dati business lunch recuperati da vtn-backend');
        } else {
            console.log('❌ Dati non validi - vtnData non è un array');
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('business-lunch');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('business-lunch',{
        result: result
    });

})
router.get('/carta', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'Il menù alla carta',link:'/carta',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Menu alla carta" aria-describedby="lista dei piatti" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M46 2L32.1 30M58 10L40 30M22 62h20"></path><path d="M2.1 30a30 30 0 0 0 59.8 0z"></path></svg>'};
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero menu piatti da vtn-backend...');
        const vtnData = await vtnApiService.getMenuPiatti();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Menu piatti recuperato da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('piatti');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('piatti',{
        result: result
    });

})
router.get('/dolci', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri dolci',link:'/dolci',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Dolci" aria-describedby="Lista dolci" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="fill-none stroke-marrone-400" d="M2 52h60"></path><path d="M40.3 22.9L62 42v20H6c-3.2 0-4-2-4-4V42c0-18.5 14-30 22-30a7.4 7.4 0 0 1 3.5 1.4M2 42h60"></path><circle cx="34" cy="18" r="8"></circle><path d="M34 10c1.7-4.6-1.5-8-6-8"></path></svg>'};
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero dolci da vtn-backend...');
        const vtnData = await vtnApiService.getDolci();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Dolci recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('dolci');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('dolci',{
        result: result
    });

})
router.get('/bevande', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'Bevande',link:'/bevande',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Bevande" aria-describedby="lista bevande" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M43 34.5a20 20 0 1 0-34 .1"></path><circle cx="26" cy="20" r="2"></circle><path d="M26 24c12 0 24 16.8 24 28 0 6-3.4 8-8 8H10c-5.1 0-8-2-8-8 0-10.9 12-28 24-28zm16.5 10H9.4"></path><path d="M45.2 37.6L56 32l6 4-13 10"></path></svg>'};
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero bevande da vtn-backend...');
        const vtnData = await vtnApiService.getBevande();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Bevande recuperate da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('bevande');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('bevande',{
        result: result
    });

})
router.get('/vini', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri vini',link:'/vini',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="I nostri vini" aria-describedby="lista dei vini" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M22 52v7c0 1.7 1.7 3 7.6 3h4.7c6.3 0 7.6-1.3 7.6-3v-7m.1-22v-2c0-6-6-12-6-16m-8 0c0 4-6 10-6 16v2"></path><path data-name="layer1" d="M28 2h8v10h-8zm-6 28h20v22.01H22z"></path></svg>'};
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero vini da vtn-backend...');
        const vtnData = await vtnApiService.getVini();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Vini recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('vini');
            result.menu = [
                {
                    nome_sezione: 'Spumanti / Champagne',
                    item: fallbackData.spumanti || []
                },
                {
                    nome_sezione: 'I Bianchi',
                    item: fallbackData.bianchi || []
                },
                {
                    nome_sezione: 'I Rosati',
                    item: fallbackData.rosati || []
                },
                {
                    nome_sezione: 'I Rossi',
                    item: fallbackData.rossi || []
                }
            ];
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }
    
    res.render('vini',{
        result: result
    });

})
router.get('/distillati', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri distillati',link:'/distillati',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="distillati" aria-describedby="lista distillati" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M20 62h24M32 46v16m21.9-34C53.1 17 46 2 46 2H18s-7.1 14.3-7.9 26"></path><path data-name="layer1" d="M10.1 28c0 .7-.1 1.4-.1 2 0 11.1 10.1 16 22 16s22-4.9 22-16c0-.7 0-1.3-.1-2z"></path></svg>'};
    result.menu     = new Array();

    try {
        // Prova prima con vtn-backend
        console.log('🔄 Tentativo di recupero distillati da vtn-backend...');
        const vtnData = await vtnApiService.getDistillati();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData; // ✅ Dati originali senza trasformazione
            console.log('✅ Distillati recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.log('⚠️ Errore vtn-backend, uso dati di fallback:', error.message);
        
        try {
            // Fallback ai dati locali
            const fallbackData = await vtnApiService.loadFallbackData('distillati');
            result.menu = fallbackData;
            console.log('📁 Dati di fallback caricati');
        } catch (fallbackError) {
            console.error('❌ Errore anche nel fallback:', fallbackError.message);
            result.menu = [];
        }
    }

    res.render('distillati',{
        result: result
    });

})

module.exports = router;
