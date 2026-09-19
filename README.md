# 3D Model Hub (Frontend)

Welcome to the frontend of **3D Model Hub** — a modern, responsive web application built for 3D artists, developers, and creators to browse, download, manage, and share premium 3D models, sci-fi characters, and game-ready environments.

---

## 🚀 Features

- **Explore Latest Models:** Browse recently uploaded 3D assets with rich metadata, descriptions, and view counts.
- **Search & Filtering:** Real-time search functionality to quickly find specific models or categories.
- **Detailed View Page:** View comprehensive asset information, download counts, and category tags.
- **User Authentication:** Secure login and registration powered by **Firebase Auth** (supports Email/Password and Google Sign-in).
- **Cart Management:** Add models to your cart and manage them seamlessly.
- **Personal Dashboard:** 
  - View your account metadata and login history (`UserProfile`).
  - Manage and track your uploaded models (`MyModels`).
  - Access your download history (`Download`).
- **Interactive UI & Animations:** Built with modern glassmorphic design principles, smooth framer-motion transitions, and responsive Tailwind CSS layout.

---

## 🛠️ Tech Stack

- **React.js** (Vite)
- **Tailwind CSS** & **DaisyUI**
- **React Router** (for dynamic client-side routing)
- **Firebase Authentication**
- **Framer Motion** (for animations)
- **React Toastify & Hot Toast** (for notifications)
- **SweetAlert2** (for confirmation popups)
- **React Icons**

---

## 📁 Project Structure

```text
src/
├── Components/
│   ├── Cards/         # ModelCard component
│   └── Hero/          # Hero section component
├── Context/
│   └── AuthContext.jsx # Global authentication state provider
├── Firebase/
│   └── firebase.config.js # Firebase initialization
├── Pages/
│   ├── AllModels.jsx  # Browse all models & search
│   ├── LatestModels.jsx # Landing page latest models feed
│   ├── ViewDetails.jsx # Single model view & download/delete actions
│   ├── MyModels.jsx   # User's uploaded models management
│   ├── Download.jsx   # User's download history
│   ├── Login.jsx      # Authentication login page
│   └── UserProfile.jsx # User profile dashboard & stats
├── App.jsx            # Main app router wrapper
└── main.jsx           # App entry point
