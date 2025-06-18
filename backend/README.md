---
```md
# Lost & Found Backend (Express + PostgreSQL)

This is the backend for the fullstack lost & found app. It provides APIs for users and items, including authentication and CRUD operations.

🏗️ **Tech Stack**
- Node.js + Express
- PostgreSQL
- dotenv
- cors
- bcrypt
- morgan

🚀 **Getting Started**
```bash
# 1. Install dependencies
cd backend
npm install

# 2. Create a PostgreSQL database (e.g., lostfound)

# 3. Start PostgreSQL and create tables
psql -d lostfound -f schema.sql

# 4. Start the server
node server.js

backend/
├── routes/
│   ├── itemRoutes.js
│   ├── userRoutes.js
├── controllers/
│   ├── itemController.js
│   ├── userController.js
├── models/
│   ├── itemModel.js
│   ├── userModel.js
├── middleware/
│   ├── auth.js
├── db.js
└── server.js


📡 API Endpoints
Base URL: /api

🔐 User Routes

Method
Endpoint
Description
POST
/users/register
Register a new user
POST
/users/login
Login a user
GET
/users
Get all users (admin only)
PUT
/users/:id
Update user info (admin only)
DELETE
/users/:id
Delete user (admin only)

🔐 Item Routes

Method
Endpoint
Description
GET
/items
Get all items
GET
/items/user/:id
Get items by user ID
POST
/items
Add a new item
PUT
/items/:id
Update item (admin only)
DELETE
/items/:id
Delete item (admin only)

