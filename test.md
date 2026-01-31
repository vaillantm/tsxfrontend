# Project Setup and Deployment Guide

This doc explains everything needed to run the backend (deployed) and configure the frontend to use it and display data (products, categories, etc.).

## Backend (Deployed on Render)

- Deployed Base URL
  - https://jsbackend-iw27.onrender.com

- Required REST routes (expected by the frontend services)
  - Auth
    - POST /api/auth/register
    - POST /api/auth/login
    - GET /api/auth/me
    - POST /api/auth/logout
  - Products
    - GET /api/products (list all)
    - GET /api/products/:id (by id)
    - POST /api/products (create)
    - PUT /api/products/:id (update)
    - DELETE /api/products/:id (delete)
    - Optional filter: GET /api/products?category=<slug>
  - Categories
    - GET /api/categories (list)
    - GET /api/categories/:id (by id)
    - POST /api/categories (create)
    - PUT /api/categories/:id (update)
    - DELETE /api/categories/:id (delete)
  - Cart
    - GET /api/cart (my cart)
    - POST /api/cart/add
    - POST /api/cart/quantity
    - POST /api/cart/remove
    - POST /api/cart/clear
  - Orders
    - GET /api/orders (list)
    - GET /api/orders/:id (by id)
    - POST /api/orders (create)
    - POST /api/orders/:id/cancel (cancel)

- CORS configuration (Render)
  - Allow origins: your local dev URL (e.g., http://localhost:5173) and your production frontend URL.
  - If using cookies, set CORS with credentials: true.

- Auth configuration
  - If using JWT in Authorization header: backend should accept `Authorization: Bearer <token>`.
  - If using cookies: set cookies as HttpOnly, SameSite and secure flags appropriately; keep withCredentials in the frontend.

- Health check
  - Ensure GET / returns OK or provide a /health route for Render.

## Frontend (Vite + React Query v5 + Axios)

- Install deps (already added)
  - @tanstack/react-query
  - axios

- Env variables (project root .env)
  - VITE_USE_MOCK=false
  - VITE_API_URL=https://jsbackend-iw27.onrender.com

- How to run locally
  - npm install
  - Create .env using values above
  - npm run dev
  - Visit:
    - /shop → loads products from backend
    - /shop/:type → loads products filtered by category (via `?category=<type>`)
    - /sign-in → login/register; TopBar shows "Hello, <username>"

- Where base URL is configured
  - src/services/api.ts uses `import.meta.env.VITE_API_URL`
  - Axios withCredentials is enabled
  - Authorization: token auto-attached from localStorage when logged in

- Switching between mock and live API
  - Mock mode ON by default unless VITE_USE_MOCK="false"
  - To force live API: set VITE_USE_MOCK=false in .env and restart dev server

- What was wired to the backend
  - Products
    - /shop page: fetches GET /api/products
    - /shop/:type page: fetches GET /api/products?category=<type>
  - Categories (hook-driven component)
    - `CategoryNavRemote` uses GET /api/categories
    - Replace any remaining `CategoryNav` imports with `CategoryNavRemote` to fetch live categories
  - Auth
    - Login/Register update localStorage and show greeting in TopBar

## Troubleshooting

- 404s or mismatched routes
  - Verify backend routes match the above. If different, update the corresponding service files under `src/services/`.

- CORS errors
  - Confirm Render CORS settings allow your frontend origin and credentials if using cookies.

- Auth-required data
  - If product/category listing requires auth, log in first at /sign-in. The token will be included automatically in requests.

## Where to change behavior

- Change API endpoints
  - Edit `src/services/*.ts`
- Change fetching behavior / caching
  - Edit `src/hooks/*.ts` (React Query)
- Change greeting / auth storage
  - Edit `src/context/AuthContext.tsx`
- Swap mock/live
  - Change `VITE_USE_MOCK` in `.env`

## Quick verification checklist

- [ ] `.env` created with live backend URL and VITE_USE_MOCK=false
- [ ] `/shop` shows data from backend
- [ ] `/shop/:type` shows filtered data from backend
- [ ] `FeaturedProducts` categories render via `CategoryNavRemote`
- [ ] Login/Register shows "Hello, <username>" in TopBar
- [ ] No CORS issues in browser console
