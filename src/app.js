const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const registerRoute = require('./config/routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

registerRoute(app); // ✅ routes first

// ✅ error handlers AFTER routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;