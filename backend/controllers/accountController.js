const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtConfig = require('../config/jwt-config');
const dbClient = require('../config/db');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, password2,RoleId } = req.irbody;
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2 || RoleId) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) { 
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
  const result = await dbClient.query(
      'SELECT * FROM public."User" WHERE public."User"."Email" = $1',
      [email]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await dbClient.query(
      'INSERT INTO public."User" ("FirstName", "LastName", "Email", "Password","RoleId") VALUES ($1, $2, $3, $4,3)',
      [firstName, lastName, email,RoleId, hash]
    );

    res.json({ msg: 'You are now registered and can log in' });
  } catch (err) {
    console.error('Database error:', err); 
    res.status(500).json({ error: 'Something went wrong', details: err.message }); 
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
      return res.json({ token,role:user.RoleId });
    });
  })(req, res, next);
};

// Forgot Password Handle
exports.forgotPassword = (req, res) => {
  // Implement forgot password functionality here
  res.send('Forgot Password Handle');
};