const express = require('express');
const User = require('../models/User');
const passport = require ('passport');
const router = express.Router();

router.post('/registro', (req, res, next)=>{
   try{
    const done = (error, savedUser) => {
       if (error){
           return next(error);
       }
       return res.status(201).json(savedUser);
   };
   passport.authenticate('registrito', done)(req);
}catch(error){
    console.log('error en el registro ', error)
}
});

module.exports = router;