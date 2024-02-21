import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: "",
        endereco: "",
        phone: "",
        email: "",
        time: "",
        payment: "",
        nameperson: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/protected/store/get", {
                    headers: { Authorization: `${localStorage.getItem("token")}` }
                });
                setUserData(response.data.userData);
                setNewUserData(response.data.userData); // Passa os dados do usuário para os inputs
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
            }
        }
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    }

    const handleEditButtonClick = () => {
        setIsEditing(true);
    }

    const handleUpdateUserData = async () => {
        try {
            const response = await axios.patch("http://localhost:8080/protected/store", newUserData, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setUserData(response.data.userData);
            setIsEditing(false);
            alert("Dados do usuário atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar os dados do usuário:", error);
        }
    }

    return (
        <div className="account">
            <h1>Meus Dados</h1>
            {userData && !isEditing && (
                <div>
                    <p>Nome: {userData.name}</p>
                    <p>Endereço: {userData.endereco}</p>
                    <p>Telefone: {userData.phone}</p>
                    <p>Email: {userData.email}</p>
                    <p>Horário: {userData.time}</p>
                    
                    <div>
                    <p>Forma de Pagamento:</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {userData.payment.map((pagamento, index) => (
                            <li key={index}>{pagamento}</li>
                            ))}
                        </ul>
                    </div>
                    <p>Nome da Pessoa: {userData.nameperson}</p>
                    <button onClick={handleEditButtonClick}>Editar</button>
                </div>
            )}
            {isEditing && (
                <div>
                    <input type="text" name="name" value={newUserData.name} onChange={handleInputChange} placeholder="Novo Nome" />
                    <input type="text" name="endereco" value={newUserData.endereco} onChange={handleInputChange} placeholder="Novo Endereço" />
                    <input type="text" name="phone" value={newUserData.phone} onChange={handleInputChange} placeholder="Novo Telefone" />
                    <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} placeholder="Novo Email" />
                    <input type="text" name="time" value={newUserData.time} onChange={handleInputChange} placeholder="Novo Horário" />
                    <input type="text" name="payment" value={newUserData.payment} onChange={handleInputChange} placeholder="Nova Forma de Pagamento" />
                    <input type="text" name="nameperson" value={newUserData.nameperson} onChange={handleInputChange} placeholder="Novo Nome da Pessoa" />
                    <button onClick={handleUpdateUserData}>Salvar</button>
                </div>
            )}
        </div>
    )
}

export default Account;
