/**
 * @author Johnny Carvalho
 * @version 0.0.1
 * @description index.js
 * @date 21/04/2022
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(3000);