const express = require('express');
const router = express.Router();


// health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    Timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;