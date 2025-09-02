
# 🎮 FMS League of Legends Portfolio Project

A fully-featured **portfolio project** showcasing a modern React stack for a League of Legends team website. Built as a **personal demonstration** of full-stack development skills.



## 🌐 **Live Demo**
```bash
https://app.fms-project.fun/
```



## 📋 **Table of Contents**
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-setup)
- [API Endpoints](#-api-endpoints)
- [Showcase Highlights](#-showcase-highlights)

## ✨ **Features**

### 🏆 **Team Management**
- **Dynamic player roster** with role-based categorization
- **Social media integration** (Twitter, YouTube, Twitch, Kick, Instagram, TikTok)
- **Real-time rank tracking** with visual rank wings

### 📊 **Advanced Statistics**
- **Individual player analytics** with KDA, CS/min, damage metrics
- **Match history** with expandable game details
- **Champion-specific performance** tracking
- **Tournament statistics** integration

### 📝 **Content System**
- **Markdown-enabled blog** with live preview
- **Admin dashboard** for content management
- **Newsletter subscription** system
- **Role-based access** (ADMIN/EDITOR/USER)

### 🎮 **Match Tracking**
- **Live match updates** (upcoming/running/finished)
- **Tournament integration** with league data
- **Game-by-game breakdown** with stats
- **Visual match cards** with team logos

### 🔐 **Authentication**
- **JWT-based authentication** with CSRF protection
- **Role-based routing** and permissions
- **User management** system for admins



## 🛠 **Tech Stack**

| **Frontend** | **Backend** | **Dev Tools** |
|--------------|-------------|---------------|
| React 18 + Vite | Django REST API | TanStack Query |
| React Router v6 | PostgreSQL | Axios |
| Tailwind CSS | JWT Auth | js-cookie |
| Lucide Icons | CORS Support | ESLint |
| React Markdown | CSRF Protection | Git |

---

## 🚀 **Quick Start**

### 📦 **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### 🏗️ **Installation**
```bash
# Clone repository
git clone https://github.com/your-username/fms-portfolio.git
cd fms-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🌍 **Access**
- **Development**: `http://localhost:5173`
- **Production**: `https://app.fms-project.fun/`

---

## 📁 **Project Structure**

```
fms-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Alert.jsx       # Toast notifications
│   │   ├── PlayerCard.jsx  # Player profile display
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Authentication hook
│   │   ├── useRoster.js    # Player data hook
│   │   └── ...
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx # Global auth state
│   ├── pages/              # Route components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Roster.jsx      # Team members
│   │   └── ...
│   └── services/           # API integration
│       └── api.js          # All API calls
├── public/
│   ├── teamPhotos/         # Player images
│   ├── rankIcons/          # League rank icons
│   └── socialsIcons/       # Social media icons
└── README.md
```



## 🔧 **Environment Setup**

Create `.env` file:
```bash
# Required: Backend URL
VITE_BACKEND_URL=https://your-backend-api.com
```

## 🔌 **Some API Endpoints**

### **Authentication**
- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout
- `GET /api/me/` - Current user info

### **Player Data**
- `GET /api/players/` - All players
- `GET /api/players/:nick/ranks` - Player ranks
- `GET /api/players/:nick/matches/` - Match history
- `POST /api/players/create/` - Create player (Admin)

### **Statistics**
- `GET /api/officialmatches/` - Tournament matches
- `GET /api/players/:nick/official_stats/` - Detailed stats

### **Content**
- `GET /api/posts/` - Blog posts
- `POST /api/posts/create/` - Create post
- `POST /api/newsletter/` - Newsletter signup



## 🎯 **Showcase Highlights**

### **🏅 Responsive Design**
- **Mobile-first** approach
- **Smooth animations** and transitions
- **Dark theme** with custom color palette

### **📊 Advanced Data Handling**
- **Infinite scrolling** for large datasets
- **Real-time updates** with React Query
- **Error boundaries** and loading states
- **Debounced search** functionality

### **🔐 Security Features**
- **JWT authentication** with refresh tokens
- **CSRF protection** on all forms
- **Input validation** and sanitization
- **Role-based access control**

### **🎨 Visual Features**
- **Rank wings** that change based on tier
- **Champion icons** from Riot API
- **Match timeline** with game details
- **Markdown rendering** with sanitization


## 📄 **License**

MIT © 2025

## Autor

**Igor Suchodolski**
- Email: [igor.suchodolskii@gmail.com](mailto:igor.suchodolskii@gmail.com)
- GitHub: [@m4jorskyy](https://github.com/m4jorskyy)
