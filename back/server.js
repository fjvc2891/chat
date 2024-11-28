const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const messageRoutes = require('./routes/messages');
const verifyToken = require('./middlewares/verifyToken');

dotenv.config(); // Cargar variables de entorno

const app = express();
const server = http.createServer(app); // Servidor HTTP para Socket.IO
const io = new Server(server, { cors: { origin: '*' } }); // Configuración de CORS para WebSocket

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Ruta de autenticación (puedes moverla a otro archivo si lo prefieres)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Simula autenticación (puedes reemplazar con tu lógica de base de datos)
  if (username === 'Admin2024' && password === '123456') {
    const token = jwt.sign({ username, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { username, role: 'student' } });
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Rutas protegidas (aplican el middleware verifyToken)
app.use('/', verifyToken, messageRoutes);

// Configuración de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Escuchar mensajes del cliente
  socket.on('message', async (msg) => {
    console.log('Mensaje recibido:', msg);

    // Guardar el mensaje en la base de datos (reemplaza con lógica real)
    try {
      const result = await db.query(
        'INSERT INTO messages (sender, content, timestamp) VALUES ($1, $2, $3) RETURNING *',
        [msg.sender, msg.content, new Date()]
      );
      const savedMessage = result.rows[0];

      // Emitir mensaje a todos los clientes
      io.emit('message', savedMessage);
    } catch (err) {
      console.error('Error al guardar mensaje:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
