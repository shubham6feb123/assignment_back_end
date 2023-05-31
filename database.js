const { Client } = require('pg');

// Create a new client instance
const client = new Client({
  user: process.env.username,
  host: process.env.host,
    database: process.env.database,
    password: process.env.password,
  port: process.env.dbport, // The default PostgreSQL port is 5432
});

const connectToDB = () => {
    client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err);
  });
}


module.exports = {client,connectToDB}