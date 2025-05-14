# FS_ISI_TEST_BEN_ADELIO_ALVARO

# Todo Application

A full-stack todo application built with React (frontend) and Python (backend). This application allows users to create, read, update, and delete todo items.

## Tech Stack

### Frontend

- React with TypeScript
- Vite as build tool
- TailwindCSS for styling

### Backend

- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL database
- Pydantic for data validation

## Prerequisites

- Docker and Docker Compose (for containerized setup)
- Node.js and npm (for local frontend development)
- Python 3.8+ (for local backend development)
- PostgreSQL (for local database)

## Running with Docker

The easiest way to run the application is using Docker Compose:

1. Clone the repository

   ```bash
   git clone https://github.com/BenZeta/FS_ISI_TEST_BEN_ADELIO_ALVARO.git
   cd https://github.com/BenZeta/FS_ISI_TEST_BEN_ADELIO_ALVARO.git
   ```

2. Configure environment variables:

   - Copy `.env.example` to `.env` in both frontend and backend directories

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. Build and run the containers

   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Running Locally

### PostgreSQL Setup (Required for Backend)

1. Install PostgreSQL if you haven't already:

   - macOS: `brew install postgresql` (using Homebrew) or download from postgresql.org
   - Windows: Download installer from postgresql.org
   - Ubuntu: `sudo apt install postgresql postgresql-contrib`

2. Start PostgreSQL service:

   - macOS: `brew services start postgresql`
   - Windows: PostgreSQL should run as a service automatically
   - Ubuntu: `sudo service postgresql start`

3. Create a database:

   ```bash
   # Log in as postgres user
   psql -U postgres

   # Inside PostgreSQL prompt, create the database
   CREATE DATABASE todo_db;

   # You can exit with \q
   ```

4. Make sure the PostgreSQL credentials in your `.env` file match your local setup.

### Backend Setup

1. Navigate to the backend directory

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables

   ```bash
   cp .env.example .env
   # Edit .env to match your PostgreSQL settings if needed
   ```

5. Start the backend server
   ```bash
   uvicorn src.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   # By default, it points to http://localhost:8000 for the API
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Access the frontend at http://localhost:5173

### PostgreSQL Connection Errors

If you see an error like:

```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) connection to server at "localhost" (::1), port 5432 failed: Connection refused
```

This means PostgreSQL is not running or not accessible. Try these steps:

1. Verify PostgreSQL is running:

   ```bash
   # macOS
   brew services list

   # Ubuntu
   sudo service postgresql status

   # Windows
   # Check in Services application
   ```

2. Make sure your PostgreSQL credentials match those in `backend/.env`

3. If you're using a custom PostgreSQL configuration, update the connection details in `.env`:
   ```
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_database_name
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   ```

## API Endpoints

The backend provides the following RESTful endpoints:

- `GET /todos`: Get all todos (with optional query param `completed=true/false`)
- `GET /todos/{todo_id}`: Get a specific todo
- `POST /todos`: Create a new todo
- `PUT /todos/{todo_id}`: Update a todo
- `DELETE /todos/{todo_id}`: Delete a todo

API documentation is available at http://localhost:8000/docs when the backend is running.

## Project Structure

- `/frontend`: React frontend application
- `/backend`: FastAPI backend application
  - `/src`: Source code
    - `/api`: API routes
    - `/database`: Database setup and connection
    - `/models`: SQLAlchemy models
    - `/schemas`: Pydantic schemas
    - `/services`: Business logic
