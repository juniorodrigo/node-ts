import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import responseMiddleware from './response.js';
import errorHandler from './error.js';
import compression from 'compression';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100,
	message: 'Demasiados requests desde esta IP',
	standardHeaders: true,
	legacyHeaders: false,
});

export const configureMiddlewares = (app: express.Application): void => {
	// Middlewares de seguridad
	app.use(limiter);
	app.use(
		compression({
			filter: (req: express.Request, res: express.Response) => {
				if (req.headers['x-no-compression']) return false;
				return compression.filter(req, res);
			},
			level: 6,
			threshold: 1024,
		})
	);
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", "'unsafe-inline'"],
					// Para Swagger
					styleSrc: ["'self'", "'unsafe-inline'"],
					imgSrc: ["'self'", 'data:', 'https:'],
				},
			},
			crossOriginEmbedderPolicy: false,
		})
	);
	app.use(
		cors({
			origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);

	// Middlewares de parsing
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// Middleware de respuesta personalizado
	app.use(responseMiddleware);
};

export { errorHandler };
