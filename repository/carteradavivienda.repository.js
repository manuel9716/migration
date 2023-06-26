var config = require('../config/dbconfig');
const sql = require('mssql');


// Region 1: Respository of SQLServer CarteraDavivienda
 
async function getCarteraDavivienda() {
    console.log("entro a la funcion de davivienda")
    try {
        let pool = await sql.connect(config);
        let cartera = await pool.request().query(`SELECT * FROM VERDE_FV;`);
        return cartera.recordsets[0];

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCarteraDavivienda: getCarteraDavivienda
}