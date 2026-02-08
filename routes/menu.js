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

// Footer alternativo (senza blocco Servizi) quando si arriva da /menu-speciali
router.use((req, res, next) => {
    res.locals.footerNoServizi = (req.query.from === '/menu-speciali');
    next();
});

// ========================================
// FUNZIONE HELPER PER RECUPERARE SERVIZI
// ========================================

async function getServiziData() {
    try {
        console.log('🔄 Tentativo di recupero servizi da vtn-backend...');
        const servizi = await vtnApiService.getServizi();
        return servizi;
    } catch (error) {
        console.log('⚠️ Errore nel recupero servizi, uso array vuoto:', error.message);
        return [];
    }
}
    



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

router.get('/menu-speciali', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path

    result.index = [
        
        {label:'Menu di San Valentino',link:'/san-valentino?from=/menu-speciali',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hearts</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer2" d="M46.7 29.3A24.5 24.5 0 0 0 50 17.2 12.1 12.1 0 0 0 38 5a12.9 12.9 0 0 0-12 8.1A12.9 12.9 0 0 0 14 5 12.1 12.1 0 0 0 2 17.2c0 11.4 8.8 22 24 31.8l3.7-2.5" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path><path data-name="layer1" d="M53 27a9.7 9.7 0 0 0-9 5.9 9.7 9.7 0 0 0-9-5.9 8.9 8.9 0 0 0-9 8.9c0 8.3 6.6 16 18 23.1 11.4-7.1 18-14.8 18-23.1a8.9 8.9 0 0 0-9-8.9z" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>'},
        {label:'Menu di San Valentino vegetariano',link:'/san-valentino-vegetariano?from=/menu-speciali',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hearts</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer2" d="M46.7 29.3A24.5 24.5 0 0 0 50 17.2 12.1 12.1 0 0 0 38 5a12.9 12.9 0 0 0-12 8.1A12.9 12.9 0 0 0 14 5 12.1 12.1 0 0 0 2 17.2c0 11.4 8.8 22 24 31.8l3.7-2.5" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path><path data-name="layer1" d="M53 27a9.7 9.7 0 0 0-9 5.9 9.7 9.7 0 0 0-9-5.9a8.9 8.9 0 0 0-9 8.9c0 8.3 6.6 16 18 23.1 11.4-7.1 18-14.8 18-23.1a8.9 8.9 0 0 0-9-8.9z" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>'},
        {label:'Bevande',link:'/bevande?from=/menu-speciali',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Bevande" aria-describedby="lista bevande" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M43 34.5a20 20 0 1 0-34 .1"></path><circle cx="26" cy="20" r="2"></circle><path d="M26 24c12 0 24 16.8 24 28 0 6-3.4 8-8 8H10c-5.1 0-8-2-8-8 0-10.9 12-28 24-28zm16.5 10H9.4"></path><path d="M45.2 37.6L56 32l6 4-13 10"></path></svg>'},
        {label:'I nostri vini',link:'/vini?from=/menu-speciali',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="I nostri vini" aria-describedby="lista dei vini" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M22 52v7c0 1.7 1.7 3 7.6 3h4.7c6.3 0 7.6-1.3 7.6-3v-7m.1-22v-2c0-6-6-12-6-16m-8 0c0 4-6 10-6 16v2"></path><path data-name="layer1" d="M28 2h8v10h-8zm-6 28h20v22.01H22z"></path></svg>'},
        {label:'I nostri distillati',link:'/distillati?from=/menu-speciali',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="distillati" aria-describedby="lista distillati" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M20 62h24M32 46v16m21.9-34C53.1 17 46 2 46 2H18s-7.1 14.3-7.9 26"></path><path data-name="layer1" d="M10.1 28c0 .7-.1 1.4-.1 2 0 11.1 10.1 16 22 16s22-4.9 22-16c0-.7 0-1.3-.1-2z"></path></svg>'}
      ]

    result.pageTitle = 'Vietnamonamour Speciale San Valentino';
    result.headerTitle = 'Speciale San Valentino';

    res.render('index',{
        result: result
    });
});


router.get('/degustazione', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I menù degustazione',link:'/degustazione',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M6 45v-2a26 26 0 0 1 52 0v2M28.6 17.1a4 4 0 1 1 6.7.1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" d="M2 45h60m-2 0l-2 5a4.2 4.2 0 0 1-4 3H10c-1.7 0-3.2-1.3-4-3l-2-5" stroke-width="2"></path></svg>'}
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero dati da vtn-backend...');
        
        // Chiamata per ottenere nome e descrizione della categoria
        const categoryId = currentConfig.CATEGORY_IDS.DEGUSTAZIONE;
        const categoriaData = await vtnApiService.getCategoriaMenuFisso(categoryId);
        
        // Chiamata per ottenere i dettagli del menu
        const vtnData = await vtnApiService.getMenuDegustazione();
        
        // Aggiorna il label e la descrizione della pagina con i dati della categoria
        if (categoriaData && categoriaData.nome) {
            result.pagina.label = categoriaData.nome;
        }
        if (categoriaData && categoriaData.descrizione) {
            result.pagina.descrizione = categoriaData.descrizione;
        }
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Dati degustazione recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero dati degustazione:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('degustazione',{
        result: result
    });

})

router.get('/san-valentino', async (req,res)=>{

    const   result              = new Object();
            result.file_path    = file_path

    result.pagina   = {label:'Speciale San Valentino',link:'/san-valentino',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hearts</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer2" d="M46.7 29.3A24.5 24.5 0 0 0 50 17.2 12.1 12.1 0 0 0 38 5a12.9 12.9 0 0 0-12 8.1A12.9 12.9 0 0 0 14 5 12.1 12.1 0 0 0 2 17.2c0 11.4 8.8 22 24 31.8l3.7-2.5" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path><path data-name="layer1" d="M53 27a9.7 9.7 0 0 0-9 5.9 9.7 9.7 0 0 0-9-5.9 8.9 8.9 0 0 0-9 8.9c0 8.3 6.6 16 18 23.1 11.4-7.1 18-14.8 18-23.1a8.9 8.9 0 0 0-9-8.9z" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>'};
    result.menu     = new Array();

    result.servizi = await getServiziData();

    try {
        console.log('🔄 Recupero dati San Valentino da vtn-backend...');
        const vtnData = await vtnApiService.getMenuSanValentino();

        if (vtnData && vtnData.nome) {
            result.pagina.label = vtnData.nome;
        }
        if (vtnData && vtnData.descrizione) {
            result.pagina.descrizione = vtnData.descrizione;
        }

        // Normalizza la risposta GET /api/v1/menu-fisso/{id}: un menu con piatti[] dove ogni elemento ha .piatto
        const rawPiatti = (vtnData && vtnData.piatti) || [];
        const piatti = rawPiatti.map((p) => {
            const pt = p.piatto || p;
            return {
                ...pt,
                nome: pt.nome,
                descrizione: pt.descrizione,
                prezzo: pt.prezzo,
                categoria: (pt.categoria && (typeof pt.categoria === 'string' ? pt.categoria : pt.categoria.nome)) || null
            };
        });
        result.menu = [{
            nome: vtnData.nome,
            descrizione: vtnData.descrizione,
            prezzo: vtnData.prezzo,
            piatti
        }];
        console.log('✅ Dati San Valentino recuperati da vtn-backend');

    } catch (error) {
        console.error('❌ Errore nel recupero dati San Valentino:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || '/menu-speciali';
    res.render('san-valentino',{
        result: result
    });

})

router.get('/san-valentino-vegetariano', async (req,res)=>{

    const   result              = new Object();
            result.file_path    = file_path

    result.pagina   = {label:'Speciale San Valentino Vegetariano',link:'/san-valentino-vegetariano',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hearts</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer2" d="M46.7 29.3A24.5 24.5 0 0 0 50 17.2 12.1 12.1 0 0 0 38 5a12.9 12.9 0 0 0-12 8.1A12.9 12.9 0 0 0 14 5 12.1 12.1 0 0 0 2 17.2c0 11.4 8.8 22 24 31.8l3.7-2.5" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path><path data-name="layer1" d="M53 27a9.7 9.7 0 0 0-9 5.9 9.7 9.7 0 0 0-9-5.9a8.9 8.9 0 0 0-9 8.9c0 8.3 6.6 16 18 23.1 11.4-7.1 18-14.8 18-23.1a8.9 8.9 0 0 0-9-8.9z" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>'};
    result.menu     = new Array();

    result.servizi = await getServiziData();

    try {
        console.log('🔄 Recupero dati San Valentino Vegetariano da vtn-backend...');
        const vtnData = await vtnApiService.getMenuSanValentinoVegetariano();

        if (vtnData && vtnData.nome) {
            result.pagina.label = vtnData.nome;
        }
        if (vtnData && vtnData.descrizione) {
            result.pagina.descrizione = vtnData.descrizione;
        }

        // Normalizza la risposta GET /api/v1/menu-fisso/{id}: un menu con piatti[] dove ogni elemento ha .piatto
        const rawPiatti = (vtnData && vtnData.piatti) || [];
        const piatti = rawPiatti.map((p) => {
            const pt = p.piatto || p;
            return {
                ...pt,
                nome: pt.nome,
                descrizione: pt.descrizione,
                prezzo: pt.prezzo,
                categoria: (pt.categoria && (typeof pt.categoria === 'string' ? pt.categoria : pt.categoria.nome)) || null
            };
        });
        result.menu = [{
            nome: vtnData.nome,
            descrizione: vtnData.descrizione,
            prezzo: vtnData.prezzo,
            piatti
        }];
        console.log('✅ Dati San Valentino Vegetariano recuperati da vtn-backend');

    } catch (error) {
        console.error('❌ Errore nel recupero dati San Valentino Vegetariano:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || '/menu-speciali';
    res.render('san-valentino-vegetariano',{
        result: result
    });

})

router.get('/business-lunch', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I menù pranzo',link:'/business-lunch',icon:'<svg class="w-full h-8 fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M6 45v-2a26 26 0 0 1 52 0v2M28.6 17.1a4 4 0 1 1 6.7.1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-linejoin="round" d="M2 45h60m-2 0l-2 5a4.2 4.2 0 0 1-4 3H10c-1.7 0-3.2-1.3-4-3l-2-5" stroke-width="2"></path></svg>'}
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero business lunch da vtn-backend...');
        
        // Chiamata per ottenere nome e descrizione della categoria
        const categoryId = currentConfig.CATEGORY_IDS.BUSINESS_LUNCH;
        const categoriaData = await vtnApiService.getCategoriaMenuFisso(categoryId);
        
        // Chiamata per ottenere i dettagli del menu
        const vtnData = await vtnApiService.getBusinessLunch();
        
        // Aggiorna il label e la descrizione della pagina con i dati della categoria
        if (categoriaData && categoriaData.nome) {
            result.pagina.label = categoriaData.nome;
        }
        if (categoriaData && categoriaData.descrizione) {
            result.pagina.descrizione = categoriaData.descrizione;
        }
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Dati business lunch recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero dati business lunch:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('business-lunch',{
        result: result
    });

})
router.get('/carta', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'Il menù alla carta',link:'/carta',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Menu alla carta" aria-describedby="lista dei piatti" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M46 2L32.1 30M58 10L40 30M22 62h20"></path><path d="M2.1 30a30 30 0 0 0 59.8 0z"></path></svg>'};
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero menu piatti da vtn-backend...');
        const vtnData = await vtnApiService.getMenuPiatti();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Menu piatti recuperato da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero menu piatti:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('piatti',{
        result: result
    });

})
router.get('/dolci', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri dolci',link:'/dolci',icon:'<svg class="w-full h-8 menu-icon fill-marrone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Dolci" aria-describedby="Lista dolci" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="fill-none stroke-marrone-400" d="M2 52h60"></path><path d="M40.3 22.9L62 42v20H6c-3.2 0-4-2-4-4V42c0-18.5 14-30 22-30a7.4 7.4 0 0 1 3.5 1.4M2 42h60"></path><circle cx="34" cy="18" r="8"></circle><path d="M34 10c1.7-4.6-1.5-8-6-8"></path></svg>'};
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero dolci da vtn-backend...');
        const vtnData = await vtnApiService.getDolci();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Dolci recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero dolci:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('dolci',{
        result: result
    });

})
router.get('/bevande', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'Bevande',link:'/bevande',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="Bevande" aria-describedby="lista bevande" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M43 34.5a20 20 0 1 0-34 .1"></path><circle cx="26" cy="20" r="2"></circle><path d="M26 24c12 0 24 16.8 24 28 0 6-3.4 8-8 8H10c-5.1 0-8-2-8-8 0-10.9 12-28 24-28zm16.5 10H9.4"></path><path d="M45.2 37.6L56 32l6 4-13 10"></path></svg>'};
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero bevande da vtn-backend...');
        const vtnData = await vtnApiService.getBevande();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Bevande recuperate da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero bevande:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('bevande',{
        result: result
    });

})
router.get('/vini', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri vini',link:'/vini',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="I nostri vini" aria-describedby="lista dei vini" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M22 52v7c0 1.7 1.7 3 7.6 3h4.7c6.3 0 7.6-1.3 7.6-3v-7m.1-22v-2c0-6-6-12-6-16m-8 0c0 4-6 10-6 16v2"></path><path data-name="layer1" d="M28 2h8v10h-8zm-6 28h20v22.01H22z"></path></svg>'};
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero vini da vtn-backend...');
        const vtnData = await vtnApiService.getVini();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Vini recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero vini:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('vini',{
        result: result
    });

})
router.get('/distillati', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path
            
    result.pagina   = {label:'I nostri distillati',link:'/distillati',icon:'<svg class="w-full h-8 fill-marrone-400 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="distillati" aria-describedby="lista distillati" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><path data-name="layer2" d="M20 62h24M32 46v16m21.9-34C53.1 17 46 2 46 2H18s-7.1 14.3-7.9 26"></path><path data-name="layer1" d="M10.1 28c0 .7-.1 1.4-.1 2 0 11.1 10.1 16 22 16s22-4.9 22-16c0-.7 0-1.3-.1-2z"></path></svg>'};
    result.menu     = new Array();
    
    // Recupera i servizi per il footer
    result.servizi = await getServiziData();

    try {
        // Recupero dati da vtn-backend
        console.log('🔄 Recupero distillati da vtn-backend...');
        const vtnData = await vtnApiService.getDistillati();
        
        // Passa i dati vtn-backend direttamente al template
        if (vtnData && Array.isArray(vtnData)) {
            result.menu = vtnData;
            console.log('✅ Distillati recuperati da vtn-backend');
        } else {
            throw new Error('Dati non validi da vtn-backend');
        }
        
    } catch (error) {
        console.error('❌ Errore nel recupero distillati:', error.message);
        result.menu = [];
    }

    result.backUrl = req.query.from || req.query.backUrl || null;
    res.render('distillati',{
        result: result
    });

})

module.exports = router;
