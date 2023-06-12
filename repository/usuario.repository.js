
var poolMysql = require('../config/dbconfigmysql')
const mysql = require('mysql')


// Region 1: Respository of SQLServer CarteraWhatsapp
 
async function postusuarios() {
    try {
        let pool = await mysql.connect(poolMysql);
        let usuarios = await pool.request().query('SELECT idUsuario, alias, nombres, updated_at FROM usuarios order by idUsuario;');
        return usuarios.recordsets[0];

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    postusuarios: postusuarios
}