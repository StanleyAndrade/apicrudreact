import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginUserStore = () => {

    //*===================== LOGIN =====================*
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
    const handleLogin = () => {
      axios.post("http://localhost:8080/login/store", { email, password })
        .then((response) => {
          setToken(response.data.token);
          setUserEmail(email);     
          //essa função abaixo não está sendo usada
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
            <div className="main-login">
                <div className="right-login">
                    <div className="card-login">
                        <h2 className="login">LOGIN</h2>
                        <p>Não tem conta? <Link to="/criar-conta"><b>Criar conta</b></Link>
                        </p>
                        <form>
                            <div className="textfield">
                                <label>Email
                                    <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                </label>
                            </div>
                            <div className="textfield">
                                <label>Senha
                                    <input 
                                    type="text" 
                                    name="senha" 
                                    placeholder="Senha"
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                </label>
                            </div>
                            <button className="btn-login"onClick={handleLogin}>ENTRAR</button>
                            <p className="esqueciSenha"> Esqueci senha. <a className="redefinir" href="">Redefinir senha</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUserStore