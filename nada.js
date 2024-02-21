const nada = () => {
    return(
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



<div className="main-login">
                    <div className="right-login">
                        <div className="card-login">
                            <h2 className="login">LOGIN</h2>
                            <p>Não tem conta? <b>Criar conta</b>
                            </p>
                            <form>
                                <div className="textfield">
                                    <label>Email
                                        <input type="text" name="email" placeholder="Email"></input>
                                    </label>
                                </div>
                                <div className="textfield">
                                    <label>Senha
                                        <input type="text" name="senha" placeholder="Senha"></input>
                                    </label>
                                </div>
                                <input type="submit" className="btn-login" value="ENTRAR"></input>
                                <p className="esqueciSenha"> Esqueci senha. <a className="redefinir" href="">Redefinir senha</a></p>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}