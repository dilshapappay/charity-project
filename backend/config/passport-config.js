// filepath: /e:/dhilsha/charity project/backend/config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const dbClient = require('./db');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const result = await dbClient.query('SELECT * FROM public."User" WHERE public."User"."Email" = $1', [email]);
        if (result.rows.length === 0) {
          return done(null, false, { message: 'That email is not registered' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await dbClient.query('SELECT * FROM users WHERE id = $1', [id]);
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};