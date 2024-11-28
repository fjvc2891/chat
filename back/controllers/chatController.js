const db = require('../models/db'); // Conexión a la base de datos

// Obtener historial de mensajes
exports.getChatHistory = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el historial de mensajes' });
  }
};

// Enviar un mensaje
exports.sendMessage = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: 'El usuario y el contenido del mensaje son obligatorios' });
  }

  try {
    const result = await db.query(
      'INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};
