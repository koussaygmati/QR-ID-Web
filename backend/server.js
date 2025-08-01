const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const db = require('./db'); // Connexion à MySQL

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // dossier pour les fichiers PDF

// Route pour générer QR Code + PDF + enregistrer dans MySQL
app.post('/generate', async (req, res) => {
  const userData = req.body;

  // Vérification des champs obligatoires
  if (!userData.nom || !userData.prenom || !userData.cin) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const qrData = JSON.stringify(userData);
    const qrImage = await QRCode.toDataURL(qrData);

    const timestamp = Date.now();
    const fileName = `qr_${timestamp}.pdf`;
    const pdfPath = path.join(__dirname, 'public', fileName);
    const stream = fs.createWriteStream(pdfPath);

    const doc = new PDFDocument();
    doc.pipe(stream);

    doc.fontSize(18).text("📌 Carte d'identité numérique", { align: 'center' });
    doc.moveDown();

    doc.fontSize(14);
    for (let [key, value] of Object.entries(userData)) {
      doc.text(`${key.toUpperCase()} : ${value}`);
    }

    doc.moveDown();

    doc.image(qrImage, {
      fit: [200, 200],
      align: 'center',
      valign: 'center'
    });

    doc.end();

    stream.on('finish', () => {
      const pdfUrl = `http://localhost:${PORT}/${fileName}`;

      // Enregistrement dans la base de données
      const sql = `
        INSERT INTO utilisateurs (nom, prenom, cin, email, tel, date_naissance, qr_pdf)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        userData.nom,
        userData.prenom,
        userData.cin,
        userData.email || '',
        userData.tel || '',
        userData.date_naissance || null,
        pdfUrl
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('❌ Erreur insertion MySQL :', err);
          return res.status(500).json({ error: 'Erreur MySQL' });
        }

        console.log('✅ Données enregistrées avec ID', result.insertId);
        res.json({
          qrImage: qrImage,
          pdfUrl: pdfUrl,
          id: result.insertId
        });
      });
    });

  } catch (err) {
    console.error('Erreur de génération :', err);
    res.status(500).json({ error: 'Erreur lors de la génération du QR ou PDF' });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Backend en ligne : http://localhost:${PORT}`);
});
