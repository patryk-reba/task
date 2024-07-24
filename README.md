# Todo List Application

This project is a full-stack Todo List application built with React for the frontend and Node.js with Express for the backend. It allows users to create, read, update, and delete todo items, as well as filter and sort them.

## Features

- Create new todo items with a title and due date
- Mark todo items as completed
- Edit existing todo items
- Delete todo items
- Filter todos by status (All, Active, Completed)
- Sort todos by due date
- Responsive design for both desktop and mobile devices

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS for styling
- React Testing Library & Vitest for testing
- Context API for state management

### Backend

- Node.js
- Express
- In-memory data storage (for simplicity, no database is used)

## Project Structure

The project is organized into two main directories:

### Frontend (`/frontend`)

- `src/components`: React components
- `src/context`: React Context for state management
- `src/hooks`: Custom React hooks
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions
- `src/services`: API service functions

### Backend (`/backend`)

- `index.js`: Main server file with Express configuration and routes

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation and Running the App

1. Clone the repository:

   ```
   git clone https://github.com/patryk-reba/task.git
   cd task
   ```

2. Set up and start the backend:

   ```
   cd backend
   npm install
   node index.js
   ```

   The backend will start on http://localhost:3001

3. In a new terminal, set up and start the frontend:

   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Open http://localhost:5173 to view the app in your browser.

### Running Tests

To run the frontend test suite:

```
cd frontend
npm run test
```

## Backend API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/todos`: Fetch all todos
- `POST /api/todos`: Create a new todo
- `PUT /api/todos/:id`: Update a todo
- `DELETE /api/todos/:id`: Delete a todo
