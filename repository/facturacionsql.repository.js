var config = require('../config/dbconfig');
var poolMysql = require('../config/dbconfigmysql')
const sql = require('mssql');
const mysql = require('mysql')
const { response } = require('express');
const { promisify } = require('util');
const { Console } = require('console');
const { consumers } = require('stream');


// Region 1: Respository of SQLServer FacturacionBloque

async function getfacturacion() {
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT*FROM FacturasBloque");
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getfilasfacturacion() {
    try {
        let pool = await sql.connect(config);
        let rows = await pool.request().query("SELECT COUNT(*) FROM FacturasBloque")
        return rows.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function getfacturacion_id(usuarios) {
    try {
        await sql.connect(config)
        const result = await sql.query(`SELECT *FROM FacturasBloque WHERE Identificacion='${usuarios}';`)
        return result;
    } catch (error) {
        console.log(error);
    }

}

async function insertfacturacion(usuarios) {
    try {
        console.log("entro al repo")
        var cols = ['Identificacion', 'Nombre', 'Descripción', 'Saldo', 'Concepto', 'Contrato', 'Estado', 'RELLENO', 'Ciudad', 'Codigo_servicio', 'Personalizado2', 'IdFacturacion', 'IdDireccion']
        let colsValues = `'${usuarios.Identificacion}','${usuarios.Nombre}','${usuarios.Descripción}',${usuarios.Saldo},'${usuarios.Concepto}','${usuarios.Contrato}',${usuarios.Estado},${usuarios.RELLENO},'${usuarios.Ciudad}',${usuarios.Codigo_servicio},'${usuarios.Personalizado2}','${usuarios.IdFacturacion}',${usuarios.IdDireccion}`;
        console.log(cols[0])
        await sql.connect(config)
        const result = await sql.query(`INSERT INTO FacturasBloque (${cols}) VALUES (${colsValues})`);
        return result;

    } catch (error) {
        throw error
    }

}

async function updatefacturacion() {
    try {
        console.log(usuarios.Identificacion)
        var valueSet = "Identificacion=@Identificacion,Nombre=@Nombre,Descripción=@Descripción,Saldo=@Saldo,Concepto=@Concepto,Contrato=@Contrato,Estado=@Estado,RELLENO=@RELLENO,Ciudad=@Ciudad,Codigo_servicio=@Codigo_servicio,Personalizado2=@Personalizado2,IdFacturacion=@IdFacturacion,IdDireccion=@IdDireccion";
        let pool = await sql.connect(config);
        let Updateusua = await pool.request()
            .input('Identificacion', usuarios.NewIdentificacion)
            .input('Nombre', usuarios.Nombre)
            .input('Descripción', usuarios.Descripción)
            .input('Saldo', usuarios.Saldo)
            .input('Concepto', usuarios.Concepto)
            .input('Contrato', usuarios.Contrato)
            .input('Estado', usuarios.Estado)
            .input('RELLENO', usuarios.RELLENO)
            .input('Ciudad', usuarios.Ciudad)
            .input('Codigo_servicio', usuarios.Codigo_servicio)
            .input('Personalizado2', usuarios.Personalizado2)
            .input('IdFacturacion', usuarios.IdFacturacion)
            .input('IdDireccion', usuarios.IdDireccion)
            .query(`UPDATE USUARIOS_BITWAN SET ${valueSet} WHERE Identificacion='${usuarios.Identificacion}'`)
        return Updateusua.recordsets;

    } catch (error) {
        console.log(error);
    }

}

async function deletefacturacion_id(usuarios) {
    try {
        await sql.connect(config)
        const result = await sql.query(`DELETE FROM FacturasBloque WHERE Identificacion='${usuarios}';`)
        return result;
    } catch (error) {
        console.log(error);
    }

}

// Region 2: Repository of Migracion
async function migratefacturacionbloque() {
    try {
        let pool = await sql.connect(config);
        let facturacion = await pool.request().query("SELECT*FROM FacturasBloque");
        let rows = await pool.request().query("SELECT COUNT(*) FROM FacturasBloque")
        var array = Object.keys(facturacion)
            .map(function (key) {
                return facturacion[key];
            });

        var cols = ['identificacion', 'idInventario', 'Saldo', 'Estado', 'codigoServicio']
        try {
            const pool2 = mysql.createPool(poolMysql)
            const promiseQuery = promisify(pool2.query).bind(pool2)
            const promisePoolEnd = promisify(pool2.end).bind(pool2)
            let query = `TRUNCATE TABLE bitwan_dev.facturacion_bloque`;
            promiseQuery(query)
            try {
                array[0][0].forEach(element => {
                    setTimeout(() => {
                        let colsValues = `'${element.Identificacion}','${element.IdFacturacion}','${element.Saldo}',${element.Estado},${element.Codigo_servicio}`;
                        let query = `INSERT INTO bitwan_dev.facturacion_bloque (${cols}) VALUES (${colsValues})`;
                        promiseQuery(query)
                    }, 500);

                });
                answer = {
                    code: 200,
                    msg: "Migracion completa"
                };
                return { answer };
            } catch (error) {
                console.log(error);
            }
            promisePoolEnd()
        } catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getfacturacion: getfacturacion,
    getfilasfacturacion: getfilasfacturacion,
    getfacturacion_id: getfacturacion_id,
    insertfacturacion: insertfacturacion,
    updatefacturacion: updatefacturacion,
    deletefacturacion_id: deletefacturacion_id,
    migratefacturacionbloque: migratefacturacionbloque
}