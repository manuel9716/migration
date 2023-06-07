var config = require('../config/dbconfig');
var poolMysql = require('../config/dbconfigmysql')
const sql = require('mssql');
const mysql = require('mysql')
const { response } = require('express');
const { promisify } = require('util');
const { Console } = require('console');


//SQLServer

async function getUsuarios() {
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT*FROM FacturasBloque");
        console.log(usuarios)
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function getUsuarios_id(usuarios) {
    try {
        console.log(usuarios)
        let pool = await sql.connect(config);
        let usuariosID = await pool.request()
            .query(`SELECT*FROM FacturasBloque WHERE Identificacion='${usuarios}';`)
        console.log(usuariosID)
        return usuariosID.recordsets;
    } catch (error) {
        console.log(error);
    }

}

// delete usuarios MySQL
async function deleteUsuariosmysql(usuarios) {
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


async function insertUsuarios(usuarios) {
    try {
        console.log(usuarios)
        var cols = ['Identificacion', 'Nombre', 'Descripción', 'Saldo', 'Concepto', 'Contrato', 'Estado', 'RELLENO', 'Ciudad', 'Codigo_servicio', 'Personalizado2', 'IdFacturacion', 'IdDireccion']
        let colsValues = `${usuarios.Identificacion},'${usuarios.Nombre}','${usuarios.Descripción}',${usuarios.Saldo},'${usuarios.Concepto}','${usuarios.Contrato}',${usuarios.Estado},${usuarios.RELLENO},'${usuarios.Ciudad}',${usuarios.Codigo_servicio},'${usuarios.Personalizado2}','${usuarios.IdFacturacion}',${usuarios.IdDireccion}`;
        await sql.connect(config)
        const result = await sql.query(`INSERT INTO USUARIOS_BITWAN (${cols}) VALUES (${colsValues})`);
        return result;

    } catch (error) {
        throw error
    }

}

async function updateUsuarios(usuarios) {
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

async function deleteUsuarios(usuarios) {
    try {
        //console.log(usuarios)
        let pool = await sql.connect(config);
        let Deleteusua = await pool.request()
            .query(`DELETE FROM USUARIOS_BITWAN WHERE Identificacion='${usuarios}';`)
        return Deleteusua.recordsets;
    } catch (error) {
        console.log(error);
    }

}

// Get usuarios MySQL
async function getUsuariosmysql() {
    try {
        const pool = mysql.createPool(poolMysql)
        const promiseQuery = promisify(pool.query).bind(pool)
        const promisePoolEnd = promisify(pool.end).bind(pool)
        let query = "SELECT * FROM bitwan_dev.facturacion_bloque"
        const result = await promiseQuery(query)
        console.log(result)
        promisePoolEnd()
        return result;
    } catch (error) {
        console.log(error);
    }
}

// insert usuarios MySQL
async function insertUsuariosmysql(usuarios) {
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


//Migracion de SQLServer a MySQL
async function migrate() {
    try {
        let pool = await sql.connect(config);
        let facturacion = await pool.request().query("SELECT*FROM FacturasBloque");
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
                        let colsValues = `"${element.Identificacion}",'${element.IdFacturacion}','${element.Saldo}',${element.Estado},${element.Codigo_servicio}`;
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

//SQLServer get CarteraWhatsApp

async function getCarteraWhatsApp(fechaDesde, fechaHasta) {
    try {
        let pool = await sql.connect(config);
        //let cartera = await pool.request().query("SELECT*FROM FacturasBloque");
        //let cartera = await pool.request().query(`SELECT Factura AS factura, Cedula AS cedula, Teléfonos AS telefono1, Telefono2 AS telefono2, Cliente AS cliente, EMail AS email, Ciudad AS ciudad, Fecha_Emision AS fecha_emicion, Valor_FV AS valor_fv, Movil1 AS movil1, Fecha AS fecha FROM CarteraWhatsApp WHERE fecha BETWEEN '${fechaDesde}' AND '${fechaHasta}';`);
        let cartera = await pool.request().query(`SELECT * FROM MetricsTaskExecutions WHERE Started BETWEEN '${fechaDesde}' AND '${fechaHasta}';`);
        return cartera.recordsets[0];
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUsuarios: getUsuarios,
    getUsuarios_id: getUsuarios_id,
    insertUsuarios: insertUsuarios,
    updateUsuarios: updateUsuarios,
    deleteUsuarios: deleteUsuarios,
    getUsuariosmysql: getUsuariosmysql,
    insertUsuariosmysql: insertUsuariosmysql,
    deleteUsuariosmysql: deleteUsuariosmysql,
    migrate: migrate,
    getCarteraWhatsApp: getCarteraWhatsApp
}