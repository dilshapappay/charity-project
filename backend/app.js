const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const dbClient = require('./config/db');
const { register } = require('./controllers/accountController');


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

app.use(function(error, request, response, next) {
  console.log(error)
  response.status(500).send('Internal Server Error');
})

// Enable CORS for all domains
app.use(cors());

const routes = require('./routes');

const { swaggerUi, swaggerSpec } = require('./config/swagger');

//Middlewares
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

// Function to check and create the default user
const checkAndCreateDefaultUser = async () => {
  try {
    const email = 'donatenowkerala@gmail.com';
    const result = await dbClient.query('SELECT * FROM public."User" WHERE public."User"."Email" = $1', [email]);

    if (result.rows.length === 0) {
      const req = {
        body: {
          firstName: 'Donate',
          lastName: 'Now',
          email: email,
          password: 'password123',
          password2: 'password123',
          RoleId: 1 // Assuming 1 is the RoleId for Master
        }
      };
      const res = {
        status: (code) => ({
          json: (data) => console.log(`Status: ${code}, Data: ${JSON.stringify(data)}`)
        })
      };
      await register(req, res);
      console.log('Default user created successfully');
    } else {
      console.log('Default user already exists');
    }
  } catch (error) {
    console.error('Error checking/creating default user:', error);
  }
};

// Call the function to check and create the default user
checkAndCreateDefaultUser();

module.exports = app;
