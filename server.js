const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("This is charity api ");
});

app.listen(port, () => console.log(`App listening on port ${port}`));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CHARITY-PROJECT',
      version: '1.0.0',
    },
    servers:[{
      url:"http://localhost:5000/"
    },],
  },
  apis: ['./routes/*.js'], //Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


