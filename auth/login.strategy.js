const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
 const loginStrategy = new LocalStrategy(
     {
         usernameField: "mail",
         passwordField: "password",
         passReqToCallback: true,

     }, 
     async (req, email, password, done) => {
         try {

            const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        const error = new Error("Credenciales incorrectas");
        return done(error);
      }

      const user = await User.findOne({ mail: email });

      if (!user) {
        const error = new Error("Credenciales incorrectas");
        return done(error);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        user.password = null;
        return done(null, user);
      } else {
        const error = new Error("Credenciales incorrectas");
        return done(error);
      }
    } catch (error) {
        return done(error);
    }
  }
);

module.exports = loginStrategy;
