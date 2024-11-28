// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const [auth, setAuth] = useState(() => {
    // Recuperar el token desde localStorage al cargar la app
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const handleAuth = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data)); // Guardar token en localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!auth ? <Login setAuth={handleAuth} /> : <ChatRoom auth={auth} />} />
      </Routes>
    </Router>
  );
};

export default App;
