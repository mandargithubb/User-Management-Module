# User Management Application

A full-stack user management application built with Angular 21, NgRx, Bootstrap 5, Express, Prisma, and SQLite.

## Project Overview

This application provides a professional login flow and a user management dashboard for creating, listing, editing, and deleting users. The solution follows a clean layered architecture with a frontend Angular app and a backend Express API.

## Tech Stack

- Angular 21
- Node.js 24
- Express
- NgRx
- Bootstrap 5
- TypeScript
- Prisma ORM
- SQLite
- RxJS

## Architecture

Angular UI
  ↓
NgRx
  ↓
Effects
  ↓
API Services
  ↓
REST API
  ↓
Express
  ↓
Service
  ↓
Repository
  ↓
Database

## Folder Structure

- frontend/: Angular 21 application with standalone components and NgRx state
- backend/: Express API with Prisma and SQLite
- docs/: project documentation
- .github/workflows/: CI workflow scaffolding

## Installation

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

## Running

Start both apps together:

```bash
npm run dev
```

Start frontend only:

```bash
npm run frontend
```

Start backend only:

```bash
npm run backend
```

## Testing

```bash
npm run test
npm run test:frontend
npm run test:backend
```

## Build

```bash
npm run build
```

## Environment Variables

Backend uses a `.env` file based on `.env.example`:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me-in-production"
NODE_ENV=development
```

## Demo Credentials

Login with:

- Username: admin
- Password: admin123

## API Documentation

### Authentication

- POST /api/auth/login

Request body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Users

- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

## Design Decisions

- Angular uses standalone components and functional guards/interceptors.
- NgRx is used for auth and user state to keep the UI predictable.
- Express routes are thin and controllers delegate to service logic.
- Prisma keeps data access clean and database-agnostic.
- Bootstrap is used as the only UI framework for consistent responsive design.
