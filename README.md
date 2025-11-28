# Mentor Review Backend

An Express-based REST API that provides a lightweight backend for managing mentors, recommendations, reviews, and users using file-based JSON storage. This repository is intended as a small demo / learning project and a starting point for building a simple mentorship review system.

**Key features:**

- **RESTful API endpoints** for mentors, recommendations, reviews, and users.
- **File-based data store** using JSON files located in the `data/` folder (no external database required).
- **Modular structure** with separated `controllers`, `models`, `routes`, and `utils` for easy extension.

**Tech stack:**

- Node.js (JavaScript)
- Express
- Plain JSON files as persistent storage

**Getting started**

Prerequisites:

- Node.js (v14+ recommended) installed on your machine

Quick start:

1. Install dependencies:

```powershell
npm install
```

2. Start the server in development mode (if scripts are configured) or directly with Node:

```powershell
node src/index.js
```

3. By default the server will listen on the configured port (see `src/index.js`), and you can begin making HTTP requests to the API.

**Available API endpoints**

```
Note: The exact routes and request/response bodies are implemented in the `routes/` and `controllers/` files. Below is a high-level summary; refer to the code for exact parameter names and payload shapes.

- Mentors
    - `GET /mentors`- List mentors
    - `GET /mentors/:id` - Get a mentor by id
    - `POST /mentors` - Create a mentor
    - `PUT /mentors/:id` - Update a mentor
    - `DELETE /mentors/:id` - Delete a mentor

- Recommendations
    - `GET /recommendations` - List recommendations
    - `GET /recommendations/:id` - Get by id
    - `POST /recommendations` - Create recommendation
    - `PUT /recommendations/:id` - Update
    - `DELETE /recommendations/:id` - Delete

- Reviews
    - `GET /reviews` - List reviews
    - `GET /reviews/:id` - Get review
    - `POST /reviews` - Create review
    - `PUT /reviews/:id` - Update review
    - `DELETE /reviews/:id` - Delete review

- Users
    - `GET /users` - List users
    - `GET /users/:id` - Get user
    - `POST /users` - Create user
    - `PUT /users/:id` - Update user
    - `DELETE /users/:id` - Delete user

```

For request/response JSON shapes, open the corresponding controller file under `src/controllers/` and the model files under `src/models/`.

**Data storage**

This app stores data in JSON files inside the `data/` folder. This makes it simple to inspect and modify the data during development, but it's not suitable for production use or concurrent writes. The `utils/fileUtils.js` helper centralizes file reads/writes.

If you plan to migrate to a database later, the current `models/` directory provides a single place to swap file-based logic for a DB client.

**Development tips**

- Use Postman, Insomnia, or `curl` to exercise the endpoints.
- When editing JSON files directly, ensure valid JSON (no trailing commas).
- Consider adding `nodemon` for automatic restarts while developing:

```powershell
npm install -D nodemon
npx nodemon src/index.js
```
**Known limitations**

- Not suitable for production as-is: file-based storage, no concurrency control, no authentication, and limited validation.
- Error handling and input validation will need improvement for a production system.

**Where to look in the code**

- App bootstrap: `src/index.js`
- Routes: `src/routes/*.js`
- Controllers: `src/controllers/*.js`
- Data models: `src/models/*.js`
- Utility file ops: `src/utils/fileUtils.js`
- Data: `data/*.json`

This project uses JSON-based file storage as required for the assignment — no database needed. Mentor Review Backend

A clean and lightweight Node.js + Express backend that allows users to:

⭐ Rate mentors
📝 Write reviews
📨 Let mentors recommend students through a public shareable link

This project uses JSON-based file storage as required for the assignment — no database needed.

## 📁 Project Structure

```
project-root/
│
├── index.js
│
├── controllers/
│   ├── mentorsController.js
│   ├── recommendController.js
│   ├── reviewsController.js
│   └── usersController.js
│
├── data/
│   ├── mentors.json
│   ├── recommendations.json
│   ├── reviews.json
│   └── users.json
│
├── models/
│   ├── mentorModel.js
│   ├── recommendModel.js
│   ├── reviewModel.js
│   └── userModel.js
│
├── routes/
│   ├── mentorRoutes.js
│   ├── recommendRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
│
└── utils/
    └── fileUtils.js
```
