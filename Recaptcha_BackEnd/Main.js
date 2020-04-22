const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const Router        = require('./Router');

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json()  );

new Router(app);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'build','index.html'));

});
 app.listen(3000);

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