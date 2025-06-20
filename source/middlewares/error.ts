import { type Request, type Response, type NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
	if (res.headersSent) return next(err);

	// Si es un error operacional, lo manejamos
	if (err.isOperational) {
		return res.status(err.statusCode ?? 400).json({
			success: false,
			message: err.message,
		});
	}

	console.error(err);

	// if (typeof res.error === 'function') {
	// 	return res.error(err.message || err, err.statusCode || 500);
	// }

	// Si no es un error operacional, lo logueamos y respondemos con un error genérico
	return res.status(500).json({
		success: false,
		message: 'Ha ocurrido un error interno. Intenta más tarde.',
	});
}

export default errorHandler;
