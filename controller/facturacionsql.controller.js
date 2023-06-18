const { verificaToken } = require('../middleware/general');
const facturacionSQL = require('../repository/facturacionsql.repository');
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
    facturacionSQL.getfacturacion().then(result => {
        response.json(result[0]);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

/**
 * @route GET /api/facturacion/getsql/rows
 * @returns {object} 200 - Buscar en la db de SQLServer
 */
router.route('/getsql/rows').get((request, response) => {
    facturacionSQL.getfilasfacturacion().then(result => {
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
router.route('/getsql/:Identificacion').get((request, response) => {
    let facturacion_models = request.params.Identificacion
    facturacionSQL.getfacturacion_id(facturacion_models).then(result => {
        answer = {
            code: 200,
            msg: "Usuario encontrado en la base de datos de sql server",
            data: result.recordset
        };
       
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            msj: "Usuario NO encontrado en la base de datos de sql server",
            err
        });

    });
});

/**
 * @route POST /api/facturacion/insertsql
 * @returns {object} 200 - insertar en la db de SQLserver
 */
router.route('/insertsql').post((request, response) => {
    let facturacion_models = { ...request.body }
    facturacionSQL.insertfacturacion(facturacion_models).then(result => {
        answer = {
            code: 200,
            msg: "Registro insertado con exito",
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            msj: "error al insertar en la base de datos de sql server",
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
    facturacionSQL.deletefacturacion_id(facturacion_models).then(result => {
        answer = {
            code: 200,
            msg: "Registro eliminado con exito",
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
    facturacionSQL.migratefacturacionbloque().then(result => {
        response.status(200).json(answer);
    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

module.exports = app;

