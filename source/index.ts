import 'express-async-errors';
import { env } from './config/env.js';
import express from 'express';
import type { Express } from 'express';
import router from './routes.js';
import { configureMiddlewares, errorHandler } from './middlewares/index.js';

const app: Express = express();

// Middlewares
configureMiddlewares(app);

// Routes
app.use('/', router);

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

app.listen(env.port, () => {
	console.log(`[server]: Server is running at http://localhost:${env.port}`);
});
