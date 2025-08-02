const { Pool } = require('pg');

const pool = new Pool({
  user: 'qrid_web_db_user',
  host: 'dpg-d269h4fdiees738rk5l0-a.oregon-postgres.render.com',
  database: 'qrid_web_db',
  password: 'JX9KFlx9mUgPFglOIUa7nJA1t6IqtDiI',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connexion à PostgreSQL
pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL avec succès"))
  .catch(err => console.error("❌ Erreur de connexion PostgreSQL :", err));

// Export pour utiliser pool.query() directement
module.exports = {
  query: (text, params) => pool.query(text, params),
};
