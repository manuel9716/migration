// CONEXION SQLSERVER PRUEBA LOCAL
const config = {
     user: 'sa',
     password: '12345678',
     server: 'localhost\\MSSQLSERVER01',
     database: 'usuarios_bitwan',
     options:{
         trustedconnection: false,
         enableArithAbort: true,
         encrypt: false
         //intancename: 'nombre instancia'
     }
     
   
}
// CONEXION SQLSERVER

// const config = {
//     user: 'manuel2',
//     password: 'ghbnLKJ/*+25',
//     server: '10.0.0.12\\WORLDOFFICE019',
//     //    server: '10.0.0.12',
//     database: 'INSITEL S.A.S',
//     options:{
//         trustedconnection: false,
//         enableArithAbort: true,
//         encrypt: false
//         //intancename: 'nombre instancia'
//     }
    
  
// }



module.exports = config;








