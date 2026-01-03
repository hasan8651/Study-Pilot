# Study Pilot 🎓 — Online Learning Platform

**Study Pilot** is a full-stack online learning platform where users can explore, create, and enroll in courses. Built with the MERN stack and Firebase authentication, it provides a modern, responsive, and interactive experience for both learners and instructors.

---

## 🌐 Live Demo

👉 [Live Website](https://b12-a10-future-box.netlify.app/)

---

## 📸 Screenshot

![Screenshot](./public/screenshot.png)

---

## 🚀 Key Features
- **Personalized, Secure Dashboard** — Protected routes (React Router), Profile, My Added Courses, and My Enrolled, plus a tidy drawer navigation.
- **Secure Authentication** — User login, registration, and Google Sign-In handled via Firebase. Axios-based API calls, loading/error states and page titles via Helmet.
- **Smooth Animations** — Home and section transitions enhanced with *Framer Motion* and *AOS* for engaging visuals.
- **Advanced Filtering** — Browse and filter courses by category on the “All Courses” page.
- **Responsive UI with Theme Toggle** — Smooth UX with responsive layouts, gradient-forward design, light/dark theme toggle, and subtle animations for a polished feel.

---

## 🧩 Technologies Used

### **Frontend**
- React Router — For seamless client-side routing
- Tailwind CSS & DaisyUI — For styling and theme management
- Axios — For API communication
- Framer Motion & AOS — For animations
- SweetAlert2 — For alerts and notifications
- React Helmet Async — For dynamic page titles
- React Icons — For consistent iconography

### **Backend**
- Express.js — For RESTful API development
- MongoDB (no Mongoose) — For data storage
- Firebase — For user authentication and token handling
- dotenv — For managing environment variables
- cors — For secure cross-origin requests

---

## 🗂️ Project Structure
```
client/
  ├─ src/
  │  ├─ pages/
  │  ├─ components/
  │  ├─ contexts/
  │  ├─ routes/
  │  ├─ firebase/
  │  ├─ layout/
  │  ├─ main.jsx
  │  ├─ index.css
  │  ├─ index.html
  │  ├─ .env
  │  └─ .gitignore
server/
  ├─ index.js
  ├─ vercel.json
  ├─ .env
  ├─ .gitignore

```

---

## ⚙️ Installation & Setup Guide

### 🔧 Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account
- Firebase project for authentication

### 🖥️ Clone the repository
```bash
git clone https://github.com/hasan8651/B12-A10-Future-Box-server.git
cd server
```

```bash
git clone https://github.com/hasan8651/B12-A10-Future-Box-client.git
cd client
```

### ⚙️ Setup Backend (Server)
```bash
cd server
npm install
```
Create a **.env** file in the `server/` directory:
```
PORT=5000
DB_USER=your_mongodb_user_name
DB_PASS=your_mongodb_user_password
```
Start the server:
```bash
npm start
```
The backend should now run on **http://localhost:5000**.

### 💻 Setup Frontend (Client)
```bash
cd client
npm install
```
Create a **.env** file in the `client/` directory:
```
VITE_apiKey=your_firebase_api_key
```
Start the React app:
```bash
npm run dev
```
The client should now be live on **http://localhost:5173**.

---

## ⚡ Deployment
- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Hosted on [Vercel Serverless Functions]
- **Database:** MongoDB Atlas
- **Image Hosting:** imgbb API

---

## 🧠 Future Enhancements
- Add course **rating & review system** using MongoDB aggregation.
- Implement **downloadable course certificates**.
- Integrate **student progress tracking** with charts.
- Add **real-time notifications** for new enrollments.

---

## 📜 License
```
This project is open-source and available under the MIT License
👨‍💻 Developed by Mahmudul Hasan