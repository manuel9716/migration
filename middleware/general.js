const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'token invalido',
                err
            });
        }
        req.usuario = decoded.usuario[0];
        next();
    });

};


module.exports = {
    verificaToken
};