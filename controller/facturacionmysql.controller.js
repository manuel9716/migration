const { verificaToken } = require('../middleware/general');
const facturacionMysql = require('../repository/facturacionmysql.repository');
const jwt = require('jsonwebtoken')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('../cors');

var app = express();
var router = express.Router();

app.use('/api/facturacion', router); //ruta principal

/**
 * @route GET /api/getmysql
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.route('/getmysql').get((request, response) => {
    facturacionMysql.getfacturacionmysql().then(result => {
        response.json(result);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

/**
 * @route GET /api/getmysql/rows
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.route('/getmysql/rows').get((request, response) => {
    facturacionMysql.getfilasfacturacionmysql().then(result => {
        response.json(result);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

/**
 * @route POST /api/facturacion/insertmysql
 * @returns {object} 200 - insertar en la db de MySQL
 */
router.route('/insertmysql').post((request, response) => {
    let facturacion_models2 = { ...request.body }
    facturacionMysql.insertfacturacionmysql(facturacion_models2).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

/**
 * @route POST /api/facturacion/deletemysql
 * @returns {object} 200 - eliminar en la db de MySQL
 */
router.route('/deletemysql').delete((request, response) => {
    let facturacion_models2 = { ...request.body }
    facturacionMysql.deletefacturacionmysql(facturacion_models2).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

/**
 * @route PUT /api/facturacion/actualizarmysql
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.route('/actualizarmysql').put((request, response) => {
    let facturacion_models = { ...request.body }
    facturacionMysql.updatefacturacion(facturacion_models).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});



module.exports = app;

