import { type Request, type Response, type NextFunction } from 'express';
import { logger } from './response.js';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
	if (res.headersSent) return next(err);

	// Si es un error operacional, lo manejamos
	if (err.isOperational) {
		logger.error(` ${req.method} ${req.path} | ${err.message}`, {
			error: err.message,
			stack: err.stack,
		});
		return res.status(err.statusCode ?? 400).json({
			success: false,
			message: err.message,
		});
	}

	logger.error(` ${req.method} ____ ${req.url}`, { error: err.message, stack: err.stack });

	// Si no es un error operacional, lo logueamos y respondemos con un error genérico
	return res.status(500).json({
		success: false,
		message: 'Ha ocurrido un error interno. Intenta más tarde.',
	});
}

export default errorHandler;
