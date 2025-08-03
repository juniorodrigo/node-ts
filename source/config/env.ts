import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
	PORT: z.string().default('3000'),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	DATABASE_URL: z.string(),
});

const _env = envSchema.parse(process.env);

export const env = {
	port: _env.PORT,
	nodeEnv: _env.NODE_ENV,
	databaseUrl: _env.DATABASE_URL,
};
