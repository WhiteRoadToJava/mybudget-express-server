require('dotenv').config();
const connectDB = require('./config/db');
const { register } = require('./controllers/authController');
const app = require('./app');





const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });




})