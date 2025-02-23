require("dotenv").config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const quizRoutes = require("./routes/quizzes");  // Correct route for quizzes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parse JSON requests

// Use routes
app.use("/api/quizzes", quizRoutes); // Correct route for quizzes
app.use('/api/users', userRoutes);

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
