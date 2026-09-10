# Real Estate Platform

## Structure
## Fee logic (reference)
real-estate-platform/
frontend/          React + Vite app
src/
components/    Reusable UI pieces (Navbar, Hero, Categories, etc.)
pages/          Full pages (LandingPage, and more to come)
styles/         Global CSS + design tokens
api/            Functions for calling the backend
backend/            Node + Express API
src/
routes/         Express route definitions
controllers/    Route handler logic
models/         Database schemas
middleware/     Auth, validation, etc.
config/         DB connection, environment setup
- Booking fee: 10% of property price, required to book (account needed).
- Deal completes: 10% is applied to the remaining balance.
- Deal falls through: a flat 4% non-refundable fee is kept; 6% is refunded.

## Getting started

**Frontend**
cd frontend
npm install
npm run dev

**Backend**
cd backend
npm install
cp .env.example .env
npm run dev
