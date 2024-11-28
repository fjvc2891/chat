const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController'); // Importa controladores

// Ruta para el inicio de sesión
router.post('/login', login);

// Ruta para el registro
router.post('/register', register);

module.exports = router;
