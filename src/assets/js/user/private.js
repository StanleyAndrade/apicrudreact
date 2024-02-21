import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedRoute = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const email = localStorage.getItem('userEmail')

  useEffect(() => {
    // Recupere o token JWT armazenado no localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token não encontrado');
      return;
    }

    // Faça a chamada para a rota protegida com o token JWT
    axios
      .get('http://localhost:8080/protected', {
        headers: { Authorization: token },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1>Rota Protegida</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <p><b>Logado com a conta:</b> {email}</p>
    </div>
  );
};

export default ProtectedRoute;
