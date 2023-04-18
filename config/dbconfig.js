// CONEXION SQLSERVER
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
// const config = {
//     user: 'manuel',
//     password: '123456789',
//     server: '10.0.0.12',
//     database: 'INSITEL S.A.S',
//     options:{
//         trustedconnection: false,
//         enableArithAbort: true,
//         encrypt: false
//         //intancename: 'nombre instancia'
//     }
    
  
// }



module.exports = config;


