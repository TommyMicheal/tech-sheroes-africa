# Tech Sheroes Africa - Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Tailwind)                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Browser (Chrome, Firefox, Safari, Edge)                  │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │  Navigation (Sticky Header, Dark Mode Toggle)       │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │  React Router (SPA)                                 │ │ │
│  │ │  ├─ / (HomePage)                                   │ │ │
│  │ │  ├─ /explore (ExplorePage with filters)            │ │ │
│  │ │  ├─ /shero/:id (ProfileDetailPage)                 │ │ │
│  │ │  ├─ /nominate (NominationPage with form)           │ │ │
│  │ │  └─ /career-guide (CareerGuidePage)                │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │  API Client (utils/api.js)                          │ │ │
│  │ │  - Fetch wrapper with error handling               │ │ │
│  │ │  - Base URL: http://localhost:3000                 │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │  State Management (React Hooks)                     │ │ │
│  │ │  - useState for component state                    │ │ │
│  │ │  - useEffect for side effects                      │ │ │
│  │ │  - localStorage for dark mode persistence         │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │  Styling (Tailwind CSS)                             │ │ │
│  │ │  - Utility-first CSS framework                     │ │ │
│  │ │  - Custom animations and gradients                │ │ │
│  │ │  - Dark mode support (class-based)                │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                     Port: 5173 (Vite Dev Server)               │
└─────────────────────────────────────────────────────────────────┘
                            │
                          HTTPS/CORS
                            │
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express + SQLite)               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Express Server                                            │ │
│  │ ├─ CORS middleware (enables cross-origin requests)      │ │
│  │ ├─ JSON parser (handles JSON bodies)                    │ │
│  │ └─ Error handling middleware                            │ │
│  │                                                          │ │
│  │ Routes:                                                 │ │
│  │ ├─ GET  /api/sheroes (with filters)                   │ │
│  │ ├─ GET  /api/sheroes/:id                              │ │
│  │ ├─ GET  /api/sheroes/featured/week                    │ │
│  │ ├─ GET  /api/countries                                │ │
│  │ ├─ GET  /api/fields                                   │ │
│  │ ├─ GET  /api/stats                                    │ │
│  │ ├─ POST /api/nominations (form submissions)           │ │
│  │ ├─ POST /api/subscribe (newsletter)                   │ │
│  │ └─ GET  /api/health (health check)                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Database Layer (SQLite)                                   │ │
│  │ ├─ Tables:                                               │ │
│  │ │  ├─ sheroes (id, name, field, country, bio, etc.)    │ │
│  │ │  ├─ nominations (nominations submitted)              │ │
│  │ │  └─ subscribers (newsletter emails)                  │ │
│  │ └─ Auto-initialization on startup                      │ │
│  │    └─ Creates tables if they don't exist               │ │
│  │    └─ Inserts 6 sample sheroes                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                     Port: 3000 (Node.js)                        │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Viewing Sheroes (Browse Flow)

```
User clicks "Explore Sheroes"
         ↓
Frontend routes to /explore
         ↓
ExplorePage.jsx renders
         ↓
useEffect fetches:
  - api.getSheroes()
  - api.getCountries()
  - api.getFields()
         ↓
Requests reach Backend:
  GET /api/sheroes
  GET /api/countries
  GET /api/fields
         ↓
Backend queries SQLite:
  SELECT * FROM sheroes
  SELECT DISTINCT country FROM sheroes
  SELECT DISTINCT field FROM sheroes
         ↓
Data returned to Frontend
         ↓
State updated with setSheroes()
         ↓
Component re-renders with profile cards
         ↓
User sees grid of sheroes
```

### 2. Filtering Flow

```
User selects country or field
         ↓
handleFilter() called
         ↓
New params built: { country, field, search }
         ↓
api.getSheroes(params) called with query string
         ↓
Backend receives: GET /api/sheroes?country=Nigeria&field=AI
         ↓
SQL query built dynamically with WHERE clauses
         ↓
Results filtered in database
         ↓
Matching sheroes returned to frontend
         ↓
Grid updates with filtered results
```

### 3. Nomination Submission Flow

```
User fills out form
         ↓
handleSubmit() validates data
         ↓
Photo converted to base64 (if uploaded)
         ↓
api.submitNomination(formData) called
         ↓
POST request sent with:
  - nomineeName
  - country
  - field
  - email
  - bio
  - why
  - photo (base64)
         ↓
Backend receives POST /api/nominations
         ↓
Data validated (required fields check)
         ↓
INSERT INTO nominations table
         ↓
Success response sent to frontend
         ↓
Success message displayed
         ↓
Form cleared
         ↓
User sees confirmation
```

## Component Hierarchy

