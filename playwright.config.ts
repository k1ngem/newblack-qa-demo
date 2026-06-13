import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
  reporter: 'list',
});