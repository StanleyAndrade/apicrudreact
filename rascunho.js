import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


const Account = () => {

    // //*===================== GET =====================*
    // //pega os usuários pra exibir no html
    const [user, setUser ] = useState([])
    const { id } = useParams()
    const [userData, setUserData] = useState(null)

    const getUser = () => {
        if (!id) {
            console.log("ID não definido");
            return;
        }
    
        axios.get(`http://localhost:8080/user/store/${id}`)
        .then((response) => {
            // setUser(response.data)
            // Verifique se a resposta é um objeto ou uma array
            const userData = Array.isArray(response.data) ? response.data : [response.data];
            setUser(userData);
            console.log("Dados buscados com sucesso")
        })
        .catch((error) => {
            console.log("Erro ao buscar usuários", error)
            console.log("O id é: " + id)
        })
        console.log("O id é: " + id)
    }

    useEffect(() => {
        getUser()
        console.log("O id é: " + id)
    }, [id])
    //*===================== GET =====================*
    

    return(
        <div>
            <h1>Meus dados</h1>
            {user.map((data) => (
                <div key={data._id}> 
                    <p>{data.name}</p>
                    <p>{data.email}</p>
                    <p>{data._id}</p>
                </div>
            ))}
        </div>
    )
}

export default Account
