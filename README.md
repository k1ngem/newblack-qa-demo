# Restful Booker API Test Suite

A Playwright API test suite targeting [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) — a practice hotel booking API. Built as a demo project to showcase API test automation using Playwright and TypeScript.

---

## tl;dr

```bash
npm install
npx playwright test
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
npm install
npx playwright install
```

### Running Tests

Run the full suite:

```bash
npx playwright test
```

Run a specific folder:

```bash
npx playwright test tests/bookings
npx playwright test tests/health
npx playwright test tests/security
```

View the HTML report after a run:

```bash
npx playwright show-report
```

---

## Project Structure

```
newblack-qa-demo/
├── tests/
│   ├── health/
│   │   └── health.spec.ts        # API availability check
│   ├── bookings/
│   │   └── booking.spec.ts      # CRUD operations and negative cases
│   └── security/
│       └── security.spec.ts      # Auth and security observations
├── utils/
│   └── helpers.ts                # Reusable functions (auth token, booking creation)
├── data/
│   └── testData.ts               # Centralised test data
├── playwright.config.ts          # Base URL and shared request headers
└── package.json
```

---

## Test Plan

### `health/health.spec.ts`
Validates the API is up and returning a healthy response. A fast smoke check and if this fails, nothing else will work.

### `bookings/bookings.spec.ts`
Core CRUD coverage for the bookings API:

| Test | Description |
|------|-------------|
| Get all bookings | Returns a non-empty list |
| Create a booking | POST with valid data returns a booking ID |
| Get a specific booking | Retrieves correct data by ID |
| Update a booking | PUT with auth reflects changes |
| Delete a booking | Booking returns 404 after deletion |
| Create without required fields | Missing data returns 500; a 400 would be more appropriate for invalid input |
| Create with invalid date range | Checkout before checkin is accepted (200); should be rejected in production |
| Get non-existent ID | Returns 404 for unknown booking |
| Update without auth token | Returns 403 without authentication |

### `security/security.spec.ts`
Covers authentication and flags security observations:

| Test | Description |
|------|-------------|
| Unauthenticated GET all bookings | **Observation:** all booking data accessible without auth — should be protected in production |
| Unauthenticated GET specific booking | **Observation:** personal data (name, price) exposed without auth — should be protected in production |
| Invalid token rejected | Confirms protected endpoints return 403 with invalid token |

---

## Key Design Decisions

**Centralized test data (`data/testData.ts`)**
All test data lives in one place. If names, dates, or pricing need to change, there is one file to update rather than hunting through every test.

**Reusable helpers (`utils/helpers.ts`)**
`getAuthToken` and `createBooking` are shared functions used across multiple test files. Follows the DRY principle of don't repeat yourself.

**Tests separated by concern**
Health, bookings, and security live in separate folders. Each folder has a clear purpose and can be run independently.

**Security observations as explicit tests**
Rather than ignoring gaps in the API's auth model, they are documented as failing-by-design observations. In a production system like a unified commerce platform, unauthenticated access to booking and customer data would be a critical issue.

---

## What I Would Add Next

- Filter/search coverage for GetBookingIds (firstname, lastname, date range), using uniquely-generated test data to avoid collisions with other bookings in this shared API
- afterEach cleanup to delete test bookings created during a run
- Environment variables for credentials instead of hardcoded values in helpers
- Performance assertions on response times for critical endpoints
- CI pipeline config (GitHub Actions) to run the suite on every pull request
- Partial update tests using PATCH in addition to PUT
- Concurrent request tests to check for race conditions on booking creation

---

## Technology

- [Playwright](https://playwright.dev/) — test framework and API request handling
- [TypeScript](https://www.typescriptlang.org/) — type safety and modern JS features
- [Node.js](https://nodejs.org/) — runtime environment
