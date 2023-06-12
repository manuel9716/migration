var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

//Facturacion_bloque
app.use( require('./controller/facturacion.controller') );
//Cartera_Whatsapp
app.use( require('./controller/carterawhatsapp.controller') );
//Usuarios_Auth
//app.use( require('./controller/usuarios.controller') );


var port = process.env.PORT || 8090;
app.listen(port);
console.log('BITWAN API iniciado en el puerto: ', + port);
