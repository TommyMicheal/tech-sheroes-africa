# Tech Sheroes Africa

A modern, responsive platform celebrating African women in STEM. Inspiring the next generation of innovators.

## Features

- **Explore Sheroes**: Browse profiles of inspiring African women in tech
- **Nominate**: Nominate women who deserve recognition
- **Career Guide**: Interactive guide for different tech careers
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Filtering**: Search and filter profiles by country and tech field

## Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Vite
- Lucide Icons

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

## Project Structure

```
tech-sheroes-africa/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── index.html
├── backend/              # Node.js/Express server
│   └── server.js         # Backend API
└── package.json
```

## Pages

1. **Home** (`/`) - Hero section, featured woman, stats, testimonials
2. **Explore** (`/explore`) - Browse all sheroes with filtering
3. **Profile Detail** (`/shero/:id`) - Full profile with biography and achievements
4. **Nominate** (`/nominate`) - Submit nominations for women in tech
5. **Career Guide** (`/career-guide`) - Interactive guide for tech careers

## API Endpoints

- `GET /api/sheroes` - Get all sheroes with optional filters
- `GET /api/sheroes/:id` - Get single shero by ID
- `GET /api/sheroes/featured/week` - Get featured woman of the week
- `GET /api/countries` - Get list of countries
- `GET /api/fields` - Get list of tech fields
- `GET /api/stats` - Get platform statistics
- `POST /api/nominations` - Submit a nomination
- `POST /api/subscribe` - Subscribe to newsletter

## Sample Data

The platform includes 6 featured sheroes from different African countries:

1. **Dr. Amara Okafor** - Nigeria - Artificial Intelligence
2. **Zainab Hassan** - Kenya - Cybersecurity
3. **Ama Mensah** - Ghana - Data Science
4. **Fatima Al-Rashid** - Sudan - Web Development
5. **Dr. Esther Kamba** - Uganda - Biotech & Engineering
6. **Noor Ahmed** - Egypt - Mobile App Development

## Design System

### Colors
- **Primary**: Purple (#a855f7)
- **Secondary**: Pink (#ec4899)
- **Background**: White with dark mode support
- **Accent**: Dark gray/slate

### Typography
- **Font Family**: Inter (sans-serif)
- **Font Sizes**: Responsive and scalable

### Features
- Smooth animations and transitions
- Gradient overlays
- Card hover effects
- Mobile-first responsive design
- Accessibility (ARIA labels, good contrast)

## Installation

1. Install dependencies for both frontend and backend:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2. The backend will automatically create and populate the SQLite database on first run.

## Development

Start both frontend and backend:
```bash
npm run dev
```

Or run them separately:
```bash
npm run dev:frontend
npm run dev:backend
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

## Building

```bash
npm run build
```

## Features

✨ **Modern Design**
- Clean, professional UI with soft purple and white colors
- Inspirational and empowering tone
- Smooth scroll animations
- Subtle gradients and soft shadows

🌍 **Inclusive**
- Mobile-first responsive design
- Dark mode support
- Accessible with ARIA labels
- Good color contrast

📊 **Functional**
- Real-time search and filtering
- Dynamic profile system
- Nomination form with photo upload
- Newsletter subscription
- Interactive career guide

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized for fast loading
- Lazy image loading
- Efficient state management
- Smooth animations with CSS

## Contributing

This is a hackathon project. Feel free to extend and improve!

## License

MIT License - feel free to use this project as inspiration for your own platform.

---

Made with ❤️ for the women changing tech in Africa