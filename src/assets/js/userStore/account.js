import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";


const Account = () => {
    const [imageKey, setImageKey] = useState('') //armazena key da imagem
    const [imageUrl, setImageUrl] = useState('') //armazena Url da imagem
    const [selectedFile, setSelectedFile] = useState(null); //armazena o arquivo do upload
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [newUserData, setNewUserData] = useState({
        name: "",
        endereco: "",
        phone: "",
        email: "",
        nameperson: "",
    });
    const [popUpPositivo, setpopUpPositivo] = useState("");
    const [popUpNegativo, setpopUpNegativo] = useState("");

    const clearLocalStorage = () => {
        localStorage.clear();
        navigate('/')
    };
    
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    const handleCancelButtonClick = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://api.fittreinoapp.com/protected/userstore/buscar", {
                    headers: { Authorization: `${localStorage.getItem("token")}` }
                });
                localStorage.setItem('userStorename', response.data.userData.name)
                localStorage.setItem('userStoreendereco', response.data.userData.endereco)
                localStorage.setItem('userStoreid', response.data.userData._id)
                setUserData(response.data.userData);
                setNewUserData(response.data.userData); // Passa os dados do usuário para os inputs
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
                navigate("/");
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

    const handleUpdateUserData = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.patch("https://api.fittreinoapp.com/protected/userstore/editar", newUserData, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setUserData(response.data.userData);
            setIsEditing(false);
        } catch (error) {
            console.error("Erro ao atualizar os dados do usuário:", error);
        }
    }

    const handleShareButtonClick = () => {
        // Implemente a lógica para compartilhar o URL da loja aqui
        // Por exemplo, você pode abrir uma janela de compartilhamento nativa do navegador
        const shareURL = `http://localhost:3000/${userData.username}`;
        if (navigator.share) {
            navigator.share({
                title: 'Compartilhar link da loja',
                url: shareURL
            }).then(() => {
                console.log('Link compartilhado com sucesso!');
            }).catch((error) => {
                console.error('Erro ao compartilhar link:', error);
            });
        } else {
            console.log('API de compartilhamento não suportada.');
            // Aqui você pode fornecer um fallback ou mensagem de erro caso a API de compartilhamento não seja suportada
        }
    }

    // Upload da imagem
    //*===================== UPLOAD da Image no S3 =====================*
    const handleImageUpload = async () => {
        try {
          // Apaga a imagem atual
          deleteImage()
  
            // Faz o Upload da imagem
            try {
              const formData = new FormData()
              formData.append('file', selectedFile)
              const response = await axios.post('https://api.fittreinoapp.com/upload', formData, {
                      headers: {'Content-Type': 'multipart/form-data',}
              });
              const newImageUrl = response.data.imageUrl
              const newImageKey = response.data.imageKey
              setImageUrl(newImageUrl)
              setImageKey(newImageKey)
              editImageProduct(newImageUrl, newImageKey) // Envia url e key pra pacht da imagem
              console.log('Sucesso ao enviar imagem para o Amazon S3.', ' Nova url: ' + newImageUrl, ' Nova key: ' + newImageKey);
            } catch (error) {
              console.error('Erro ao Enviar imagem para o Amazon S3')
            }
        } catch (error) {
          console.error('Erro ao apagar imagem atual do Amazon S3:', error);
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    //*===================== Patch da Image no MongoDB =====================*
    const editImageProduct = async (url, key) => {
        try {
            const dataImage = {imageUrl: url, imageKey: key}
            const response = await axios.patch('https://api.fittreinoapp.com/protected/userstore/editar', dataImage,  {
            headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            console.log('Sucesso ao atualizar Imagem (url e key) no MongoDB')
        } catch (error) {
            console.log('Erro ao atualizar imagem (url e key) no MongoDB', error)
        }
    }
        //*===================== Patch da Image no MongoDB =====================*

     //*===================== DELETE - Image =====================*
     const deleteImage = async () => {
        try {
          const response = await axios.delete(`https://api.fittreinoapp.com/delete/${userData.imageKey}`)
          setImageUrl('')
          setImageKey('')
          editImageProduct('', '')
          console.log('Sucesso ao apagar imagem no Amazon S3')
          console.log('Teste ' + imageKey)
        } catch (error) {
          console.error("Erro ao apagar imagem no Amazon S3", error)
          console.log('Teste ' + imageKey)
        }
    }

    return (
        <div className="father-account">
        {userData && !isEditing && (
            <div className="menu-account">
                <div className="user-profile">
                    <div className="profile-info">
                        <FaUserCircle className="profile-icon" />
                        <div className="user-info">
                            <h3>{userData.name}</h3>
                            <p>{userData.email}</p>
                            <button onClick={handleEditButtonClick} className="editButton-account">Editar</button>
                        </div>
                    </div>
                    <div className="settings">
                        {isLoggedIn && ( // Corrigido aqui
                            <button className="bottom-bar-button" onClick={clearLocalStorage}>
                                <IoIosLogOut className="profile-icon-logout" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="completdata">
                    <p className="text-account"><b>Endereço:</b> <br/>{userData.endereco}</p>
                    <p className="text-account"><b>Telefone:</b> <br/>{userData.phone}</p>
                    <p className="text-account"><b>Email:</b> <br/>{userData.email}</p>
                    <p className="text-account"><b>Horário de Funcionamento</b>: <br/>{userData.horarioDeFuncionamento}</p>
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
                </div>

                                 

            </div>
        )}
        {isEditing && (
            <div className="div-inputs-account">
                {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className="imgEdit-account" />} {/* Exibe a imagem se houver um link */}
                
                <br/>
                <input type="text" name="name" value={newUserData.name} onChange={handleInputChange} placeholder="Novo Nome" className="input-account" />
                <input type="text" name="endereco" value={newUserData.endereco} onChange={handleInputChange} placeholder="Novo Endereço" className="input-account" />
                <input type="text" name="phone" value={newUserData.phone} onChange={handleInputChange} placeholder="Novo Telefone" className="input-account" />
                <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} placeholder="Novo Email" className="input-account" />
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