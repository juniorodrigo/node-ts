import { type RequestHandler, type CookieOptions } from 'express';
import type { CookieConfig, ResponseWithCookies } from 'src/types/cookies.js';

// Configuraciones por defecto para cookies
const defaultCookieOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict',
	maxAge: 24 * 60 * 60 * 1000, // 24 horas por defecto
};

// Función auxiliar para procesar cookies
const processCookies = (res: any, responseData?: ResponseWithCookies) => {
	if (responseData?.cookies) {
		responseData.cookies.forEach(({ name, value, options }) => {
			const cookieOptions = { ...defaultCookieOptions, ...options };
			res.cookie(name, value, cookieOptions);
		});
	}

	if (responseData?.clearCookies) {
		responseData.clearCookies.forEach((cookieName) => {
			res.clearCookie(cookieName);
		});
	}
};

const responseMiddleware: RequestHandler = (req, res, next) => {
	res.success = (data = null, message = 'success', responseOptions?: ResponseWithCookies) => {
		try {
			// Procesar cookies antes de enviar la respuesta
			processCookies(res, responseOptions);

			const response: { success: boolean; data?: unknown; message?: string; resultsCount?: number } = {
				success: true,
				message,
			};

			if (data !== null) {
				response.data = data;
			}

			if (message) response.message = message;

			// Calcular automáticamente resultsCount si data es un array
			if (Array.isArray(data)) {
				response.resultsCount = data.length;
			}

			logger.info(`Success - ${req.method} ${req.url}`, {
				data,
				cookies: responseOptions?.cookies?.map((c) => ({ name: c.name, hasValue: !!c.value })),
				clearedCookies: responseOptions?.clearCookies,
			});

			return res.status(200).json(response);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			const errorStack = error instanceof Error ? error.stack : null;
			logger.error(`Error in res.success - ${req.method} ${req.url}`, { error: errorMessage, stack: errorStack });
			throw error;
		}
	};

	res.error = (error: Error | string, statusCode = 400, responseOptions?: ResponseWithCookies) => {
		// Procesar cookies antes de enviar la respuesta de error
		processCookies(res, responseOptions);

		const errorMessage = typeof error === 'string' ? error : error.message;
		const stack = error instanceof Error ? error.stack : null;

		const response = {
			success: false,
			message: errorMessage,
			stack: process.env.NODE_ENV === 'production' ? null : stack,
		};

		logger.error(`Error - ${req.method} ${req.url}`, {
			errorMessage,
			stack,
			cookies: responseOptions?.cookies?.map((c) => ({ name: c.name, hasValue: !!c.value })),
			clearedCookies: responseOptions?.clearCookies,
		});

		return res.status(statusCode).json(response);
	};

	// Métodos de conveniencia para manejar cookies
	res.setCookie = (name: string, value: string, options?: CookieOptions) => {
		const cookieOptions = { ...defaultCookieOptions, ...options };
		res.cookie(name, value, cookieOptions);
		return res;
	};

	res.setSecureCookie = (name: string, value: string, options?: CookieOptions) => {
		const secureOptions = {
			...defaultCookieOptions,
			httpOnly: true,
			secure: true,
			sameSite: 'strict' as const,
			...options,
		};
		res.cookie(name, value, secureOptions);
		return res;
	};

	res.removeCookie = (name: string, options?: CookieOptions) => {
		res.clearCookie(name, options);
		return res;
	};

	next();
};

// Exportar interfaces para uso en otros módulos
export type { CookieConfig, ResponseWithCookies };

export default responseMiddleware;
