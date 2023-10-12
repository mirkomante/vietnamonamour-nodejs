const dotenv        =   require('dotenv');
const axios         =   require('axios');

dotenv.config();

const   file_path   =   process.env.FILE_PATH;

const   express     =   require('express'),
        router      =   express.Router();


        const fs = require('fs');
    



router.get('/', async (req,res)=>{
    
    const   result              = new Object();
            result.file_path    = file_path;

    let     menu                = new Object();

    fs.readFile('./data/menu.json', 'utf8', (error, data) => {
        
        if(error){
            console.log(error);
            return;
        }

        let data_parsed = JSON.parse(data);

        Object.keys(data_parsed).forEach(key => {

            menu[key]   = data_parsed[key]
        });

        menu    = JSON.parse(data);

        console.log(menu)
        
    
    })

    res.render('menu',{
        result: result
    });
});


module.exports = router;
