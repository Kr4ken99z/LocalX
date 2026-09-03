const { Pool } = require('pg');

let pool = null;

const getPool = () => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!connectionString) {
      return null;
    }
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  return pool;
};

const initNeonDB = async () => {
  const p = getPool();
  if (!p) {
    console.log('ℹ️ No Neon DATABASE_URL provided. Continuing with current database setup.');
    return false;
  }

  try {
    const client = await p.connect();
    console.log('🚀 Neon Serverless Postgres Connected Successfully!');

    // Initialize Schema
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        phone VARCHAR(50),
        avatar TEXT,
        saved_addresses JSONB DEFAULT '[]'::jsonb,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS professionals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        business_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        tagline TEXT,
        description TEXT,
        experience_years INTEGER DEFAULT 1,
        rating NUMERIC(3,2) DEFAULT 5.00,
        total_reviews INTEGER DEFAULT 0,
        completed_jobs INTEGER DEFAULT 0,
        response_rate INTEGER DEFAULT 100,
        trust_score INTEGER DEFAULT 85,
        trust_tier VARCHAR(50) DEFAULT 'Verified Master',
        verification_status VARCHAR(50) DEFAULT 'PENDING',
        verification_docs JSONB DEFAULT '[]'::jsonb,
        skills JSONB DEFAULT '[]'::jsonb,
        location JSONB DEFAULT '{}'::jsonb,
        services JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_number VARCHAR(100) UNIQUE NOT NULL,
        customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        professional_id INTEGER REFERENCES professionals(id) ON DELETE SET NULL,
        service_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        scheduled_date DATE NOT NULL,
        scheduled_time VARCHAR(50) NOT NULL,
        address JSONB NOT NULL,
        base_price NUMERIC(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'PENDING',
        timeline JSONB DEFAULT '[]'::jsonb,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        professional_id INTEGER REFERENCES professionals(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS disputes (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        raised_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
        against_user INTEGER REFERENCES users(id) ON DELETE CASCADE,
        reason VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        evidence JSONB DEFAULT '[]'::jsonb,
        status VARCHAR(50) DEFAULT 'OPEN',
        resolution_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        conversation_id VARCHAR(255) NOT NULL,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
        read BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Neon Postgres Tables & Schema Verified!');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Neon Postgres initialization failed:', err.message);
    return false;
  }
};

module.exports = {
  getPool,
  initNeonDB,
};
