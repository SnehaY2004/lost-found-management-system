# Lost & Found Item Management System

A MERN stack application for managing lost and found items in a college campus.

## Features

- User registration and login
- Report lost items
- Report found items
- View all reported items
- Search items by name
- Update and delete own entries
- Secure logout

## Tech Stack

- **Frontend:** React with Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up MongoDB and update `.env` in backend
5. Start backend: `cd backend && npm run dev`
6. Start frontend: `cd frontend && npm run dev`

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Items

- POST /api/items (Add item)
- GET /api/items (View all)
- GET /api/items/:id (View by ID)
- PUT /api/items/:id (Update)
- DELETE /api/items/:id (Delete)
- GET /api/items/search?name=xyz (Search)
