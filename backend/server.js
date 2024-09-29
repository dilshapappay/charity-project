const express = require("express");
const app = express();
const port = 5000;

const { swaggerUi, swaggerSpec } = require('./config/swagger');

const client = require('./config/db'); // Import the database client


app.get("/", (req, res) => {
  res.send("This is charity api ");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => console.log(`App listening on port ${port}`));


// // Import the database connection function
// const connectDB = require('./config/db');

// // Connect to the database
// connectDB();


