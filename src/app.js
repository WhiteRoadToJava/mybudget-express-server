const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());



// health check endpoint
app.get('/health', (req, res) => {
  res.json({messange: 'Server is healthy'});  
});


app.use((req, res, next) => {
  res.status(404).json({message: 'Not Found'});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({message: 'Internal Server Error'});
});

module.exports = app;