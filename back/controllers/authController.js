const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db'); // Conexión a la base de datos

// Inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userType: user.user_type });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Registro
exports.register = async (req, res) => {
  const { username, password, name, userType } = req.body;

  if (!username || !password || !name || !userType) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      'INSERT INTO users (username, password, name, user_type) VALUES ($1, $2, $3, $4)',
      [username, hashedPassword, name, userType]
    );
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};
