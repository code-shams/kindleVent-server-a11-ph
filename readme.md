# Kindlevent Server

**Live API URL:** [https://kindlevent-server.vercel.app](https://kindlevent-server.vercel.app)

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [API Endpoints](#api-endpoints)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Setup & Installation](#setup--installation)
5. [Environment Variables](#environment-variables)
6. [Authentication & Security](#authentication--security)
7. [Folder Structure](#folder-structure)
8. [Running Locally](#running-locally)
9. [Deployment](#deployment)
10. [Author](#author)

---

## 📝 Project Overview

This is the backend for **Kindlevent**, a social development events platform. It provides RESTful APIs for:

-   Managing events (create, update, list, details)
-   User-specific operations (joined events, user’s own events)
-   Search and filter functionality based on event type and title

The server is built using Node.js, Express, MongoDB, and Firebase Admin for authentication.

---

## 🚀 API Endpoints

> Base URL: `https://kindlevent-server.vercel.app`

### Public Endpoints

| Method | Route              | Description                                                              |
| ------ | ------------------ | ------------------------------------------------------------------------ |
| GET    | `/`                | Health check, returns welcome message                                    |
| GET    | `/events/all`      | Get all events (no filtering)                                            |
| GET    | `/events/upcoming` | Get all future events with optional `eventType` and `title` query params |

### Protected Endpoints (JWT/Firebase)

| Method | Route                   | Description                                          |
| ------ | ----------------------- | ---------------------------------------------------- |
| GET    | `/events/joined?email=` | Get events joined by authenticated user              |
| GET    | `/event/details/:id`    | Get detailed info for a specific event               |
| GET    | `/event/user?email=`    | Get events created by authenticated user             |
| POST   | `/event/create`         | Create a new event                                   |
| PUT    | `/event/update/:id`     | Update an existing event by ID                       |
| PATCH  | `/event/join/:id`       | Join an event (adds user email to participants list) |

---

## 🛠 Tech Stack & Dependencies

-   **Runtime:** Node.js (v18+)
-   **Framework:** Express.js
-   **Database:** MongoDB (MongoDB Node.js Driver v6)
-   **Authentication:** Firebase Admin SDK
-   **Environment:** Vercel Deployment
-   **Key Packages:**

    -   `express`
    -   `cors`
    -   `dotenv`
    -   `firebase-admin`
    -   `mongodb`
    -   `date-fns`
    -   `jsonwebtoken` (for any custom tokens)

> See full list in `package.json`.

---

## 📥 Setup & Installation

1. **Clone the repo**

    ```bash
    git clone https://github.com/<username>/kindlevent-server.git
    cd kindlevent-server
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment**

    - Create a `.env` file in the root:

        ```ini
        PORT=3000
        MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
        FIREBASE_SERVICE_ACCOUNT_PATH=./path/to/serviceAccountKey.json
        ```

    - Ensure MongoDB URI and Firebase credentials are correct.

---

## 🔑 Environment Variables

| Variable                        | Description                                    |
| ------------------------------- | ---------------------------------------------- |
| `PORT`                          | Port to run the server (default: 3000)         |
| `MONGO_URI`                     | MongoDB connection string                      |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to decrypted Firebase service account key |

> **Important:** Do not commit `.env` or service account JSON to version control.

---

## 🔒 Authentication & Security

-   **Firebase Admin** is used for verifying ID tokens on protected routes.
-   Custom `verifyToken` middleware checks `Authorization: Bearer <token>` header.
-   Routes are protected with proper 401 (Unauthorized) and 403 (Forbidden) responses.
-   MongoDB credentials and Firebase secrets are stored via environment variables.

---

## 📂 Folder Structure

```
kindlevent-server/
├── encrypter.js           # Encrypts service account JSON
├── decrypter.js           # Decrypts service account JSON at runtime
├── index.js               # Main server file
├── .env                   # Environment variables (ignored)
├── package.json           # Dependencies & scripts
├── vercel.json            # Vercel deployment config
└── node_modules/          # Installed packages
```

---

## ▶️ Running Locally

```bash
# start server in development mode
npm run dev
```

-   The API will be accessible at `http://localhost:3000` by default.

---

## 📦 Deployment

-   Deployed to Vercel using `vercel.json` configuration.
-   Ensure your Vercel environment variables match those in `.env` (e.g. `MONGO_URI`, `FIREBASE_SERVICE_ACCOUNT_PATH`).

---

## 👤 Author

**Maksudur Rahman**
GitHub: [github.com/code-shams](https://github.com/code-shams)
