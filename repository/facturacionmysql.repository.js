var poolMysql = require('../config/dbconfigmysql')
const mysql = require('mysql')
const { response } = require('express');
const { promisify } = require('util');
const { Console } = require('console');



// Region 1: Respository of MySQL FacturacionBloque
 
async function getfacturacionmysql() {
    try {
        const pool = mysql.createPool(poolMysql)
        const promiseQuery = promisify(pool.query).bind(pool)
        const promisePoolEnd = promisify(pool.end).bind(pool)
        let query = "SELECT * FROM facturacion_bloque"
        const result = await promiseQuery(query)
        promisePoolEnd()
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getfilasfacturacionmysql() {
    try {
        const pool = mysql.createPool(poolMysql)
        const promiseQuery = promisify(pool.query).bind(pool)
        const promisePoolEnd = promisify(pool.end).bind(pool)
        let query = "SELECT COUNT(*) FROM facturacion_bloque"
        const result = await promiseQuery(query)
        promisePoolEnd()
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function insertfacturacionmysql() {
    try {
        var cols = ['Identificacion', 'Nombre', 'Descripción', 'Saldo', 'Concepto', 'Contrato', 'Estado', 'RELLENO', 'Ciudad', 'Codigo_servicio', 'Personalizado2', 'IdFacturacion', 'IdDireccion']
        let colsValues = `${usuarios.Identificacion},'${usuarios.Nombre}','${usuarios.Descripción}',${usuarios.Saldo},'${usuarios.Concepto}','${usuarios.Contrato}',${usuarios.Estado},${usuarios.RELLENO},'${usuarios.Ciudad}',${usuarios.Codigo_servicio},'${usuarios.Personalizado2}','${usuarios.IdFacturacion}',${usuarios.IdDireccion}`;
        const pool = mysql.createPool(poolMysql)
        const promiseQuery = promisify(pool.query).bind(pool)
        const promisePoolEnd = promisify(pool.end).bind(pool)
        let query = `INSERT INTO usuarios_bitwan.usuarios_bitwan (${cols}) VALUES (${colsValues})`;
        console.log(query)
        const result = await promiseQuery(query)
        console.log(result)
        promisePoolEnd()
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function deletefacturacionmysql() {
    try {
        console.log("entre a usuarios delete")
        const pool = mysql.createPool(poolMysql)
        const promiseQuery = promisify(pool.query).bind(pool)
        const promisePoolEnd = promisify(pool.end).bind(pool)
        let query = `DELETE FROM usuarios_bitwan`;
        console.log(query)
        const result = await promiseQuery(query)
        console.log(result)
        promisePoolEnd()
        return result;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    
    getfacturacionmysql: getfacturacionmysql,
    getfilasfacturacionmysql: getfilasfacturacionmysql,
    insertfacturacionmysql: insertfacturacionmysql,
    deletefacturacionmysql: deletefacturacionmysql
   
}