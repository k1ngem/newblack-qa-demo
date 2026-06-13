import { test, expect } from '@playwright/test';

test.describe('Health', () => {

  test('health check - API is up and running', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.status()).toBe(201);
  });

});