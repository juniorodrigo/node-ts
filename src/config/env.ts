import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
	PORT: z.string().default('3000'),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
	FIREBASE_BUCKET_NAME: z.string().default('gs://unggafb.appspot.com'),
	FIREBASE_PROJECT_ID: z.string().default('unggafb'),
	FIREBASE_APP_NAME: z.string().default('ungga'),
});

const _env = envSchema.parse(process.env);

export const env = {
	port: _env.PORT,
	nodeEnv: _env.NODE_ENV,
	logLevel: _env.LOG_LEVEL,
	firebase: {
		bucketName: _env.FIREBASE_BUCKET_NAME,
		projectId: _env.FIREBASE_PROJECT_ID,
		appName: _env.FIREBASE_APP_NAME,
	},
};
