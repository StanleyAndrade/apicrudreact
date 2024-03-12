import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCategoria from "../product/createCategoria";
import CreateProduct from "../product/createProduct";
import Dashboard from "./dashboard";
import ManageProduct from "../product/manageProduct";

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

    const handleCancelButtonClick = () => {
        setIsEditing(false)
    }

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

        // Use o estado para controlar qual componente deve ser exibido
        const [view, setView] = useState(<ManageProduct/>);

        // Função para trocar para a exibição de produtos
        function ProductButton() {
            setView(<CreateProduct/>);
        }
    
        // Função para trocar para a exibição de categorias
        function CategoriaButton() {
            setView(<CreateCategoria/>);
        }

    return (
        <div className="father-account">
        {userData && !isEditing && (
            <div className="menu-account">
                <h2 className="name-account"><b></b>{userData.name}</h2>
                <p className="text-account"><b>Endereço:</b> <br/>{userData.endereco}</p>
                <p className="text-account"><b>Telefone:</b> <br/>{userData.phone}</p>
                <p className="text-account"><b>Email:</b> <br/>{userData.email}</p>
                <p className="text-account"><b>Horário de Funcionamento</b>: <br/>{null}</p>
                <p className="text-account"><b>Tempo de entrega:</b> <br/>{userData.time}</p>
                <div>
                    <label className="labeltext-account"><b>Forma de Pagamento:</b>
                        <ul style={{ listStyleType: 'none', padding: 0 }} className="ultext-account">
                            {userData.payment.map((pagamento, index) => (
                            <li key={index} className="litext-account">{pagamento}</li>
                            ))}
                        </ul>
                    </label>
                </div>
                <p className="text-account"><b>Proprietário:</b> <br/>{userData.nameperson}</p>
                <div className="div-editButton-account">
                    <button onClick={handleEditButtonClick} className="editButton-account">Editar</button>
                </div>                 

            </div>
        )}
        {isEditing && (
            <div className="div-inputs-account">
                <input type="text" name="name" value={newUserData.name} onChange={handleInputChange} placeholder="Novo Nome" className="input-account" />
                <input type="text" name="endereco" value={newUserData.endereco} onChange={handleInputChange} placeholder="Novo Endereço" className="input-account" />
                <input type="text" name="phone" value={newUserData.phone} onChange={handleInputChange} placeholder="Novo Telefone" className="input-account" />
                <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} placeholder="Novo Email" className="input-account" />
                <input type="text" name="time" value={newUserData.time} onChange={handleInputChange} placeholder="Novo Horário" className="input-account" />
                <input type="text" name="payment" value={newUserData.payment} onChange={handleInputChange} placeholder="Nova Forma de Pagamento" className="input-account" />
                <input type="text" name="nameperson" value={newUserData.nameperson} onChange={handleInputChange} placeholder="Novo Nome da Pessoa" className="input-account" />
                <br/>
                <button onClick={handleUpdateUserData} className="salvar-account">Salvar</button>
                <button onClick={handleCancelButtonClick} className="cancel-account">Cancelar</button>
            </div>
        )}
    </div>        
    )
}

export default Account;