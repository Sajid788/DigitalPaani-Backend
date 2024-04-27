# DigitalPaani-Backend

DigitalPaani Backend is a Node.js application serving as the backend for the DigitalPaani project. It offers APIs for book management, user authentication, and authorization through JSON Web Tokens (JWT). Password encryption is ensured with bcrypt for heightened security.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT
- Bcrypt

## Features
- User authentication with JWT
- CRUD operations for managing book entries (Create, Read, Update, Delete)
- Filtering books by author or publication year
- Pagination  by page and limit

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Sajid788/DigitalPaani-Backend.git
   ```

   . Navigate to the project directory:

   ```bash
   cd DigitalPaani-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
### API Endpoints

#### Authentication

- `POST /user/register`: Register a new user. Requires a JSON body with `name`, `email` and `password` fields.
- `POST /user/login`: Login in with existing user credentials. Requires a JSON body with `email` and `password` fields.

#### Book Management

- `GET /book`: Get all book entries.
- `GET /book/:id`: Get a single book entry by ID.
- `POST/book`: Create a new book entry. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `PATCH /book/:id`: Update a book entry by ID. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `DELETE /book/:id`: Delete a book entry by ID.

- `Filter url/book?author=author name here` : Get a list of books with filtering by author
- `Filter By publicationYear url/book?year=2020` : Get a list of books with Filtering books by publication year.
- `Pagination url/book?page=1&limit=10` : Get a list of books by pagination using {page} & {limit} both values are dynamic.

#### Authorization

Protected routes require a valid JWT token obtained through the `/auth/login` endpoint in the `Authorization` header.
