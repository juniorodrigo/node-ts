declare global {
	interface Error {
		statusCode?: number;
		isOperational?: boolean;
	}
}
export {};
