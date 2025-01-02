const express = require('express');
const cors = require('cors');


const app = express();

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
