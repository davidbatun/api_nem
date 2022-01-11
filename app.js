const express = require('express');

const app = express();

const mongoose = require('mongoose');

const password = require('./config/password');
const clave = password.password;
console.log(clave);
const url = `mongodb+srv://admin:${clave}@clusterapinem.njyls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//Conexión a la base de datos
//mongodb+srv://admin:<password>@clusterapinem.njyls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongoose version 6.1.6
const options = { keepAlive: true, keepAliveInitialDelay: 300000, maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true };
//Body parser deprecated - middleware (4)
//If you also have the following code in your environment:
//server.app.use( bodyParser.urlencoded({extended: true}));
//You can replace that with:
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//You may have added a line to your code that looks like the following:
//server.app.use(bodyParser.json);
//If you are using Express 4.16+ you can now replace that line with:
app.use(express.json());//Used to parse JSON bodies
mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', (err) => {
    console.log(`Error de conexión: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('La conexión a la base de datos se ha perdido');
});

mongoose.connection.on('connected', () => {
    console.log('La conexión a la base de datos se ha establecido exitosamente');
});
//Rutas

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