import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importe useNavigate em vez de useHistory
import { Link } from "react-router-dom";

const LoginUserStore = () => {

    //*===================== LOGIN =====================*
    const [token, setToken] = useState("");
    //const [userEmail, setUserEmail] = useState("");
    //const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Use useNavigate para navegação

    const handleLogin = async (event) => {
        try {
            const response = await axios.post("http://localhost:8080/userstore/login", { email, password })
            setToken(response.data.token)
            // Salva o token e o email no armazenamento local (localStorage)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userStoreEmail', email);
            console.log('Sucesso ao logar usuário');
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao logar Usuário ', error.response.data)
        }
    };
    useEffect(() => {
        handleLogin()
    }, [])

    //*===================== LOGIN =====================*

    return (
        <div>
            <div className="main-login">
                <div className="right-login">
                    <div className="card-login">
                        <h2 className="login">LOGIN</h2>
                        <p>Não tem conta? <Link to="/criar-conta"><b>Criar conta</b></Link>
                        </p>
                        <form className="form-loginUserStore">
                            <div className="textfield">
                                <label className="label-loginUserStore">Email
                                    <input 
                                    className="input-loginUserStore"
                                    type="text" 
                                    name="email" 
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                </label>
                            </div>
                            <div className="textfield">
                                <label className="label-loginUserStore">Senha
                                    <input 
                                    className="input-loginUserStore"
                                    type="text" 
                                    name="senha" 
                                    placeholder="Senha"
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                </label>
                            </div>
                            <button className="btn-login"onClick={(e) => { e.preventDefault(); handleLogin()}}>ENTRAR</button>
                            <p className="esqueciSenha"> Esqueci senha. <a className="redefinir" href="">Redefinir senha</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUserStore