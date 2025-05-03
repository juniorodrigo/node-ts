import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
	PORT: z.string().default('3000'),
});

const _env = envSchema.parse(process.env);

export const env = {
	port: _env.PORT,
};
