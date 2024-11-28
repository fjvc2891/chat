const express = require('express');
const router = express.Router();
const { getChatHistory, sendMessage } = require('../controllers/chatController');

// Obtener historial de mensajes
router.get('/history', getChatHistory);

// Enviar un mensaje
router.post('/message', sendMessage);

module.exports = router;
