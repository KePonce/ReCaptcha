const bodyParser        = require('body-parser');
const fetch             = require('node-fetch');
const { stringify }     = require('querystring');

class Router {

    constructor(app){
        this.login(app);
        
    }

    login(app){
        
        app.post('/login',(req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let verified = req.body.verified;

            console.log(username);
            console.log(password);
            console.log("prueba");
            console.log(verified);
            
            if(verified === false){
                    return res.json({
                        success: false,
                        msg: 'No ha realizado la autentificación'
                    })
                    ;
                }
            

            const secretkey = '6LeI6ewUAAAAAPt3UX6AyI1mMtdIpJFrc8srPp-v';

            const query = stringify({
                secret: secretKey,
                response: req.body.verified,
                remoteip: req.connection.remoteAddress
              });

              const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

              // Make a request to verifyURL
            const body = await fetch(verifyURL).then(res => res.json());

            
                if(body.success !== undefined && !body.success){
                    return res.json({
                        success: false,
                        msg: 'No ha realizado la autentificación'
                    });
                    
                }
            

            return res.json({
                success: true,
                username: username
            })
            ;
            
        });



    }
}

module.exports = Router;