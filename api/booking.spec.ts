import { test, expect } from '@playwright/test';   // tools from Playwright
test('create a booking', async ({ request }) => {
  const newBooking = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2026-01-01', checkout: '2026-01-02' },
  };

  const response = await request.post('/booking', { data: newBooking }); // send JSON body
  expect(response.status()).toBe(200);  // check that the booking was created successfully
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('bookingid');  // check that the response contains a booking ID
  const id = responseBody.bookingid;
   const response2 = await request.get('/booking/' + id);  // retrieve the newly created booking by ID
   expect(response2.status()).toBe(200);  // check that the booking was retrieved successfully
   const booking = await response2.json();
   expect(booking.firstname).toBe(newBooking.firstname);
   expect(booking.lastname).toBe(newBooking.lastname);
   expect(booking.totalprice).toBe(newBooking.totalprice);
   expect(booking.depositpaid).toBe(newBooking.depositpaid);
   expect(booking.bookingdates).toEqual(newBooking.bookingdates);
});