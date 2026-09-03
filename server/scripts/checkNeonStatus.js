const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkNeon() {
  console.log('--- NEON DATABASE LIVE HEALTH CHECK ---');
  console.log('Connecting to:', connectionString.split('@')[1]); // Log host without exposing credentials

  try {
    const client = await pool.connect();
    console.log('✅ Connection Status: CONNECTED & ONLINE');

    // System Info
    const sysRes = await client.query('SELECT current_database(), current_user, version()');
    console.log('📁 Database Name:', sysRes.rows[0].current_database);
    console.log('👤 Database User:', sysRes.rows[0].current_user);
    console.log('⚙️ PostgreSQL Engine:', sysRes.rows[0].version.split(' on ')[0]);

    // Tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log(`\n📊 Schema Status (${tablesRes.rows.length} tables verified):`);
    for (const t of tablesRes.rows) {
      const countRes = await client.query(`SELECT count(*) FROM "${t.table_name}"`);
      console.log(`   • ${t.table_name.padEnd(16)} : ${countRes.rows[0].count} records`);
    }

    // Registered Admin Account
    const adminRes = await client.query("SELECT id, name, email, role, phone, created_at FROM users WHERE email = 'admin@localx.app'");
    if (adminRes.rows.length > 0) {
      console.log('\n👑 Master Owner Record:');
      console.log('   • Name  :', adminRes.rows[0].name);
      console.log('   • Email :', adminRes.rows[0].email);
      console.log('   • Role  :', adminRes.rows[0].role);
      console.log('   • ID    :', adminRes.rows[0].id);
    } else {
      console.log('\n⚠️ Master admin account not found in users table.');
    }

    client.release();
    await pool.end();
    console.log('\n✅ All checks passed: Neon DB is active, healthy, and operational.');
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
    process.exit(1);
  }
}

checkNeon();
