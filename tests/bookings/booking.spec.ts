import { test, expect } from '@playwright/test';
import { getAuthToken, createBooking } from '../../utils/helpers';
import { testBooking, updatedBooking } from '../../data/testData';

test.describe('Bookings', () => {

  test('get all bookings - returns a list of bookings', async ({ request }) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('create a booking - returns new booking with ID', async ({ request }) => {
    const response = await createBooking(request);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe(testBooking.firstname);
    expect(body.booking.lastname).toBe(testBooking.lastname);
  });

  test('get a specific booking by ID', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;

    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(testBooking.firstname);
    expect(body.lastname).toBe(testBooking.lastname);
    expect(body.totalprice).toBe(testBooking.totalprice);
  });

  test('update a booking - changes are reflected', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;
    const token = await getAuthToken(request);

    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      },
      data: updatedBooking
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.totalprice).toBe(updatedBooking.totalprice);
    expect(body.additionalneeds).toBe(updatedBooking.additionalneeds);
  });

  test('delete a booking - booking no longer exists', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;
    const token = await getAuthToken(request);

    const deleteResponse = await request.delete(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('create a booking - fails without required fields', async ({ request }) => {
    const response = await request.post('/booking', {
      data: {
        firstname: 'Ron'
        // missing lastname, totalprice, depositpaid, bookingdates
      }
    });

    expect(response.status()).toBe(500);
  });

  test('get a booking - returns 404 for non-existent ID', async ({ request }) => {
    const response = await request.get('/booking/999999999');
    expect(response.status()).toBe(404);
  });

  test('update a booking - fails without auth token', async ({ request }) => {
    const createResponse = await createBooking(request);
    const bookingId = (await createResponse.json()).bookingid;

    const response = await request.put(`/booking/${bookingId}`, {
      data: updatedBooking
    });

    expect(response.status()).toBe(403);
  });

});