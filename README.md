# User Management App

This is a full-stack User Management application built with React, Node.js, and PostgreSQL (or MySQL). The application allows users to manage their profiles, follow/unfollow other users, and view a dashboard of all users.

## Tech Stack

- **Frontend:**
  - React (Vite)
  - Tailwind CSS
  - React Router DOM
  - Axios
  - React Hook Form
  - Firebase (for image uploads)

- **Backend:**
  - Node.js
  - Express
  - Prisma ORM
  - PostgreSQL (or MySQL)
  - dotenv
  - cors
  - nodemon

## Features

1. **Dashboard Page:** Displays all users in a card format with their details and a follow/unfollow button.
2. **Create User Page:** A form to add a new user with optional image upload via Firebase.
3. **Edit User Page:** Allows editing of user details and managing follow/unfollow actions.
4. **Follow System:** Users can follow or unfollow others, with follower and following counts displayed.

## Project Structure

```
user-management-app
├── frontend
│   ├── public
│   ├── src
│   ├── .env.local
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend
│   ├── src
│   ├── prisma
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── README.md
```

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory and add the following placeholders:
   ```
   VITE_API_URL=<your_api_url>
   VITE_FIREBASE_API_KEY=<your_firebase_api_key>
   VITE_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   VITE_FIREBASE_PROJECT_ID=<your_firebase_project_id>
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following placeholders:
   ```
   DATABASE_URL=<your_database_url>
   PORT=<your_port>
   FIREBASE_BUCKET=<your_firebase_bucket>
   ```

4. Run the database migrations and seed the database (if applicable):
   ```
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the server:
   ```
   npm run start
   ```

## Deployment Recommendations

- **Frontend:** Deploy on Vercel or Netlify.
- **Backend:** Deploy on Render or Railway.

## License

This project is open-source and available under the MIT License.