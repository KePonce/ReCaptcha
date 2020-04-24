const express       = require('express');
const app           = express();
const path          = require('path');

const fetch = require('node-fetch');
const { stringify } = require('querystring');

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json()  );


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'build','index.html'));

});
app.post('/login', async (req, res) => {
    if (!req.body.verified)
      return res.json({ success: false, msg: 'No ha realizado la autentificacion del recaptcha' });
  
    
    const secretKey = '6LeI6ewUAAAAAPt3UX6AyI1mMtdIpJFrc8srPp-v';
  
    let username = req.body.username;
    // verificacion del token con la clave secreta
    const query = stringify({
      secret: secretKey,
      response: req.body.verified,
      remoteip: req.connection.remoteAddress
    });
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
    const body = await fetch(verifyURL).then(res => res.json());
    console.log(body);
    
    // si no paso la validacion
    if (body.success !== undefined && !body.success)
      return res.json({ success: false, msg: 'Fallo en la validacion del recapcha' });
  
    
    console.log("si funciona");
    return res.json({ success: true, username: username});
  });
  
  app.listen(3000, () => console.log('Server started on port 3000'));
//Conexion a base de datos

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'usuarios'

});

db.connect(function(err){
    if(err){
        console.log('Error en la conexion de la base de datos');
        throw err; 
        return false;
    }
});*/