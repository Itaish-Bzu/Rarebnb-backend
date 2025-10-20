# 🏡 Rarebnb – Full-Stack Stay Management App

Rarebnb is a full-stack web application inspired by Airbnb, allowing users to browse, book, and manage stays with reviews and real-time chat.

---

## 📌 Demo / Screenshot

![Screenshot](public/assets/images/png/demo.png)  

🔗 Live site: https://rarebnb-76qo.onrender.com

---

## 🏗️ Project Structure

```plaintext
backend/
├── api/
│   ├── auth/       # Authentication routes
│   ├── user/       # User management
│   ├── stay/       # Stay CRUD operations
│   └── order/      # Orders system
├── services/
│   ├── db.service.js       # MongoDB connection
│   ├── socket.service.js   # WebSocket handling
│   ├── logger.service.js   # Logging
│   └── util.service.js     # Helper functions
├── middlewares/
│   ├── requireAuth.js      # JWT validation
│   └── setupAls.js         # Async local storage
├── public/                 # Static files (images, frontend build if served)
└── package.json
```

---

## 🚀 Tech Stack

**Frontend (built into public/):**
- React + Vite
- CSS modules for styling
- Redux for state management
- WebSocket
- REST API integration

**Backend:**
- Node.js + Express
- MongoDB 
- JWT authentication
- REST API
- WebSocket (Socket.io)
- Serves frontend from `public/`

---

## ⚙️ Features

- Browse stays and filter by location
- Detailed stay pages with images
- User authentication (signup/login/logout) with JWT
- CRUD for stays and reviews
- Real-time messaging using WebSocket
- Order system for bookings
- Fully responsive design

---

## 🛠️ Running the Project

### Install Dependencies
```bash
npm install
```
### Start the Server
```bash
npm run dev
```
---

## 📌 Notes

The backend contains API routes, middleware, services, and database connection.

The frontend is served from public/ and contains React components, Redux state management, and WebSocket handling.

Both backend and frontend are combined in a single repository.
