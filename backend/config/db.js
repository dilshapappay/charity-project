const { Client } = require('pg')
require('dotenv').config();

const dbClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'charity-db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

dbClient.connect((err, client) => {
    if (err) {
        console.log("connection error", err.stack)
    } else {
        console.log("Connected")
    }
})
module.exports = dbClient;
