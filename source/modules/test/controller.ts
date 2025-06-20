import type { Request, Response } from 'express';
import { TestService } from './service.js';

export async function testController(req: Request, res: Response) {
	try {
		const data = await TestService.getTestData();
		res.status(200).json(data);
	} catch (error) {
		console.error('Error fetching test data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
