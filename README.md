# 🚨 A.S.A.P Lagundi

A **real-time community reporting system** designed to streamline incident reporting, response coordination, and monitoring for barangay-level operations.

This system enables users to submit reports, while administrators and responders receive updates instantly through a real-time interface powered by WebSockets.

---

## 🧠 Project Overview

**A.S.A.P (Automated System for Action and Prevention)** is built to improve response time and communication between residents and local authorities.

### ✨ Key Features

- 📢 Real-time incident reporting
- 🔔 Live notifications using Socket.io
- 👥 User management (Admin & Users)
- 📍 Location-based reporting (optional integration)
- 📊 Dashboard for monitoring reports
- ✅ Status tracking (Pending → Responded → Resolved)
- 🔐 Authentication with JWT

---

## 🛠️ Tech Stack

### 🚀 Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white)

### 🎨 Frontend
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
- ![Zustand](https://img.shields.io/badge/Zustand-000000?logo=react&logoColor=white)

---

## 🏗️ System Architecture

The system follows a **MERN architecture with real-time capabilities**:

- **React + Zustand** → Handles UI state and user interaction
- **Express + Node.js** → API and server logic
- **MongoDB** → Stores users, reports, and statuses
- **Socket.io** → Enables real-time updates (notifications, report changes)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/pravennn08/A.S.A.P--Lagundi.git
cd A.S.A.P--Lagundi
```

---

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

### 3. Environment Variables

Create a `.env` file inside the **server root directory**:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

---

### 4. Create Required Folder

Inside the **server root directory**, create:

```bash
mkdir uploads
```

This folder is used for storing uploaded files (e.g., report images).

---

### 5. Run the Application

#### Start Backend
```bash
cd server
npm run server
```

#### Start Frontend
```bash
cd client
npm run dev
```

---

## 🔄 Real-Time Functionality

The system uses **Socket.io** to:

- Broadcast new reports instantly
- Notify admins/responders in real time
- Update report status live without refreshing
- Enable responsive communication flow

---

## 📁 Suggested Project Structure

```
A.S.A.P--Lagundi/
│
├── client/              # React frontend
│
├── server/              # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/         # ⚠️ Required folder
│   └── server.js
│
├── .env
└── README.md
```

---

## 🔐 Authentication

- Uses **JWT (JSON Web Tokens)** for secure authentication
- Protected routes for admin and authorized users
- Passwords are securely hashed

---

## 📈 Future Improvements

- 📍 Map integration (OpenStreetMap / Leaflet)
- 📱 Mobile responsiveness improvements
- 📊 Advanced analytics dashboard
- 🔔 Push notifications (PWA or Firebase)
- 🧠 AI-assisted report classification

---

## 🤝 Contribution

Contributions are welcome!

```bash
# Fork the repo
# Create a new branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

---

## 📄 License

This project is for academic and development purposes.
