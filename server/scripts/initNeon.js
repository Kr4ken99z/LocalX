const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_4WhiGLo2DlON@ep-divine-fog-azphhw0e-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function init() {
  try {
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
    console.log('✅ Neon DB: All tables (users, professionals, bookings, reviews, disputes, audit_logs) created successfully!');

    // Check Master Owner
    const check = await pool.query("SELECT * FROM users WHERE email = 'admin@localx.app'");
    if (check.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5)",
        ['Koustav Mondal (Master Owner)', 'admin@localx.app', 'password123', 'admin', '+91 98765 43210']
      );
      console.log('✅ Master Owner admin@localx.app seeded in Neon DB!');
    } else {
      console.log('ℹ️ Master Owner admin@localx.app already present in Neon DB.');
    }

    // Check Customer Demo
    const checkCust = await pool.query("SELECT * FROM users WHERE email = 'customer@localx.app'");
    if (checkCust.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5)",
        ['Rohan Sen (Kolkata Customer)', 'customer@localx.app', 'password123', 'customer', '+91 98301 23456']
      );
      console.log('✅ Demo Customer customer@localx.app seeded in Neon DB!');
    }

    // Check Pro Demo
    const checkPro = await pool.query("SELECT * FROM users WHERE email = 'pro@localx.app'");
    if (checkPro.rows.length === 0) {
      const resProUser = await pool.query(
        "INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        ['Apex Electricals', 'pro@localx.app', 'password123', 'professional', '+91 98310 98765']
      );
      await pool.query(
        `INSERT INTO professionals (user_id, business_name, category, tagline, description, experience_years, rating, total_reviews, trust_score, trust_tier, verification_status, location)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          resProUser.rows[0].id,
          'Apex Electricals & Power Systems',
          'electrician',
          'Licensed Master Electrician • 9+ Years Experience',
          'Specializing in residential wiring, short circuits, and inverter installations in Salt Lake, Kolkata.',
          9,
          4.9,
          92,
          95,
          'Elite Pro',
          'VERIFIED',
          JSON.stringify({ city: 'Kolkata', address: 'Salt Lake Sector V, Kolkata' })
        ]
      );
      console.log('✅ Demo Professional pro@localx.app seeded in Neon DB!');
    }

    const countUsers = await pool.query("SELECT COUNT(*) FROM users");
    console.log(`📊 Total registered users in Neon DB: ${countUsers.rows[0].count}`);
  } catch (err) {
    console.error('Error during Neon DB migration:', err);
  } finally {
    await pool.end();
  }
}

init();
