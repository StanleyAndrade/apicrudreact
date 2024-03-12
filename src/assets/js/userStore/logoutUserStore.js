import React from "react";

const LogoutUserStore = () => {

    // LOGOUT
    const handleLogout = () => {
      try {
        // Remova o token e o email do armazenamento local ao fazer logout
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        console.log("Sucesso ao deslogar usuário")
        window.reload()
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
