const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const TicketRoutes = require('./routes/ticket')
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://aixauss:dydvo4-xuknum-mexRet@clusteran.ucqbbbd.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoBD réussie !'))
.catch(() => console.log('Conexion à MongoDB échouée ! '));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/ticket',TicketRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;