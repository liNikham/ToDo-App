// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect( process.env.DB_Connection)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Task routes
app.use('/todos', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
