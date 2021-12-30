// Logger adapted from a side project
const winston = require('winston');

winston.add(new winston.transports.Console({
  format: winston.format.cli(),
}));

module.exports = winston;