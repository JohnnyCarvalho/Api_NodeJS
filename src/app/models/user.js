const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,// força a converção em caixa baixa
    },
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        require: true,
        select: false,// serve para quando fizer a requisição dos usuários no banco de dados a senha não vem junto no array de usuários.
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// antes de salvar no banco de dados, a senha é criptografada
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;