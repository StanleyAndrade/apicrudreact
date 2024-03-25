import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Account = () => {
    const [imageKey, setImageKey] = useState('') //armazena key da imagem
    const [imageUrl, setImageUrl] = useState('') //armazena Url da imagem
    const [selectedFile, setSelectedFile] = useState(null); //armazena o arquivo do upload
    const [userData, setUserData] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: "",
        endereco: "",
        phone: "",
        email: "",
        horarioDeFuncionamento: "",
        time: "",
        payment: "",
        nameperson: "",
        username: "",
        imageUrl: '',
        imageKey: '',
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    const handleCancelButtonClick = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/protected/userstore/buscar", {
                    headers: { Authorization: `${localStorage.getItem("token")}` }
                });
                setUserData(response.data.userData);
                setNewUserData(response.data.userData); // Passa os dados do usuário para os inputs
                setImageKey(response.data.userData.imageKey)
                setImageUrl(response.data.userData.imageUrl)
                //console.log('Id é ', userData._id)
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
            const response = await axios.patch("http://localhost:8080/protected/userstore/editar", newUserData, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setUserData(response.data.userData);
            setIsEditing(false);
            alert("Dados do usuário atualizados com sucesso!");
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
              const response = await axios.post('http://localhost:8080/upload', formData, {
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
            const response = await axios.patch('http://localhost:8080/protected/userstore/editar', dataImage,  {
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
          const response = await axios.delete(`http://localhost:8080/delete/${userData.imageKey}`)
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
                <img src={userData.imageUrl} className="img-account"/>
                <h2 className="name-account"><b></b>{userData.name}</h2>
                <div className="divshareLink-account">
                    <h5>http://localhost:3000/{userData.username}</h5>
                    <button onClick={handleShareButtonClick} className="share-button">Compartilhar Link da Loja</button>
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

                <div className="div-editButton-account">
                    <button onClick={handleEditButtonClick} className="editButton-account">Meus Dados</button>
                </div>                 

            </div>
        )}
        {isEditing && (
            <div className="div-inputs-account">
                {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className="imgEdit-account" />} {/* Exibe a imagem se houver um link */}
                <input type="file" onChange={handleFileChange} accept="image/*" className='fileUpload-upload_s3'/>
                <div>
                    <button onClick={(e) => { e.preventDefault(); handleImageUpload()}} disabled={!selectedFile}>Confirmar imagem</button>
                    <button onClick={(e) => { e.preventDefault(); deleteImage() }}>Remover foto atual</button>
                </div>
                <br/>
                <input type="text" name="name" value={newUserData.name} onChange={handleInputChange} placeholder="Novo Nome" className="input-account" />
                <input type="text" name="endereco" value={newUserData.endereco} onChange={handleInputChange} placeholder="Novo Endereço" className="input-account" />
                <input type="text" name="phone" value={newUserData.phone} onChange={handleInputChange} placeholder="Novo Telefone" className="input-account" />
                <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} placeholder="Novo Email" className="input-account" />
                <input type="text" name="horarioDeFuncionamento" value={newUserData.horarioDeFuncionamento} onChange={handleInputChange} placeholder="Novo Horário de Funcionamento" className="input-account" />
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