const { verificaToken } = require('../middleware/general');
const carterawhatsapp = require('../repository/carterawhatsapp.repository');
const jwt = require('jsonwebtoken')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('../cors');

var app = express();
var router = express.Router();

app.use('/api/carterawhatsapp', router); //ruta principal


/**
 * @route GET /api/carterawhatsapp/:fechaDesde/:fechaHasta
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.get('/:fechaDesde/:fechaHasta', (request, response) => {
    let FechaDesde = request.params.fechaDesde
    let FechaHasta = request.params.fechaHasta
    carterawhatsapp.getCarteraWhatsApp(FechaDesde, FechaHasta).then(result => {
        
		const header = Object.keys(result[0]);
		//const header = Object.keys(items);

		const headerString = header.join(",");

		// handle null or undefined values here
		const replacer = (key, value) => value !== null && value !== undefined ? value : "";

		const rowItems = result.map((row) =>
			header
				.map((fieldName) => JSON.stringify(row[fieldName], replacer))
				.join(",")
		);
		rowItems.join("\n");
		let finalItems = rowItems.join("\n");

		const csv = [headerString, finalItems].join("\n");
		
        response.json(csv);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

module.exports = router;

