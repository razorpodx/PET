'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const winston_1 = __importDefault(require('winston'));
require('winston-daily-rotate-file');
const { combine, timestamp, printf, colorize, align, json } =
  winston_1.default.format;
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  verbose: 5,
  silly: 6
};
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
  verbose: 'cyan',
  silly: 'gray'
};
winston_1.default.addColors(colors);
const format = combine(
  colorize({ all: true }),
  timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A'
  }),
  align(),
  json(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);
const fileRotateTransport = new winston_1.default.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
});
const transports = [
  new winston_1.default.transports.Console(),
  fileRotateTransport
];
const Logger = winston_1.default.createLogger({
  level: level(),
  levels,
  format,
  transports
});
exports.default = Logger;
