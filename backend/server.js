import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize SQLite Database
const dbPath = join(__dirname, 'database.db');
let db;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else {
        console.log('Database connected');
        createTables();
        resolve();
      }
    });
  });
}

function createTables() {
  db.serialize(() => {
    // Sheroes table
    db.run(`
      CREATE TABLE IF NOT EXISTS sheroes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        field TEXT NOT NULL,
        country TEXT NOT NULL,
        shortBio TEXT,
        fullBio TEXT,
        image TEXT,
        journey TEXT,
        achievements TEXT,
        advice TEXT,
        socialLinks TEXT,
        featured INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Nominations table
    db.run(`
      CREATE TABLE IF NOT EXISTS nominations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomineeName TEXT NOT NULL,
        country TEXT NOT NULL,
        field TEXT NOT NULL,
        email TEXT,
        bio TEXT,
        why TEXT,
        photo TEXT,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Newsletter subscribers
    db.run(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data if empty
    db.run('SELECT COUNT(*) as count FROM sheroes', (err, row) => {
      if (row && row.count === 0) {
        insertSampleData();
      }
    });
  });
}

function insertSampleData() {
  const sheroes = [
    {
      name: 'Dr. Amara Okafor',
      field: 'Artificial Intelligence',
      country: 'Nigeria',
      shortBio: 'AI researcher developing solutions for healthcare in Africa',
      fullBio: 'Dr. Amara Okafor is a groundbreaking AI researcher based in Lagos, Nigeria. With a PhD in Machine Learning from UC Berkeley, she founded an AI startup focused on developing diagnostic tools for diseases common in Africa. Her work has impacted over 50,000 patients across West Africa.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
      journey: 'Started coding at age 12, studied Computer Science at University of Lagos, worked at Google Brain, founded her own company',
      achievements: 'Forbes 30 Under 30, TED Speaker, Published 15+ papers in top AI conferences',
      advice: 'Don\'t wait for permission to start. The world needs your perspective.',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#', website: '#' }),
      featured: 1
    },
    {
      name: 'Zainab Hassan',
      field: 'Cybersecurity',
      country: 'Kenya',
      shortBio: 'Ethical hacker protecting African businesses from cyber threats',
      fullBio: 'Zainab Hassan is a renowned cybersecurity expert and ethical hacker from Nairobi. She established one of Africa\'s first dedicated cybersecurity firms and has trained over 1,000 professionals in ethical hacking and security protocols.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
      journey: 'Self-taught programmer, joined Deloitte, founded her security consulting firm, speaker at major tech conferences',
      achievements: 'Certified Ethical Hacker, Winner of Africa\'s Top 20 Women in Tech, Advisor to 5+ startups',
      advice: 'Curiosity is your superpower. Never stop asking "why?"',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#' }),
      featured: 0
    },
    {
      name: 'Ama Mensah',
      field: 'Data Science',
      country: 'Ghana',
      shortBio: 'Using data to drive social impact and economic development',
      fullBio: 'Ama Mensah is a data scientist and social entrepreneur from Accra, Ghana. She uses data analytics to address development challenges and founded a nonprofit that teaches data literacy to underprivileged communities.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
      journey: 'Statistics degree, worked at World Bank, co-founded tech nonprofit, speaker and mentor',
      achievements: 'UN Women Young Leader, Published research on data equity, Mentored 500+ girls',
      advice: 'Your background is your strength. The tech industry needs diverse perspectives.',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#' }),
      featured: 0
    },
    {
      name: 'Fatima Al-Rashid',
      field: 'Web Development',
      country: 'Sudan',
      shortBio: 'Building accessible web solutions for African startups',
      fullBio: 'Fatima Al-Rashid is a full-stack developer and advocate for inclusive design from Khartoum. She specializes in building accessible, responsive websites for African entrepreneurs and runs free coding bootcamps for underprivileged youth.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=600&fit=crop',
      journey: 'Self-taught through online courses, freelancer, founded web agency, community educator',
      achievements: 'Trained 200+ developers, 50+ successful client projects, Community Leader Award',
      advice: 'Accessibility is not an afterthought. Design for everyone from the start.',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#', website: '#' }),
      featured: 0
    },
    {
      name: 'Dr. Esther Kamba',
      field: 'Biotech & Engineering',
      country: 'Uganda',
      shortBio: 'Innovating biotech solutions for African health challenges',
      fullBio: 'Dr. Esther Kamba is a biotechnology engineer from Kampala, Uganda. She developed a low-cost water purification system using nanotechnology and co-founded a social enterprise that has brought clean water to 30+ communities.',
      image: 'https://images.unsplash.com/photo-1516534775068-bb6c1213e5ed?w=500&h=600&fit=crop',
      journey: 'Chemical engineering degree, PhD in Biotech, worked at pharmaceutical company, founded social enterprise',
      achievements: 'International Innovation Award, 2 patents filed, Recognized by UNESCO',
      advice: 'Technology should serve humanity. Build solutions that matter.',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#' }),
      featured: 0
    },
    {
      name: 'Noor Ahmed',
      field: 'Mobile App Development',
      country: 'Egypt',
      shortBio: 'Creating mobile apps that empower African women entrepreneurs',
      fullBio: 'Noor Ahmed is a mobile developer and entrepreneur from Cairo. Her fintech app has helped over 100,000 women manage their small businesses and access microloans, with a 98% user satisfaction rate.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600&fit=crop',
      journey: 'Computer Science degree, app developer at tech company, founded fintech startup',
      achievements: 'Google Play Best App Award, TechCrunch Disrupt Top 10, $2M funding raised',
      advice: 'The best ideas come from solving problems you see every day.',
      socialLinks: JSON.stringify({ linkedin: '#', twitter: '#', website: '#' }),
      featured: 0
    }
  ];

  sheroes.forEach((shero) => {
    db.run(
      `INSERT INTO sheroes (name, field, country, shortBio, fullBio, image, journey, achievements, advice, socialLinks, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        shero.name,
        shero.field,
        shero.country,
        shero.shortBio,
        shero.fullBio,
        shero.image,
        shero.journey,
        shero.achievements,
        shero.advice,
        shero.socialLinks,
        shero.featured
      ]
    );
  });
}

// API Routes

// Get all sheroes with optional filtering
app.get('/api/sheroes', (req, res) => {
  const { country, field, search, featured } = req.query;
  let query = 'SELECT * FROM sheroes WHERE 1=1';
  const params = [];

  if (country && country !== 'all') {
    query += ' AND country = ?';
    params.push(country);
  }
  if (field && field !== 'all') {
    query += ' AND field = ?';
    params.push(field);
  }
  if (search) {
    query += ' AND (name LIKE ? OR shortBio LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (featured) {
    query += ' AND featured = 1';
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get featured shero (Woman of the Week)
app.get('/api/sheroes/featured/week', (req, res) => {
  db.get('SELECT * FROM sheroes WHERE featured = 1 LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Get single shero by ID
app.get('/api/sheroes/:id', (req, res) => {
  db.get('SELECT * FROM sheroes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Shero not found' });
    } else {
      res.json(row);
    }
  });
});

// Get unique countries
app.get('/api/countries', (req, res) => {
  db.all('SELECT DISTINCT country FROM sheroes ORDER BY country', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get unique tech fields
app.get('/api/fields', (req, res) => {
  db.all('SELECT DISTINCT field FROM sheroes ORDER BY field', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get stats
app.get('/api/stats', (req, res) => {
  db.all(
    `
    SELECT 
      (SELECT COUNT(*) FROM sheroes) as totalSheroes,
      (SELECT COUNT(DISTINCT country) FROM sheroes) as countriesRepresented,
      (SELECT COUNT(DISTINCT field) FROM sheroes) as techFields,
      (SELECT COUNT(*) FROM nominations) as nominations
    `,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows[0]);
      }
    }
  );
});

// Submit nomination
app.post('/api/nominations', (req, res) => {
  const { nomineeName, country, field, email, bio, why, photo } = req.body;

  if (!nomineeName || !country || !field) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO nominations (nomineeName, country, field, email, bio, why, photo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nomineeName, country, field, email, bio, why, photo || null],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, message: 'Nomination submitted successfully' });
      }
    }
  );
});

// Subscribe to newsletter
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  db.run(
    `INSERT INTO subscribers (email) VALUES (?)`,
    [email],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          res.status(400).json({ error: 'Already subscribed' });
        } else {
          res.status(500).json({ error: err.message });
        }
      } else {
        res.json({ message: 'Subscribed successfully' });
      }
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize and start server
initializeDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
  });
});