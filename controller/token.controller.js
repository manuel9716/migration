const { verificaToken } = require('../middleware/general');
const facturacion = require('../repository/usuario.repository');
const jwt = require('jsonwebtoken')
var poolMysql = require('../config/dbconfigmysql');
const mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('../cors');

var app = express();
var router = express.Router();
const sjcl = require("sjcl");

app.use('/api', router); //ruta principal
/**
 * autentica un usuario
 * @route POST /usuario/auth
 * @group USUARIO manejo de usuarios
 * @param {object} body el objeto.
 * @returns {object} 200 - un objeto de usuario
 * @returns {Error}  default - Unexpected error
 */
app.post('/usuario/auth', function(req, res) {
    let { alias, password } = req.body;
    console.log("entro al post de auth")

    /*Encrypt password*/
    const myString = password;
    const myBitArray = sjcl.hash.sha256.hash(myString);
    const myHash = sjcl.codec.hex.fromBits(myBitArray);
    password = myHash
    //let query = 'SELECT idUsuario, alias, nombres, fCreado FROM usuarios where ';

    let query = 'SELECT A.alias, B.nombres, B.apellidos, A.permisos, A.idusuario FROM usuarios as A INNER JOIN terceros as B ';
    query += 'ON A.idTercero = B.idTercero where ';
    query += 'alias = ? and '
    query += 'password = ?'
    const pool = mysql.createPool(poolMysql)

    pool.query(query, [alias, password], (error, results) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        var permissions_token = {alias: results[0].alias, nombres: results[0].nombres, apellidos: results[0].apellidos, idusuario: results[0].idusuario}

        if (results.length > 0) {
            let token = jwt.sign({
                usuario: permissions_token
            }, process.env.SEED, { expiresIn: parseInt(process.env.EXPIRES) })

            results[0].token = token;
            const cloneAsnwer = {...results[0] };
            delete cloneAsnwer.permisos;

            res.json({
                code: 200,
                data: cloneAsnwer,
                //count: results.length,
                permisos: results[0].permisos,
                //expiresIn: process.env.EXPIRES
            });
        } else {
            res.json({
                ok: false,
                message: 'Alias o contraseña incorrectos'
            });
        }

    });

});

module.exports = app;
