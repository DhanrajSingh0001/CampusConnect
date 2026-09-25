# 🎓 CampusConnect

CampusConnect is a full-stack campus management platform designed to connect students with campus events, career opportunities and useful study resources.

The platform provides separate experiences for students and administrators with authentication, role-based access, applications, resume uploads and content management.

---

## 🚀 Features

### 👨‍🎓 Student Features

- 🔐 Student Signup & Login
- 🔒 JWT-based authentication
- 📅 Browse campus events
- 🔎 Search and filter events
- 💼 Browse jobs, internships and scholarships
- 🔎 Search and filter opportunities
- 📚 Browse study resources
- 🔎 Search and filter resources
- 📝 Apply for opportunities
- 📄 Upload resume in PDF format
- ☁️ Resume storage using Cloudinary
- 📊 Student dashboard
- 📋 Track submitted applications
- 🔄 View application status
- 🚫 Prevent duplicate applications

---

### 🛡️ Admin Features

- 🔐 Admin authentication
- 📊 Admin dashboard
- 👥 Manage users
- 📅 Create and manage events
- 💼 Create and manage opportunities
- 📚 Create and manage study resources
- 📝 Manage student applications
- 🔄 Update application status
- 🗑️ Delete users, events, opportunities and resources
- 🔒 Role-based admin authorization

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Cloud Services

- Cloudinary

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

## 🏗️ Project Architecture

```text
CampusConnect/
│
├── backend/
│   ├── config/
│   │   └── cloudinary.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   ├── Event.js
│   │   ├── Opportunity.js
│   │   ├── Resource.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── opportunityRoutes.js
│   │   ├── resourceRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── AdminRoute.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
