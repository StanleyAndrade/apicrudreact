import { useEffect } from "react"
import LoginUserStore from "../userStore/loginUserStore"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token) {
            navigate('/')
        }
    }, [navigate])

    return(
        <div className="app">

            <div>Nav Menu Transparente</div>

            <div className="father-text-and-form">
                <div className="textos">
                    <h1>Nome</h1>
                    <h2>Seus clientes fazem o pedido pelo link
                    <br/> e vai direto para o seu whatsapp. <br/>
                    Veja como ficará o seu link: </h2>
                    <h2>www.nome/nome da sua loja</h2>
                </div>
                
                <LoginUserStore/>
            </div>
        </div>
    )
}

export default Home