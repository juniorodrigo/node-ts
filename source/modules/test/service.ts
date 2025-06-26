import type { ServiceResponse } from '@/types/service.js';
import type { Test, TestResponse } from './schemas.js';

async function getTestData(data: Test): Promise<ServiceResponse<TestResponse>> {
	// Simulate fetching data, e.g., from a database or an external API
	return { message: 'Test data retrieved successfully!', data: { youAreA: 'idiot' } };
}

export const TestService = {
	getTestData,
};
