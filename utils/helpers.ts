import { APIRequestContext } from '@playwright/test';
import { testBooking } from '../data/testData';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  const body = await response.json();
  return body.token;
}

export async function createBooking(request: APIRequestContext): Promise<number> {
  const response = await request.post('/booking', {
    data: testBooking
  });

  const body = await response.json();
  return body.bookingid;
}