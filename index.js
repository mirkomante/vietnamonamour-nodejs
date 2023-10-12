const dotenv                =   require('dotenv');


dotenv.config();

const   port                =   process.env.PORT,
        file_path           =   process.env.FILE_PATH;

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
app.listen(port, () => console.log(`expressjs app listening on port ${port}!`+`file path is: ${file_path}`));