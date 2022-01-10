const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = req.query;
    return res.send({ message: `Raíz del server - GET` });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Raíz del server - POST' });
});

module.exports = router;