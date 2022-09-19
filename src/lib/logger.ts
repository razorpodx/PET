import winston from 'winston';
// Import Winston Daily Rotate File
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, printf, colorize, align, json } = winston.format;

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

winston.addColors(colors);

const format = combine(
	timestamp({
		format: 'YYYY-MM-DD hh:mm:ss.SSS A'
	}),
	align(),
	json(),
	printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`)
);

const combinedFileRotateTransport = new DailyRotateFile({
	filename: 'logs/combined-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d'
});

const errorFileRotateTransport = new DailyRotateFile({
	filename: 'logs/error-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d',
	level: 'error'
});

const warningFileRotateTransport = new DailyRotateFile({
	filename: 'logs/warn-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d',
	level: 'warn'
});

const infoFileRotateTransport = new DailyRotateFile({
	filename: 'logs/info-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d',
	level: 'info'
});

const transports = [
	new winston.transports.Console({
		format: combine(
			colorize({
				all: true
			})
		)
	}),
	combinedFileRotateTransport,
	errorFileRotateTransport,
	warningFileRotateTransport,
	infoFileRotateTransport
];

const Logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports
});

export default Logger;
