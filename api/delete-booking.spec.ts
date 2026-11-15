import { test, expect } from '@playwright/test'; 
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
// 1. log in: ask for a token
const authResponse = await request.post('/auth', {
  data: { username: 'admin', password: 'password123' },
});
console.log(authResponse.status(), await authResponse.json());   // LOOK first
const token = (await authResponse.json()).token;                 // check the field name in the output
console.log(token);

// 2. delete the booking, proving who you are with the token
const deleteResponse = await request.delete(`/booking/${id}`, {
  headers: { Cookie: `token=${token}` },
});
expect(deleteResponse.status()).toBe(201);  // check that the booking was deleted successfully
 const response2 = await request.get('/booking/' + id);  // retrieve the newly created booking by ID

expect(response2.status()).toBe(404);  // check that the booking no longer exists

});
