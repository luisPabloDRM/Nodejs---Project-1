const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerStategy = new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {

        try {
            const existingUser = await User.find({mail: email});

            if (existingUser.length) {
                const error = new Error("The user is already registered");
                error.status = 401;
                return done(error);
            }
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email: email,
                password: hash,
                name: req.body.name,
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