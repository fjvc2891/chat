// src/pages/ChatRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Dirección del servidor WebSocket

const ChatRoom = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.get('http://localhost:5000/api/messages', {
        headers: { Authorization: `Bearer ${auth.token}` }, // Enviar token en el encabezado
      });
      setMessages(data);
    };

    fetchMessages();

    socket.on('message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off('message');
  }, [auth]);

  const sendMessage = async () => {
    // Validar si el mensaje está vacío o contiene solo espacios
    if (!message.trim()) {
      alert('El mensaje no puede estar vacío.');
      return; // Detener la ejecución si el mensaje es vacío
    }
  
    // Crear el objeto del mensaje
    const newMessage = {
      sender: auth.user.username,
      content: message.trim(), // Asegúrate de eliminar espacios innecesarios
      timestamp: new Date(),
    };
  
    try {
      // Emitir el mensaje en tiempo real
      socket.emit('message', newMessage);
  
      // Guardar el mensaje en la base de datos
      await axios.post('http://localhost:5000/api/messages', newMessage, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
  
      // Limpiar el input del mensaje
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Sección del streaming */}
      <div style={{ width: '80%', marginBottom: '20px' }}>
        <iframe
          src="https://www.youtube.com/embed/pRao2CGOyjE?si=8PAR1y_KPKqFzRIk"
          title="Streaming de la clase"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '400px' }}
        ></iframe>
      </div>

      {/* Sección del chat */}
      <div style={{ width: '80%' }}>
        <h2>Chat en Tiempo Real</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, idx) => (
            <p key={idx}>
              <strong>{msg.sender}:</strong> {msg.content}
            </p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{ width: '70%', marginRight: '10px' }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatRoom;
