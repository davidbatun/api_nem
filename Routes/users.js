const express = require('express');
const router = express.Router();
const Users = require('../model/user');

router.get('/', (req, res) => {
    
    // let obj = req.query;
    // return res.send({ message: `Raíz del user - GET` });

    Users.find({}, (err, users) => {
        if (err) {
            return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
        }
        if (!users) {
            return res.status(404).send({ message: `No hay usuarios` });
        }
        return res.status(200).send({ users });
    });
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
            return res.status(200).send({ user });
        });
    });
});

module.exports = router;