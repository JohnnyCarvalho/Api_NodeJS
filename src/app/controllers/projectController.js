const express = require('express');
const router = express.Router();
const authMiddleware = require('.././middlewares/auth');


router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ message: 'Hello World!', user: req.userId });
});

module.exports = app => app.use('/projects', router);