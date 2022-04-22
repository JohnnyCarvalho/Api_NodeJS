// o middleware de autenticação é usado para verificar se o usuário está autenticado.

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o token foi informado
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }
    
        const parts = authHeader.split(' ');
        // Verifica se o token tem duas partes
        if (!parts.length === 2) {
            return res.status(401).send({ error: 'Token error' });
        }

        const [scheme, token] = parts;
        // Verifica se o token é do tipo Bearer
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ error: 'Token malformatted' });
        }
        // Verifica se o token é válido
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: 'Token invalid' });
            }
            // Se o token for válido, salva o usuário na requisição
            req.userId = decoded.id;
            // Passa para o próximo middleware
            return next();
        });
}
