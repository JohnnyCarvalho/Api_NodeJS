const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// testando a conexão na porta 3000
/*app.get('/', (rec, res) => {
    res.send('Hello World!!!');
})*/

app.listen(3000);