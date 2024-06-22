import axios from "axios";
import React, { useState } from "react";

const LoginUser = () => {
    //*===================== LOGIN =====================*
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
    const handleLogin = () => {
      axios.post("https://api.fittreinoapp.com/login", { email, password })
        .then((response) => {
          setToken(response.data.token);
          setUserEmail(email);     
          setIsAuthenticated(true);
          console.log("Usuário logado com sucesso");
  
          // Salva o token e o email no armazenamento local (localStorage)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userEmail', email);
        })
        .catch((error) => {
          console.error(error.response.data);
          console.error("Deu erro", error);
        });
    };
    //*===================== LOGIN =====================*

    return (
        <div>
            <h1>Login</h1>
            <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            /><br />
            <input
            type="text"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginUser