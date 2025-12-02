const expressWinston = require("express-winston");
const winston = require("winston");
const path = require("path");

// Guarda logs en backend/logs/request.log
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/request.log"),
    }),
  ],
  format: winston.format.json(),
});

// Guarda errores en backend/logs/error.log
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
