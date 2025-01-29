// filepath: /e:/dhilsha/charity project/backend/controllers/accountController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pool = require('../config/db');
const jwtConfig = require('../config/jwt-config');
const dbClient = require('../config/db');

// Register Handle
exports.register = async (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  if ( !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password?.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    try {
      const result = await dbClient.query('SELECT * FROM public."User" WHERE public."User"."Email" = $1', [email]);
      if (result.rows.length > 0) {
        errors.push({ msg: 'Email already exists' });
        return res.status(400).json({ errors });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await dbClient.query('INSERT INTO public."User" ("Email", "Password") VALUES ($1, $2)', [email, hash]);
        res.json({ msg: 'You are now registered and can log in' });
      }
      dbClient.release();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
};

// Login Handle
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
      return res.json({ token });
    });
  })(req, res, next);
};

// Forgot Password Handle
exports.forgotPassword = (req, res) => {
  // Implement forgot password functionality here
  res.send('Forgot Password Handle');
};