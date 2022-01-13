const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log('index.js - router.get:',res.locals.auth_data);
    let obj = req.query;
    return res.send({ message: `Raíz del server - GET` });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Raíz del server - POST' });
});
console.log('index.js');
module.exports = router;