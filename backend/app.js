const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport-config')(passport);

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for all domains
app.use(cors());

const routes = require('./routes');

const { swaggerUi, swaggerSpec } = require('./config/swagger');

//Middlewares
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

module.exports = app;
