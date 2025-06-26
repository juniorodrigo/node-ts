import 'express';

declare global {
	namespace Express {
		interface Response {
			success(message?: string, data?: unknown): this;
			error(error: Error | string, statusCode?: number): this;
		}
	}
}

export {};
