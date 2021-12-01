const passport = require('passport');
const User = require('../models/User');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');

passport.serializeUser((user, done)=>{
    return done (null, user._id);
});

passport.deserializeUser(async (userID, done) => {
    try {
        const existingUser =await User.findById(userID);
        } catch (error) {
            return done(error); 
        }
   
});

passport.use("longincito", loginStrategy);
passport.use("registrito", registerStrategy);