// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/user.auth.routes');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect( process.env.DB_Connection)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Task routes
app.use('/todos', taskRoutes);
app.use('/auth',authRoutes);

app.use((req,res,next)=>{
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
      success:false,
      statusCode,
      message
   });
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
