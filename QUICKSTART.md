# Tech Sheroes Africa - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### Step 2: Start the Application

**Option A: Run both concurrently**
```bash
npm run dev
```

**Option B: Run separately in different terminals**

Terminal 1 - Frontend:
```bash
npm run dev:frontend
```

Terminal 2 - Backend:
```bash
npm run dev:backend
```

### Step 3: Open in Browser

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📝 What Happens on First Run

1. Backend creates `backend/database.db` automatically
2. Database tables are initialized
3. 6 sample sheroes are inserted
4. API is ready to serve requests

## 🎯 Features to Try

### 1. Homepage
- See the hero section with featured woman of the week
- View impact statistics
- Read inspiring testimonials

### 2. Explore Sheroes
- Browse all 6 sheroes in a grid
- Search by name or field
- Filter by country and tech field
- Click "View Profile" to see details

### 3. Profile Detail
- Read full biography and career journey
- See achievements
- Read advice for young girls in STEM
- Share the profile

### 4. Nominate a Shero
- Fill out the nomination form
- Upload a profile photo
- Submit nomination
- See success confirmation

### 5. Career Guide
- Select different tech careers
- See skills needed
- View learning roadmap
- Access free resources

### 6. Dark Mode
- Click moon/sun icon in navigation
- Toggle between light and dark themes
- Setting is saved automatically

## 🔧 Development URLs

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:3000 | 3000 |
| API Health | http://localhost:3000/api/health | 3000 |

## 📱 Responsive Design

Test on different screen sizes:
- Mobile: 320px - 480px
- Tablet: 768px - 1024px
- Desktop: 1440px+

## 🗄️ Database

The SQLite database at `backend/database.db` includes:

- **sheroes**: 6 sample women in tech
- **nominations**: Store submitted nominations
- **subscribers**: Newsletter subscribers

## 🎨 Customization

### Add More Sheroes
Edit `backend/server.js` in the `insertSampleData()` function:
```javascript
const sheroes = [
  { name: 'New Shero', field: 'Your Field', ... },
  // Add more...
];
```

### Change Colors
Edit `frontend/tailwind.config.js` to customize:
- Purple shades
- Pink shades
- Other theme colors

### Add More Career Paths
Edit `frontend/src/pages/CareerGuidePage.jsx`:
```javascript
const careers = {
  'Your Career': {
    description: '...',
    skills: [...],
    resources: [...],
    roadmap: [...]
  }
};
```

## 📂 Key Files

### Frontend
- `frontend/src/App.jsx` - Main app with routing
- `frontend/src/pages/` - All page components
- `frontend/src/components/` - Reusable components
- `frontend/src/utils/api.js` - API client

### Backend
- `backend/server.js` - Express API server
- `backend/database.db` - SQLite database (auto-created)

## ✅ Checklist for Hackathon

- [x] 5 fully functional pages
- [x] 6 sample sheroes with realistic data
- [x] Responsive design (mobile-first)
- [x] Dark mode support
- [x] Form validation
- [x] Search and filtering
- [x] Database with SQLite
- [x] RESTful API
- [x] Professional UI/UX
- [x] Clean, well-documented code

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure port 3000 is free
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Frontend shows blank page
- Check browser console for errors
- Verify backend is running
- Clear browser cache (Cmd+Shift+Delete)

### Database errors
- Delete `backend/database.db`
- Restart backend to recreate database

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [Vite](https://vitejs.dev)

## 🎓 Code Structure Tips

1. **Components** are in `src/components/` - reusable UI pieces
2. **Pages** are in `src/pages/` - full page views
3. **Utils** are in `src/utils/` - helper functions
4. **API calls** go through `utils/api.js`
5. **Styling** uses Tailwind CSS classes

## 🚀 Ready to Deploy?

The app is production-ready! To build for production:

```bash
npm run build
```

This creates optimized bundles for deployment.

---

**Need help?** Check the README.md or PROJECT_SUMMARY.md for more details.

Happy coding! 💜