const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        // verifica se o email já existe no banco de dados
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        // cria um novo usuário
    const user = await User.create(req.body);

    // retorna o usuário criado, porém não a senha
    user.password = undefined;

    return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed!'})
    }
})

module.exports = app => app.use('/auth', router);