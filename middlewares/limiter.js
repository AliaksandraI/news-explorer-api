const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  message: 'You have exceeded the 100 requests in 24 hrs limit!',
  headers: true,
});

module.exports = limiter;
