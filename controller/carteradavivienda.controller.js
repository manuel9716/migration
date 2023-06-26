// const { verificaToken } = require('../middleware/general');
// const carteradavivienda = require('../repository/carteradavivienda.repository');
// const jwt = require('jsonwebtoken')
// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('../cors');

// var app = express();
// var router = express.Router();

// app.use('/api/carteradavivienda', router); //ruta principal


// /**
//  * @route GET /api/carteradavivienda/:fechaDesde/:fechaHasta
//  * @returns {object} 200 - buscar en la db de SQLserver
//  */

// router.route('/get').get((request, response) => {
//     console.log("entro al controlador davivienda")
//     carteradavivienda.getCarteraDavivienda().then(result => {
//         response.json(result[0]);
//     }, (err) => {
//         console.log(err.message);
//         response.json(err.message)
//     });
// });


// module.exports = app;

