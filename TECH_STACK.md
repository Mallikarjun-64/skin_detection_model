# Tech Stack & Folder Structure - SkinAI

This document provides a technical overview of the SkinAI project, detailing the technologies used and the organizational structure of the codebase.

## Tech Stack

### Frontend Core
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A high-performance frontend build tool for rapid development and optimized builds.
- **[React Router DOM](https://reactrouter.com/)**: Handles client-side routing for seamless page transitions.

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid and consistent UI development.
- **[Framer Motion](https://www.framer.com/motion/)**: An animation library for building fluid, modern transitions and interactions.
- **[Lucide React](https://lucide.dev/)**: A collection of high-quality, customizable svg icons.
- **[React Hot Toast](https://react-hot-toast.com/)**: Provides elegant, non-intrusive notifications.

### State Management & Utilities
- **Context API**: Used for centralizing authentication state (`AuthContext`).
- **PostCSS**: A tool for transforming styles with JS plugins (used for Tailwind).

---

## Folder Structure

```text
skindetection/
├── public/                 # Static assets (images, placeholders)
├── src/
│   ├── assets/             # Project-specific images (backgrounds)
│   ├── components/         # Reusable UI components
│   │   ├── About.jsx       # About section component
│   │   ├── Footer.jsx      # Global footer (conditionally rendered)
│   │   ├── Hero.jsx        # Landing page hero section
│   │   ├── LoadingAnalysis.jsx # AI processing simulation UI
│   │   ├── Navbar.jsx      # Navigation bar with auth state logic
│   │   ├── ProtectedRoute.jsx # Wrapper for authenticated routes
│   │   ├── ResultDisplay.jsx # AI prediction results UI
│   │   └── UploadBox.jsx   # Image upload handling component
│   ├── context/
│   │   └── AuthContext.jsx # Global authentication state management
│   ├── pages/              # Page components (routed via App.jsx)
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Dedicated login page
│   │   ├── Signup.jsx      # Detailed registration page
│   │   └── Upload.jsx      # Image analysis dashboard
│   ├── App.jsx             # Main application component & routes
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.jsx            # Application entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

## Architectural Decisions
1. **Glassmorphism Design**: The UI leverages high-tech blur effects and translucent backgrounds to create a premium, medical-tech aesthetic.
2. **Path-Based Auth Split**: Login and Registration are separated into individual routes to improve user flow and SEO.
## Getting Started & Development

### 1. Installation
Install all required dependencies using npm:
```bash
npm install
```

### 2. Running Locally
Start the development server with Vite:
```bash
npm run dev
```

### 3. Building for Production
Generate a production-ready bundle:
```bash
npm run build
```

---
**Note**: Ensure you have [Node.js](https://nodejs.org/) installed on your system before proceeding.
