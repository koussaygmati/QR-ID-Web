const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const db = require('./db'); // Connexion PostgreSQL

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route principale
app.post('/generate', async (req, res) => {
  const userData = req.body;

  if (!userData.nom || !userData.prenom || !userData.cin) {
    return res.status(400).json({ error: 'Champs nom, prénom et CIN requis' });
  }

  try {
    // Génération du QR code à partir des données JSON
    const qrData = JSON.stringify(userData);
    const qrImage = await QRCode.toDataURL(qrData);

    // Insertion dans la base PostgreSQL
    const insertQuery = `
      INSERT INTO utilisateurs (nom, prenom, cin, email, tel, date_naissance)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;

    const values = [
      userData.nom,
      userData.prenom,
      userData.cin,
      userData.email || '',
      userData.tel || '',
      userData.date_naissance || null
    ];

    const result = await db.query(insertQuery, values);

    // Réponse avec image QR + id utilisateur
    res.json({
      qrImage,
      id: result.rows[0].id
    });

  } catch (err) {
    console.error('❌ Erreur génération QR ou insertion DB :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Backend en ligne sur http://localhost:${PORT}`);
});
