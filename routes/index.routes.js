const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        return res.status(200).json('Servidor funcionando correctamente');
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
