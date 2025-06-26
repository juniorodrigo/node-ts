import 'express';

declare global {
	namespace Express {
		interface Response {
			success(data?: unknown, message?: string, resultsCount?: number): this;
			error(error: Error | string, statusCode?: number): this;
		}
	}
}

export {};
