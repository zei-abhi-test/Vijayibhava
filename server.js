import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs/promises';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const { Pool } = pg;
const upload = multer({ dest: 'uploads/' });

// --- DATABASE CONNECTION SETUP ---
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// --- MIDDLEWARE SETUP ---
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// --- AI SETUP ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key-here');

async function generateStoryContent(prompt, title, introduction, materials, techniques) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const fullPrompt = `Create a compelling story about a handmade craft based on the following information: Title: ${title}, Introduction: ${introduction}, Materials: ${materials}, Techniques: ${techniques}. Additional context: ${prompt}. Write an engaging, descriptive story from the artisan's first-person perspective.`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating story with AI:', error);
    throw new Error('Failed to generate story content');
  }
}

// --- AUTHENTICATION MIDDLEWARE ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // Add user payload to request object
    next();
  });
}


// --- API ENDPOINTS ---

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );
    
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ 
      message: 'User created successfully', 
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PROTECTED: Endpoint to PUBLISH content
app.post('/api/upload-content', authenticateToken, upload.array('galleryImages', 10), async (req, res) => {
  try {
    const { storyTitle, introduction, aiPrompt, materials, techniques, mainContent } = req.body;
    
    let contentToSave = mainContent;
    if (aiPrompt && (!mainContent || mainContent.trim() === '')) {
      contentToSave = await generateStoryContent(aiPrompt, storyTitle, introduction, materials, techniques);
    }
    
    const storyData = { ...req.body, mainContent: contentToSave };
    const images = req.files ? req.files.map(file => ({ filename: file.originalname, path: file.path })) : [];
    
    // req.user.id comes from the authenticateToken middleware
    const result = await saveStory(req.user.id, storyData, images, 'published');
    
    if (result.success) {
      res.status(200).json({ success: true, message: 'Story published successfully!', storyId: result.storyId });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error in /api/upload-content:', error);
    res.status(500).json({ success: false, error: 'Failed to publish story.' });
  } finally {
    if (req.files) {
      for (const file of req.files) { await fs.unlink(file.path).catch(console.error); }
    }
  }
});

// PROTECTED: Endpoint to SAVE content as a DRAFT
app.post('/api/save-draft', authenticateToken, upload.array('galleryImages', 10), async (req, res) => {
  try {
    const storyData = req.body;
    const images = req.files ? req.files.map(file => ({ filename: file.originalname, path: file.path })) : [];

    // req.user.id comes from the authenticateToken middleware
    const result = await saveStory(req.user.id, storyData, images, 'draft');

    if (result.success) {
      res.status(200).json({ success: true, message: 'Draft saved successfully!', storyId: result.storyId });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error in /api/save-draft:', error);
    res.status(500).json({ success: false, error: 'Failed to save draft.' });
  } finally {
    if (req.files) {
      for (const file of req.files) { await fs.unlink(file.path).catch(console.error); }
    }
  }
});

// PROTECTED: Endpoint to GET all stories for the logged-in user
app.get('/api/stories', authenticateToken, async (req, res) => {
    try {
        const { status } = req.query; 
        // req.user.id comes from the authenticateToken middleware
        const stories = await getStories(req.user.id, status);
        res.status(200).json({ success: true, stories });
    } catch (error) {
        console.error('Error in /api/stories:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch stories.' });
    }
});


// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// --- DATABASE FUNCTIONS ---
async function saveStory(userId, storyData, images, status = 'draft') {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const storyQuery = `INSERT INTO stories (user_id, title, introduction, materials, techniques, content, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const publishedAt = status === 'published' ? new Date() : null;
    const storyValues = [userId, storyData.storyTitle, storyData.introduction, storyData.materials, storyData.techniques, storyData.mainContent, status, publishedAt];
    const storyResult = await client.query(storyQuery, storyValues);
    const storyId = storyResult.rows[0].id;
    
    if (images && images.length > 0) {
      for (const image of images) {
        const imageQuery = `INSERT INTO story_images (story_id, image_url, caption) VALUES ($1, $2, $3)`;
        const imageValues = [storyId, image.filename, ''];
        await client.query(imageQuery, imageValues);
      }
    }
    
    await client.query('COMMIT');
    return { success: true, storyId };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error: Failed to save story.', error);
    return { success: false, error: error.message };
  } finally {
    client.release();
  }
}

async function getStories(userId, status = null) {
  try {
    let query = `SELECT s.*, COALESCE(json_agg(json_build_object('id', si.id, 'url', si.image_url)) FILTER (WHERE si.id IS NOT NULL), '[]') as images FROM stories s LEFT JOIN story_images si ON s.id = si.story_id WHERE s.user_id = $1`;
    let values = [userId];
    
    if (status) {
      query += ' AND s.status = $2';
      values.push(status);
    }
    
    query += ' GROUP BY s.id ORDER BY s.created_at DESC';
    
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Database Error: Failed to fetch stories.', error);
    throw error;
  }
}