import pino from 'pino';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { env } from './env.js';

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

// Obtener configuración del entorno
const logLevel = env.logLevel;
const isDev = env.nodeEnv === 'development';

// console.log('Logger config:', { NODE_ENV: env.nodeEnv, isDev, logLevel });

// Configuración de transports para Pino
const pinoConfig: pino.LoggerOptions = {
	level: logLevel,
	transport: isDev
		? {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'HH:MM:ss dd-mm-yyyy',
					ignore: 'pid,hostname',
					messageFormat: '{msg}',
				},
		  }
		: {
				targets: [
					// Transport para archivo de logs combinados
					{
						target: 'pino/file',
						level: 'info',
						options: {
							destination: path.join(
								combinedLogPath,
								`combined-${new Date()
									.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
									.replace(/\//g, '-')}.log`
							),
							mkdir: true,
						},
					},

					// Transport para archivo de logs de errores
					{
						target: 'pino/file',
						level: 'error',
						options: {
							destination: path.join(
								errorLogPath,
								`error-${new Date()
									.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
									.replace(/\//g, '-')}.log`
							),
							mkdir: true,
						},
					},
				],
		  },
};

// Crear el logger
const logger = pino(pinoConfig);

// Función para crear un logger global
const createGlobalLogger = () => {
	const globalLogger = {
		// Métodos estándar de Pino
		trace: (message: string, meta?: any) => {
			if (meta) {
				logger.trace(meta, message);
			} else {
				logger.trace(message);
			}
		},
		debug: (message: string, meta?: any) => {
			if (meta) {
				logger.debug(meta, message);
			} else {
				logger.debug(message);
			}
		},
		info: (message: string, meta?: any) => {
			if (meta) {
				logger.info(meta, message);
			} else {
				logger.info(message);
			}
		},
		warn: (message: string, meta?: any) => {
			if (meta) {
				logger.warn(meta, message);
			} else {
				logger.warn(message);
			}
		},
		error: (message: string, meta?: any) => {
			if (meta) {
				logger.error(meta, message);
			} else {
				logger.error(message);
			}
		},
		fatal: (message: string, meta?: any) => {
			if (meta) {
				logger.fatal(meta, message);
			} else {
				logger.fatal(message);
			}
		},

		// Método personalizado para logs de desarrollo
		log: (message: string, ...args: any[]) => {
			if (isDev) {
				logger.debug({ args }, message);
			}
		},

		// Método para logs de éxito
		success: (message: string, meta?: any) => {
			const logData = { success: true, ...meta };
			logger.info(logData, message);
		},

		// Método para request logging
		request: (method: string, url: string, meta?: any) => {
			const logData = { request: true, method, url, ...meta };
			logger.info(logData, `${method} ${url}`);
		},

		// Método para response logging
		response: (method: string, url: string, statusCode: number, meta?: any) => {
			const logData = { response: true, method, url, statusCode, ...meta };
			const level = statusCode >= 400 ? 'error' : 'info';
			if (level === 'error') {
				logger.error(logData, `${method} ${url} - ${statusCode}`);
			} else {
				logger.info(logData, `${method} ${url} - ${statusCode}`);
			}
		},
	};

	return globalLogger;
};

// Crear el logger global
const globalLogger = createGlobalLogger();

// Hacer el logger disponible globalmente
declare global {
	var logger: typeof globalLogger;
}

// Asignar a global
globalThis.logger = globalLogger;

// También exportar para uso directo si es necesario
export default globalLogger;
