# Portfolio Backend API

This project is the backend API for a personal portfolio website, built with Node.js, Express, and MongoDB.

## Objective

Create a Node.js + Express backend for a personal portfolio website. The backend will expose RESTful APIs for managing education, skills, projects, and work experiences, store data in MongoDB, enable CORS, and follow clean backend architecture and Git workflow best practices. Finally, integrate the backend with the frontend React application.

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- CORS
- Git (GitHub)
- Postman (for testing)

## Prerequisites

- Node.js (e.g., v18 or later)
- npm (usually comes with Node.js)
- MongoDB (either a local instance or a cloud service like MongoDB Atlas)

## Setup and Installation

1.  **Clone the repository (if applicable later when you push to GitHub):**
    ```bash
    # git clone <your-repo-url>
    # cd portfolio-backend
    ```

2.  **Install dependencies:**
    From the root `portfolio-backend` directory, run:
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory (`portfolio-backend/`) and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
    # For frontend integration later:
    # REACT_APP_API_URL=http://localhost:5000
    ```
    Replace `YOUR_MONGODB_CONNECTION_STRING` with your actual MongoDB connection string.

## Running the Application

To run the application in development mode (with auto-reloading via nodemon):
```bash
npm run dev