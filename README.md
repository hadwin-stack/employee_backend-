# Employee Backend

A simple Express.js and MongoDB backend for managing employee records.

## Overview

This project exposes a REST API for creating, reading, updating, and deleting employee data. It is designed to work with a frontend application and serves static files from the dist/Frontend folder when needed.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB Atlas or a local MongoDB instance available
- npm installed

## Installation

1. Open a terminal in the project folder.
2. Install dependencies:

   npm install

3. Update the MongoDB connection string in app.js:

   - Find the MONGO_URI value
   - Replace it with your MongoDB Atlas connection string or local MongoDB URI

4. Start the server:

   node app.js

The server runs on port 3000 by default.

## API Endpoints

### Get all employees

- Method: GET
- Endpoint: /api/employeelist
- Response: Returns an array of employee records

### Get employee by ID

- Method: GET
- Endpoint: /api/employeelist/:id
- Response: Returns a single employee record

### Create employee

- Method: POST
- Endpoint: /api/employeelist
- Request body:

  {
    "name": "John Doe",
    "location": "New York",
    "position": "Developer",
    "salary": 50000
  }

- Response: Returns the created employee record

### Update employee

- Method: PUT
- Endpoint: /api/employeelist
- Request body:

  {
    "_id": "employee_id_here",
    "name": "John Doe",
    "location": "Chicago",
    "position": "Senior Developer",
    "salary": 65000
  }

- Response: Returns the updated employee record

### Delete employee

- Method: DELETE
- Endpoint: /api/employeelist/:id
- Response: Returns a success message and deleted record

## Notes

- Static frontend files are served from the dist/Frontend directory.
- The app listens on port 3000.
- If the MongoDB connection fails, check your connection string and network access.

## Example Usage

You can test the API using Postman, curl, or your frontend application.

Example curl request to create an employee:

curl -X POST http://localhost:3000/api/employeelist \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","location":"New York","position":"Developer","salary":50000}'

## Project Status

This backend provides a working CRUD API for employee management and is ready to connect with a frontend interface.
