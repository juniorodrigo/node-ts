import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import { type RequestHandler } from 'express';
import { fileURLToPath } from 'url';

// Crear equivalente a __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define las rutas para los archivos de logs en la raíz del proyecto
const logDirectory: string = path.join(__dirname, '../../logs');
const combinedLogPath: string = path.join(logDirectory, 'combined');
const errorLogPath: string = path.join(logDirectory, 'error');

// Crear las carpetas de logs si no existen
if (!fs.existsSync(combinedLogPath)) {
	fs.mkdirSync(combinedLogPath, { recursive: true });
}
if (!fs.existsSync(errorLogPath)) {
	fs.mkdirSync(errorLogPath, { recursive: true });
}

// Configuración del logger
const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => {
			return `${timestamp} [${level}]: ${message}`;
		})
	),
	transports: [
		new transports.Console(),
		new DailyRotateFile({
			filename: path.join(errorLogPath, 'error-%DATE%.log'),
			datePattern: 'DD-MM-YY',
			level: 'error',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '90d',
		}),
		new DailyRotateFile({
			filename: path.join(combinedLogPath, 'combined-%DATE%.log'),
			datePattern: 'DD-MM-YY',
			level: 'info',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '90d',
		}),
	],
});

const wistonMiddleware: RequestHandler = (req, res, next) => {
	res.success = (message = 'success', data = null) => {
		const response = {
			status: 'success',
			message,
			data,
		};

		logger.info(`Success - ${req.method} ${req.url}`, { data });

		return res.status(200).json(response);
	};

	res.error = (error: Error | string, statusCode = 500) => {
		const errorMessage = typeof error === 'string' ? error : error.message;
		const stack = error instanceof Error ? error.stack : null;

		const response = {
			status: 'error',
			error: errorMessage,
			stack: process.env.NODE_ENV === 'production' ? null : stack,
		};

		logger.error(`Error - ${req.method} ${req.url}`, { errorMessage, stack });

		return res.status(statusCode).json(response);
	};

	next();
};

export { logger, wistonMiddleware };
