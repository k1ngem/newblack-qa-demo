export const testBooking = {
  firstname: 'Ron',
  lastname: 'Burgundy',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-01',
    checkout: '2026-08-05'
  },
  additionalneeds: 'Breakfast'
};

export const updatedBooking = {
  firstname: 'Ron',
  lastname: 'Burgundy',
  totalprice: 200,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-09-01',
    checkout: '2026-09-07'
  },
  additionalneeds: 'Lunch'

};
export const bookingMissingLastname = {
  firstname: 'Ron',
  // lastname intentionally omitted
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-01',
    checkout: '2026-08-05'
  },
  additionalneeds: 'Breakfast'
};

export const bookingWithInvalidDates = {
  firstname: 'Ron',
  lastname: 'Burgundy',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-10',
    checkout: '2026-08-01'
  },
  additionalneeds: 'Breakfast'
};