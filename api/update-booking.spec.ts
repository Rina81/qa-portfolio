import { test, expect } from '@playwright/test'; 
test('update a booking', async ({ request }) => {

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

  const authResponse = await request.post('/auth', {
  data: { username: 'admin', password: 'password123' },
});

const token = (await authResponse.json()).token;        

const updatedBooking = {
  firstname: 'Jim',
  lastname: 'Green',          // changed
  totalprice: 222,            // changed
  depositpaid: true,
  bookingdates: { checkin: '2026-01-01', checkout: '2026-01-02' },
};

const putResponse = await request.put(`/booking/${id}`, {
  data: updatedBooking,
  headers: { Cookie: `token=${token}` },
});
console.log(putResponse.status(), await putResponse.json());   // LOOK first

 const response2 = await request.get(`/booking/${id}`);
console.log(await response2.json());
expect(response2.status()).toBe(200);  // check that the booking was retrieved successfully
const responseBody2 = await response2.json();
expect(responseBody2.firstname).toBe(updatedBooking.firstname);
expect(responseBody2.lastname).toBe(updatedBooking.lastname);
expect(responseBody2.totalprice).toBe(updatedBooking.totalprice);

});