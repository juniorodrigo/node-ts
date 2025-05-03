import { env } from './config/env.js';
import express from 'express';
import type { Express } from 'express';
import bodyParser from 'body-parser';
import router from './routes.js';

const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

app.listen(env.port, () => {
	console.log(`[server]: Server is running at http://localhost:${env.port}`);
});
