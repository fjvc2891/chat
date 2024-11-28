const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Ruta protegida para obtener mensajes
router.get('/api/messages', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Ruta protegida para crear un mensaje
router.post('/api/messages', async (req, res) => {
  const { sender, content, timestamp } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO messages (sender, content, timestamp) VALUES ($1, $2, $3) RETURNING *',
      [sender, content, timestamp]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

module.exports = router;
