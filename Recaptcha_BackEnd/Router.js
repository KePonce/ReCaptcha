class Router {

    constructor(app){
        this.login(app);
    }

    login(app){
        app.post('/login',(req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let verified = req.body.verified;
            //console.log(username);
            //console.log(password);
            //console.log(verified);

            if(verified){
                res.json({
                    success: true,
                    username: username
                })
                return;
            }else{
                res.json({
                    success: false,
                    msg: 'No ha realizado la autentificación del recaptcha'
                })
                return;
            }

        });



    }
}

module.exports = Router;