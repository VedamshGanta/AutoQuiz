const { Sequelize } = require('sequelize');


// Get DB connection details from environment variables
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
});

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

