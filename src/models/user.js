const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,// força a converção em caixa baixa
    },
    pssword: {
        type: String,
        require: true,
        select: false,// serve para quando fizer a requisição dos usuários no banco de dados a senha não vem junto no array de usuários.
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;