const winston = require("winston");
const expressWinston = require("express-winston");

/**
 * Функция регистрации запросов. Сохраняет в файл request.log
 */
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

/**
 * Функция регистрации ошибок. Сохраняет в файл error.log
 */
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
