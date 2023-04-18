//CONEXION MYSQL
const configmysql ={
    user: 'root', //usuario de la db
    host: 'localhost', //ip del servidor de db en este caso la del equipo
    database: 'usuarios_bitwan', //nombre de la db
    password: '123456', //password
    port: 3306, //puerto por defecto 
};


module.exports = configmysql;


// //CONEXION MYSQL
// const Configmysql = require('mysql');
// const configmysql = new Configmysql.createPool({
//     user: 'root', //usuario de la db
//     host: 'localhost', //ip del servidor de db en este caso la del equipo
//     database: 'usuarios2', //nombre de la db
//     password: '123456', //password
//     port: 3306, //puerto por defecto 
// });
// configmysql.getConnection(function (err) {
//     if (err) {
//       console.log(err);
//     }
// });


// module.exports = configmysql;