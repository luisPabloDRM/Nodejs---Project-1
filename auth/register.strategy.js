const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};



const validatePassword = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
    return re.test(String(password));
  };
  



const registerStategy = new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {

        try {
            const {name, passwordVerification} = req.body;

            const isSamePassword = password === passwordVerification;

            if(!isSamePassword || !passwordVerification) {
                const error = new Error('Las contraseñas no coinciden');
                return done(error);
            }

            const isValidEmail =validateEmail(email);
            if (!isValidEmail) {
                const error = new Error('Email no válido, no me la quieras jugar');
                return done(error);
            }
            
            const isValidPassword =validatePassword(password);
            if (!isValidPassword) {
                const error =new Error ('La contraseña tiene que contener de 6 a 16 caracteres, una masyúscula, minuscula y numero');
                return done(error);
            }

            const existingUser = await User.findOne({mail: email});

            if (existingUser) {
                const error = new Error("The user is already registered");
                error.status = 401;
                return done(error);
            }
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email: email,
                password: hash,
                name: name,
            });

            const savedUser = await newUser.save();

            return done(null, savedUser);
        } catch (error) {
            done(error);
        }

    }
)

passport.use('registrito', registerStategy);

module.exports = registerStategy;