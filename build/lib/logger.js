"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Import Winston Daily Rotate File
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, printf, colorize, align, json } = winston_1.default.format;
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
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
    verbose: 'cyan',
    debug: 'white',
    silly: 'gray'
};
winston_1.default.addColors(colors);
const format = combine(timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A'
}), align(), json(), printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`));
const combinedFileRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d'
});
const errorFileRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error'
});
const warningFileRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/warn-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'warn'
});
const infoFileRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'info'
});
const transports = [
    new winston_1.default.transports.Console({
        format: combine(colorize({
            all: true
        }))
    }),
    combinedFileRotateTransport,
    errorFileRotateTransport,
    warningFileRotateTransport,
    infoFileRotateTransport
];
const Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports
});
exports.default = Logger;
