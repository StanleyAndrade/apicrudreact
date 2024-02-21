import axios from "axios";
import React, { useEffect, useState } from "react"

const AccountGet = () => {

    //*===================== GET =====================*
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Faz a requisição para a rota protegida
                const response = await axios.get("http://localhost:8080/protected/store/get", {
                    // Envia o token no header da requisição para o backend
                    headers: {Authorization: `${localStorage.getItem("token")}`}
                });

                // Se o processo de cima der certo, nós recebemos os dados em response e envia para userData
                setUserData(response.data.userData);
            }catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
                console.log('Dados: ' + userData)
            }
        }
        fetchUserData()
    }, [])
    //*===================== GET =====================*
    
    return(
        <div className="account">
            <h1>Meus Dados</h1>
            {userData ? ( // Verifica se userData está definido
                <div>
                    <p>Nome: {userData.name}</p>
                    <p>Endereço: {userData.endereco}</p>
                    <p>Telefone: {userData.phone}</p>
                    <p>Email: {userData.email}</p>
                    <p>Horário: {userData.time}</p>
                    <p>Forma de Pagamento: {userData.payment}</p>
                    <p>Nome da Pessoa: {userData.nameperson}</p>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}

export default AccountGet
