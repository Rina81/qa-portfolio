import { test, expect } from '@playwright/test';   // tools from Playwright

test('list of bookings is returned', async ({ request }) => {
  // "request" = Playwright's built-in HTTP client. No browser opens.
  const response = await request.get('/booking');   // send GET to baseURL + /booking

  expect(response.status()).toBe(200);              // check 1: the status code

  const body = await response.json();               // read the body as JSON
  expect(Array.isArray(body)).toBe(true);           // check 2: it is a list
  expect(body.length).toBeGreaterThan(0);           // check 3: the list is not empty
  expect(body[0]).toHaveProperty('bookingid');   // check 4: the first item has an 'id' property
  
});