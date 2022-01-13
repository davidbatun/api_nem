const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
//Token
console.log('config:', config.jwt_pass);//patatafrita1999
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

// router.get('/', (req, res) => {
//     // let obj = req.query;
//     // return res.send({ message: `Raíz del user - GET` });
//     Users.find({}, (err, users) => {
//         if (err) {
//             return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
//         }
//         if (!users) {
//             return res.status(404).send({ message: `No hay usuarios` });
//         }
//         return res.status(200).send({ users });
//     });
// });

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ message: `Error: ${err}` });
    }
});

router.post('/', (req, res) => {
    return res.send({ message: 'Raíz del user - POST' });

});

router.post('/create', (req, res) => {
    //return res.send({ message: 'Create del user - POST' });
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'El email y la contraseña son obligatorios' });
    }
    Users.findOne({ email }, (err, users) => {
        if (err) {
            return res.status(500).send({ message: `No existe el usuario: ${err}` });
        }
        if (users) {
            return res.status(404).send({ message: `El usuario ya está registrado` });
        }
        Users.create(req.body, (err, user) => {
            if (err) {
                return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
            }
            user.password = undefined;
            return res.status(201).send({ user, token: createUserToken(user._id) });
        });
    });
});

router.post('auth', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'El email y la contraseña son obligatorios' });
    }
    Users.findOne({ email }, (err, users) => {
        if (err) {
            return res.status(500).send({ message: `No existe el usuario: ${err}` });
        }
        if (!users) {
            return res.status(404).send({ message: `El usuario no existe` });
        }
        bcrypt.compare(password, users.password, (err, check) => {
            if (err) {
                return res.status(500).send({ message: `Error al comparar las contraseñas: ${err}` });
            }
            if (!check) {
                return res.status(404).send({ message: `La contraseña es incorrecta` });
            }
            return res.status(200).send({ users, token: createUserToken(users._id) });
        }).select('+password');
    });
});
console.log('users.js');
module.exports = router;

/*
200 - OK
201 - Created
202 - Accepted

400 - Bad Request
401 - Unauthorized, caracter temporal
403 - Forbidden, caracter permanente
404 - Not Found

500 - Internal Server Error
501 - Not Implemented - API no soporta esa funcionalidad
502 - Bad Gateway
503 - Service Unavailable
*/