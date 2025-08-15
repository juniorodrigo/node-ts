import type { Request, Response } from 'express';
import { TestService } from './service.js';
import { customParse } from 'src/lib/zod.js';
import { ValidationError } from 'src/config/errors/errors.js';
import { TestSchema } from './schemas.js';

export async function testController(req: Request, res: Response) {
	const { body } = req;

	const validation = customParse(TestSchema, body);
	if (!validation.success) throw new ValidationError(validation.message);

	const { data, message } = await TestService.getTestData(body);
	res.success(data, message);
}
