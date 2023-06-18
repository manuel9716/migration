var config = require('../config/dbconfig');
const sql = require('mssql');


// Region 1: Respository of SQLServer CarteraDavivienda
 
async function getCarteraDavivienda(fechaDesde, fechaHasta) {
    try {
        let pool = await sql.connect(config);
        let cartera = await pool.request().query(`SELECT * FROM CarteraWhatsApp WHERE Fecha BETWEEN '${fechaDesde}' AND '${fechaHasta}';`);
        return cartera.recordsets[0];

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCarteraDavivienda: getCarteraDavivienda
}