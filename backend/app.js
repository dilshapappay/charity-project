const express = require('express');
const app = express();
const routes = require('./routes');

const { swaggerUi, swaggerSpec } = require('./config/swagger');

//Middlewares
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

module.exports = app;