```
App.jsx (Router Provider)
├── Navigation.jsx (Persistent)
│   ├── Logo/Brand
│   ├── Nav Links
│   ├── Dark Mode Toggle
│   └── Mobile Menu
│
├── Routes
│   ├── HomePage /
│   │   ├── Hero Section
│   │   ├── Featured Shero (ProfileCard)
│   │   ├── Stats Section
│   │   ├── Testimonials
│   │   └── CTA Section
│   │
│   ├── ExplorePage /explore
│   │   ├── Search Bar
│   │   ├── Filters
│   │   │   ├── Country Select
│   │   │   └── Field Select
│   │   └── Grid of ProfileCards
│   │       └── ProfileCard (Multiple)
│   │
│   ├── ProfileDetailPage /shero/:id
│   │   ├── Hero Image
│   │   ├── Profile Header
│   │   ├── Biography Section
│   │   ├── Career Journey
│   │   ├── Achievements
│   │   ├── Advice Section
│   │   ├── Social Links
│   │   └── CTA
│   │
│   ├── NominationPage /nominate
│   │   ├── Form Header
│   │   ├── Nomination Form
│   │   │   ├── Input Fields
│   │   │   ├── Select Dropdowns
│   │   │   ├── Text Areas
│   │   │   ├── Photo Upload
│   │   │   └── Submit Button
│   │   ├── Success Message
│   │   └── Info Box
│   │
│   └── CareerGuidePage /career-guide
│       ├── Career Selection Buttons
│       ├── Career Description
│       ├── Skills List
│       ├── Roadmap Steps
│       ├── Resources Sidebar
│       └── Action Section
│
└── Footer.jsx (Persistent)
    ├── Brand Info
    ├── Quick Links
    ├── Newsletter Form
    └── Social Links
```

## API Response Examples

### GET /api/sheroes

```json
[
  {
    "id": 1,
    "name": "Dr. Amara Okafor",
    "field": "Artificial Intelligence",
    "country": "Nigeria",
    "shortBio": "AI researcher developing solutions for healthcare in Africa",
    "fullBio": "...",
    "image": "https://...",
    "journey": "Started coding at age 12, ...",
    "achievements": "Forbes 30 Under 30, ...",
    "advice": "Don't wait for permission...",
    "socialLinks": "{\"linkedin\": \"#\", ...}",
    "featured": 1
  }
]
```

### POST /api/nominations

Request:
```json
{
  "nomineeName": "Jane Doe",
  "country": "Kenya",
  "field": "Web Development",
  "email": "jane@email.com",
  "bio": "Passionate developer...",
  "why": "She inspires because...",
  "photo": "data:image/jpeg;base64,..."
}
```

Response:
```json
{
  "id": 5,
  "message": "Nomination submitted successfully"
}
```

## State Management Strategy

### Frontend State

1. **App Level** (`App.jsx`)
   - `darkMode` - Boolean for dark/light theme
   - `toggleDarkMode` - Function to toggle theme

2. **Page Level** (e.g., `ExplorePage.jsx`)
   - `sheroes` - Array of filtered sheroes
   - `countries` - Array of available countries
   - `fields` - Array of tech fields
   - `searchTerm` - Current search input
   - `selectedCountry` - Current country filter
   - `selectedField` - Current field filter
   - `loading` - Boolean for loading state

3. **Component Level** (e.g., `NominationPage.jsx`)
   - `formData` - Object with form field values
   - `submitted` - Boolean for form submission status
   - `loading` - Boolean for submission progress
   - `error` - String for error messages

## Database Initialization

```javascript
// server.js startup sequence:

1. Connect to SQLite
2. db.serialize() calls:
   - CREATE TABLE sheroes (if not exists)
   - CREATE TABLE nominations (if not exists)
   - CREATE TABLE subscribers (if not exists)
3. Check if sheroes table has data
4. If empty, insert 6 sample sheroes
5. Server ready to accept requests
```

## Error Handling

### Frontend Error Handling
- Try-catch blocks in async functions
- Loading states to prevent double-submission
- User-friendly error messages
- Form validation before submission
- Fallback UI for missing data

### Backend Error Handling
- Route-level error handling
- Database error catching
- Validation of required fields
- HTTP status codes (200, 400, 404, 500)
- JSON error responses

## Performance Optimizations

1. **Frontend**
   - Debounced search (300ms)
   - Conditional rendering
   - Lazy image loading (native)
   - CSS animations (GPU-accelerated)
   - LocalStorage for dark mode

2. **Backend**
   - Indexed database queries
   - Query parameter validation
   - CORS on whitelist
   - JSON body size limit (50MB)

3. **Network**
   - Minimal API calls
   - Efficient filtering (done on backend)
   - Compressed response payloads

## Security Considerations

1. **Input Validation**
   - Server-side validation of all inputs
   - Email format checking
   - Required field validation

2. **CORS**
   - Enabled with credentials: false
   - Allows localhost development

3. **Data Storage**
   - Passwords: Not stored (simple app)
   - Photos: Stored as base64 in DB
   - Email: Validated before storage

## Deployment Considerations

1. **Environment Variables**
   - Backend: Set PORT, DATABASE_URL if needed
   - Frontend: Set VITE_API_URL to production backend

2. **Build Process**
   ```bash
   npm run build  # Creates optimized dist/ folder
   ```

3. **Hosting Options**
   - Frontend: Vercel, Netlify, GitHub Pages
   - Backend: Heroku, Railway, Render

---

**Architecture reflects production-ready patterns with clean separation of concerns.**