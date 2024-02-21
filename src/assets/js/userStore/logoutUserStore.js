import React from "react";

const LogoutUser = () => {
    //*===================== LOGOUT =====================*
    const handleLogout = () => {

    // Remova o token e o email do armazenamento local ao fazer logout
    localStorage.removeItem('token'); // Certifique-se de remover o token corretamente
    localStorage.removeItem('userEmail');
    console.log("Usuário deslogado")
  };
  //*===================== LOGOUT =====================*

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutUser
