# Zoom Clone – Real-Time Video Conferencing Platform

This is a **full-stack Zoom-inspired video conferencing application** built to simulate real-world video call workflows.  
It includes **real-time communication, chat, and meeting management** features.

---

## Features

### Real-Time Communication

- Video and audio calls using **Socket.io**
- Multi-user conference rooms
- Real-time chat and notifications

### User Management

- Registration & login
- Password encryption with **bcrypt**
- Session management

### Frontend Dashboard

- Responsive UI using **React.js**, **Material UI**, **Emotion**
- Routing with **React Router**
- API calls with **Axios**

### Backend APIs

- REST APIs with **Express.js**
- MongoDB for storing user and meeting data
- Real-time updates with **Socket.io**
- Secure authentication and encrypted passwords

---

## Tech Stack

### Frontend

- React.js, React DOM  
- React Router DOM  
- Material UI (`@mui/material`) & Emotion (`@emotion/react`, `@emotion/styled`)  
- Axios for API calls  
- Socket.io-client for real-time communication  
- Web Vitals for performance monitoring  

### Backend

- Node.js, Express.js  
- MongoDB (Mongoose ORM)  
- Socket.io for real-time communication  
- Bcrypt for password encryption  
- Nodemon for development  
- CORS & HTTP-status packages  

---

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
backend/
├── controllers/
├── models/
├── routes/
├── utils/
└── server.js
```

---

## API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|---------|------------|
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user |
| GET    | /meetings      | Fetch user meetings |
| POST   | /meetings      | Create meeting |
| Socket | /socket.io     | Real-time video & chat |

---

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

- Open browser: `http://localhost:3000`

---

## Learning Outcomes

- Real-time communication using Socket.io  
- Full-stack development with React + Node.js + MongoDB  
- Password encryption and secure user authentication  
- Building production-ready, scalable applications  

---

## Disclaimer

This project is for **educational purposes only**.  
It does **not provide real Zoom services**.

---

## Author

**Suraj Kumar** – Full Stack Developer | Real-Time Web Applications  

---

⭐ If you like this project, don’t forget to star the repository!
