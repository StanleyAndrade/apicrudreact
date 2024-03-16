import React from "react";
import { useNavigate } from 'react-router-dom'; // Importe useNavigate em vez de useHistory

const LogoutUserStore = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação

    // LOGOUT
    const handleLogout = () => {
      try {
        // Remova o token e o email do armazenamento local ao fazer logout
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        console.log("Sucesso ao deslogar usuário")
        navigate('/');
      } catch (error) {
        console.error('Erro ao deslogar ', error)
      }
  };

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutUserStore
