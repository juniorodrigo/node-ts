import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import responseMiddleware from './response.js';
import errorHandler from './error.js';

export const configureMiddlewares = (app: express.Application): void => {
	// Middlewares de seguridad
	app.use(helmet());
	app.use(cors());

	// Middlewares de parsing
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// Middleware de respuesta personalizado
	app.use(responseMiddleware);
};

export { errorHandler };
