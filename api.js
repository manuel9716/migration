var usuarios_models = require('./models/facturacion_models');
var usuarios_models2 = require('./models/facturacion_models2');
const usuarios = require('./repository/facturacion');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./cors');

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use('/api', router); //ruta principal

//Ruta para todos los usuarios
router.route('/usuarios').get((request, response) => {
    console.log("hola us")
    usuarios.getUsuarios().then(result => {
        response.json(result[0]);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});


//Ruta para todos los usuarios db remota
// router.route('/remota').get((request, response) => {
//     console.log("hola us")
//     usuarios.getUsuarios().then(result => {
//         response.json(result[0]);
//     }, (err) => {
//         console.log(err.message);
//         response.json(err.message)
//     });
// });

//Ruta para todas los usuarios por id
router.route('/usuarios/:Identificacion').get((request, response) => {
    console.log("hola id")
    let usuarios_models = request.params.Identificacion
    usuarios.getUsuarios_id(usuarios_models).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para todos los usuarios MySQL
router.route('/getmysql').get((request, response) => {
    usuarios.getUsuariosmysql().then(result => {
        response.json(result);
    }, (err) => {
        console.log(err.message);
        response.json(err.message)
    });
});

//Ruta para guardar usuarios
router.route('/usuarios/guardar').post((request, response) => {
    let usuarios_models = { ...request.body }
    usuarios.insertUsuarios(usuarios_models).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para insertar usuarios en MySQL
router.route('/postmysql').post((request, response) => {
    let usuarios_models2 = { ...request.body }
    usuarios.insertUsuariosmysql(usuarios_models2).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para eliminar usuarios en MySQL
router.route('/deletemysql').delete((request, response) => {
    let usuarios_models2 = { ...request.body }
    usuarios.deleteUsuariosmysql(usuarios_models2).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para actualizar usuarios
router.route('/usuarios/actualizar').put((request, response) => {
    let usuarios_models = { ...request.body }
    usuarios.updateUsuarios(usuarios_models).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para eliminar usuarios
router.route('/usuarios/eliminar/:Identificacion').delete((request, response) => {
    let usuarios_models = request.params.Identificacion
    console.log(usuarios_models)
    usuarios.deleteUsuarios(usuarios_models).then(result => {
        answer = {
            code: 200,
            msg: "Done.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});

//Ruta para migrar MySQL
router.route('/migration').get((request, response) => {
    usuarios.migrate().then(result => {
        answer = {
            code: 200,
            msg: "Migration complete.",
            data: result
        };
        response.json(answer);

    }, (err) => {
        response.status(400).json({
            ok: false,
            err
        });

    });
});



var port = process.env.PORT || 4235;
app.listen(port);
console.log('usuarios API iniciado en el puerto: ', + port);