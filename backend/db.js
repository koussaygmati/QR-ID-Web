const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // change si t’as un autre user
  password: '',      // vide par défaut sous XAMPP
  database: 'qr_id_web'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur connexion MySQL :', err);
  } else {
    console.log('✅ Connecté à la base de données MySQL');
  }
});

module.exports = db;
