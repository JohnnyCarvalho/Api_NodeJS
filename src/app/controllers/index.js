const fs = require('fs');
const path = require('path');

// função que retorna o conteúdo de um arquivo
module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => require(path.resolve(__dirname, file)) (app));
};
