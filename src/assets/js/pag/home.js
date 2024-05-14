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
            <div className="father-text-and-form">
                <div className="textos">
                    <h1>Gym</h1>
                    <h2>Calcule Perimetria
                    <br/>e Dobras Cutâneas <br/>
                    de forma automática e simplificada </h2>
                </div>
                
                <LoginUserStore/>
            </div>
        </div>
    )
}

export default Home