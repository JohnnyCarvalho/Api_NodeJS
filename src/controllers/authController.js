const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// crria um token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email, userName } = req.body;

    try {
        // verifica se o email ou usuário já existe no banco de dados
        if (await User.findOne({ email }) || await User.findOne({ userName })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        // cria um novo usuário
    const user = await User.create(req.body);

    // retorna o usuário criado, porém não a senha
    user.password = undefined;
    // retorna o token
    return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed!'})
    }
})

// função para autenticar o usuário
router.post('/authenticate', async (req, res) => {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName }).select('+password');
    // verifica se o usuário existe
    if (!user) {
        return res.status(400).send({ error: 'User not found!' });
    }
    // verifica se a senha está correta
    else if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'invalid password!' })
    }

    // retorna o usuário, porém não a senha
    user.password = undefined;
    // retorna o token
    res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/auth', router);