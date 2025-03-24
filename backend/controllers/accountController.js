const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtConfig = require('../config/jwt-config');
const dbClient = require('../config/db');
const Role = require('../config/Role');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, password2,RoleId } = req.body;
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
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
      'INSERT INTO public."User" ("FirstName", "LastName", "Email", "Password","RoleId") VALUES ($1, $2, $3, $4,$5)',
      [firstName, lastName, email, hash,Role["Normal User"]]
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

// Change Password Handle
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.Id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ msg: 'New password must be at least 6 characters' });
  }

  try {
    const result = await dbClient.query(
      'SELECT * FROM public."User" WHERE public."User"."Id" = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.Password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await dbClient.query(
      'UPDATE public."User" SET "Password" = $1 WHERE "Id" = $2',
      [hash, userId]
    );

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};