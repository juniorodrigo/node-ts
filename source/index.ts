import 'express-async-errors';
import { env } from './config/env.js';
import express from 'express';
import type { Express } from 'express';
import router from './routes.js';
import { configureMiddlewares, errorHandler } from './middlewares/index.js';
import { swaggerUi, specs } from '@/config/swagger.js';

const app: Express = express();

// Middlewares
configureMiddlewares(app);

// Swagger Documentation
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(specs, {
		explorer: true,
		customCss: '.swagger-ui .topbar { display: none }',
		customSiteTitle: 'Auth Management API Documentation',
		swaggerOptions: {
			docExpansion: 'none',
			filter: true,
			showRequestHeaders: true,
		},
	})
);

// Endpoint para servir el JSON de OpenAPI
app.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(specs);
});

// Routes
app.use('/', router);

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

app.listen(env.port, () => {
	console.log(`[server]: Server is running at http://localhost:${env.port}`);
});
