const { Client } = require('pg')

const dbClient = new Client({
    host: 'localhost',
    port: 5432,
    database: 'charity-db',
    user: 'postgres',
    password: '1234'
})

dbClient.connect((err) => {
    if (err) {
        console.log("connection error", err.stack)
    } else {
        console.log("Connected")
    }
})
module.exports = dbClient;
