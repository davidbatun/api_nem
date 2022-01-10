const express = require('express');

const app = express();

const indexRoutes = require('./Routes/index');
const usersRoutes = require('./Routes/users');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

// app.get('/', (req, res) => {
//     let obj = req.query;
//     return res.send({ message: `Hello ${obj.name}! tu correo es: ${obj.email}`});
// });

// app.post('/', (req, res) => {
//     return res.send({ message: 'Hello World! método POST' });
// });

app.listen(3000);

module.exports = app;