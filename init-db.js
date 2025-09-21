import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres', // Connect to default database first
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created successfully`);
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    } else {
      console.error('Error creating database:', error);
      process.exit(1);
    }
  } finally {
    await pool.end();
  }

  // Connect to the specific database
  const dbPool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // Create users table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create stories table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        introduction TEXT NOT NULL,
        materials TEXT,
        techniques TEXT,
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published_at TIMESTAMP
      )
    `);

    // Create story_images table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS story_images (
        id SERIAL PRIMARY KEY,
        story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
        image_url VARCHAR(500) NOT NULL,
        caption VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  } finally {
    await dbPool.end();
  }
}

initializeDatabase();