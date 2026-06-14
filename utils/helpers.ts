import { APIRequestContext, APIResponse } from '@playwright/test';
import { testBooking } from '../data/testData';
import * as dotenv from 'dotenv';

dotenv.config();

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/auth', {
    data: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    }
  });

  const body = await response.json();
  return body.token;
}


export async function createBooking(request: APIRequestContext): Promise<APIResponse> {
  return await request.post('/booking', {
    data: testBooking
  });
}