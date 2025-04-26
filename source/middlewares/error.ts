import { type Request, type Response, type NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal Server Error', error: err.message });
}

export default errorHandler;
