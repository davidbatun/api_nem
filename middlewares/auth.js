const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) return res.status(401).send({ message: 'No hay token' });
    try {
        await jwt.verify(token, 'patatafrita1999',(err, decoded) => {
            if (err) return res.status(401).send({ message: 'Token no válido' });
            res.locals.auth_data = decoded;
            return next();
        });
    }
    catch (err) {
        res.status(401).send({ message: 'Token inválido' });
    }
}
console.log('auth.js');
module.exports = auth;