const dotenv                =   require('dotenv');
const config                =   require('./config');

// Carica le variabili d'ambiente
dotenv.config();

// Determina l'ambiente corrente
const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

// Configurazione dell'applicazione
const   port                =   currentConfig.PORT,
        file_path           =   currentConfig.FILE_PATH,
        vtn_backend_url     =   currentConfig.VTN_BACKEND_URL,
        api_timeout         =   currentConfig.API_TIMEOUT,
        log_level           =   currentConfig.LOG_LEVEL;

const   express             =   require('express'),
        cors                =   require('cors'),
        path                =   require('path'),
        bodyParser          =   require('body-parser');

const   router              =   express.Router(),
        app                 =   express();


//CORS
app.use(cors());


//JSON
app.use(express.json());
//BodyParser
app.use(express.urlencoded({extended : true}));




//PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/', require('./routes/menu'));


//LISTEN
app.listen(port, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Vietnamonamour Server avviato!`);
    console.log(`📡 Ambiente: ${environment.toUpperCase()}`);
    console.log(`🌐 Porta: ${port}`);
    console.log(`📁 File Path: ${file_path}`);
    console.log(`🔗 VTN Backend: ${vtn_backend_url}`);
    console.log(`⏱️  API Timeout: ${api_timeout}ms`);
    console.log(`📝 Log Level: ${log_level}`);
    console.log('='.repeat(50));
});