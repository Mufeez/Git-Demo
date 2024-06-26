import { test, expect } from '@playwright/test'
import { demoApiCall } from '../playwright-tests/tests/command'

test('make demo api call and assert the response', async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1'

  const response = await demoApiCall(url)
  console.log(JSON.stringify(response.data, null, 2))
  expect(response).toBeTruthy
  expect(response.status).toBeTruthy
  expect(response.status).toEqual(200)
})
