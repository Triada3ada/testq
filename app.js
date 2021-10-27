require('dotenv').config()

const express = require('express');
const path = require('path');
const { isAuthorized } = require('./middleware');
const router = require('./router/index')


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);
app.get('/', isAuthorized, async (req, res) => {

    res.send('ok')
});


console.log(process.env.DB_HOST);

module.exports = app