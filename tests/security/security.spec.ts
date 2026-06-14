import { test, expect } from '@playwright/test';
import { createBooking } from '../../utils/helpers';

test.describe('Security', () => {

  test('security observation - unauthenticated users can retrieve all bookings', async ({ request }) => {
    // NOTE: This endpoint returns all booking data without authentication.
    // In a production system like EVA, this should require auth to protect customer data.
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
  });

  test('security observation - unauthenticated users can retrieve specific booking details', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;

    // NOTE: Individual booking details including personal data accessible without auth.
    // In a production system this should be protected.
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
  });

  test('invalid token is rejected on protected actions', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;

    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        'Cookie': 'token=invalid_token_string_12345'
      },
      data: {
        firstname: 'Ron',
        lastname: 'Burgundy',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-08-01',
          checkout: '2026-08-07'
        },
        additionalneeds: 'Lunch'
      }
    });

    expect(response.status()).toBe(403);
  });

});