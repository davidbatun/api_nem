const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = req.query;
    return res.send({ message: `Raíz del user - GET` });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Raíz del user - POST' });
});

router.post('/create', (req, res) => {
    return res.send({ message: 'Create del user - POST' });
});

module.exports = router;