import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import LoginUserStore from "../userStore/loginUserStore"
import CreateUserStore from "../userStore/createUserStore"

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
            <div className="father-text-and-form">
                <div className="textos">
                    
                    <p>Preparar COPY</p>
                    <p>Faça avaliações físicas em segundos.</p>
                    <p>Perimetria, Dobras Cutâneas e Treinos</p>
                </div>
                
                <CreateUserStore/>
            </div>
        </div>
    )
}

export default Home