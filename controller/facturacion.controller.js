const { verificaToken } = require('../middleware/general');
const facturacion = require('../repository/facturacion.repository');
const jwt = require('jsonwebtoken')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('../cors');

var app = express();
var router = express.Router();

app.use('/api/facturacion', router); //ruta principal

/**
 * @route GET /api/facturacion
 * @returns {object} 200 - Buscar en la db de SQLServer
 */
router.route('/getsql').get((request, response) => {
    console.log('entro al controlador')
    facturacion.getfacturacion().then(result => {
        response.json(result[0]);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

/**
 * @route GET /api/facturacion/:Identificacion
 * @returns {object} 200 - Buscar por ID de la db de SQLServer
 */
router.route('/:Identificacion').get(verificaToken,(request, response) => {
    let facturacion_models = request.params.Identificacion
    facturacion.getfacturacion_id(facturacion_models).then(result => {
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
 * @route GET /api/getmysql
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.route('/getmysql').get((request, response) => {
    facturacion.getfacturacionmysql().then(result => {
        response.json(result);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

/**
 * @route POST /api/facturacion/insertsql
 * @returns {object} 200 - insertar en la db de SQLserver
 */
router.route('/insertsql').post((request, response) => {
    let facturacion_models = { ...request.body }
    facturacion.insertfacturacion(facturacion_models).then(result => {
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
 * @route POST /api/facturacion/insertmysql
 * @returns {object} 200 - insertar en la db de MySQL
 */
router.route('/insertmysql').post((request, response) => {
    let facturacion_models2 = { ...request.body }
    facturacion.insertfacturacionmysql(facturacion_models2).then(result => {
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
    facturacion.deletefacturacionmysql(facturacion_models2).then(result => {
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
    facturacion.updatefacturacion(facturacion_models).then(result => {
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
 * @route DELETE /api/facturacion/guardar
 * @returns {object} 200 - eliminar por id en la db de SQLserver
 */
router.route('/delete/:Identificacion').delete((request, response) => {
    let facturacion_models = request.params.Identificacion
    console.log(facturacion_models)
    facturacion.deletefacturacion_id(facturacion_models).then(result => {
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
 * @route GET /api/facturacion/migration
 * @returns {object} 200 - buscar en la db de MySQL
 */
router.route('/migration').get((request, response) => {
    facturacion.migratefacturacionbloque().then(result => {
        response.status(200).json(answer);
    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

module.exports = app;

