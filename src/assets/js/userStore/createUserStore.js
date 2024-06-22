import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateUserStore = () => {
    const navigate = useNavigate()
    //*===================== POST =====================*
    const [name, setName] = useState("");
    const [endereco, setEndereco] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [time, setTime] = useState("");
    const [payment, setPayment] = useState("");
    const [nameperson, setNamePerson] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [horarioDeFuncionamento, setHorarioDeFuncionamento] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const [imageKey, setImageKey] = useState('')
    const [selectedFile, setSelectedFile] = useState(null); //armazena o arquivo do upload

    const [popUpPositivo, setpopUpPositivo] = useState("");
    const [popUpNegativo, setpopUpNegativo] = useState("");


    // POST - Cria o usuário
    const createUserStore = (event) => {
        event.preventDefault()
        axios.post("https://api.fittreinoapp.com/userstore/criar", { name, endereco, phone, email, horarioDeFuncionamento, time, payment, nameperson, password, username, imageUrl, imageKey})
          .then((response) => {
            console.log(response.data);
            console.log("Funcionou");
            setpopUpPositivo("Conta criada com sucesso!");
            setTimeout(() => {
                setpopUpPositivo("")// Oculta o popup após 4 segundos
            }, 5000);
            setTimeout(() => {
                navigate('/login')// Navega após 3 segundos
            }, 2500);
          })
          .catch((error) => {
            console.error(error.response.data);
            console.error("Deu erro", error);
            setpopUpNegativo("Erro ao criar usuário!");
            setTimeout(() => setpopUpNegativo(""), 4000); // Oculta o popup após 3 segundos
            
        });
    };




    // PATCH - Edita apenas o imageKey e imageUrl no MongoDB
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

    // Delete - apaga a imagem do Amazon S3 
    const deleteImage = async () => {
        try {
          const response = await axios.delete(`https://api.fittreinoapp.com/delete/${imageKey}`)
          setImageUrl('')
          setImageKey('')
          editImageProduct('', '')
          console.log('Sucesso ao apagar imagem no Amazon S3')
        } catch (error) {
          console.error("Erro ao apagar imagem no Amazon S3", error)
        }
    }

    // POST - Envia a imagem para o Amazon S3
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

    function concatenar (){
        if (document.getElementById('dinheiro').checked) {
            var dinheiro = 'Dinheiro'
        }

        if (document.getElementById('cartao').checked) {
            var cartao = 'Cartão'
        }

        if (document.getElementById('pix').checked) {
            var pix = 'Pix'
        }

        var pagamento = dinheiro + ',' + cartao + ',' + pix
        setPayment(pagamento.split(','))
    }

    //Volta pra home
    const cancelar = () => {
        try {
            deleteImage()
            navigate('/')
        } catch (error) {
            console.error('Erro ao cancelar')
        }
    }

    const RedefinirPage = () => {
        navigate('/login')
    }

    return (
        <div className="father-createUserStore">
            <h1>Criar Conta</h1>
            <p className="esqueciSenha">Já possui conta? <a className="redefinir" onClick={RedefinirPage}>Entre aqui</a></p>
            <form className="form-createUser">
                <div className="divimage-createUserStore">
                    {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className="img-product-createUserStore" />} {/* Exibe a imagem se houver um link */}<br/>
                    <input type="file" onChange={handleFileChange} accept="image/*" className='fileUpload-upload_s3'/>
                    <div>
                    <button onClick={(e) => { e.preventDefault(); handleImageUpload()}} disabled={!selectedFile}>Confirmar imagem</button>
                    <button onClick={(e) => { e.preventDefault(); deleteImage() }}>Remover foto atual</button>
                    </div>
                </div>

                <div className="textfield">
                    <label className="labelnome-createUserStore"></label><br/>
                    <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="Nome empresarial"
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>                

                <div className="textfield">
                    <label className="labelnome-createUserStore"></label><br/>
                    <input
                        type="text"
                        className="inputtext-createUserStore"
                        placeholder="Nome pessoal"
                        onChange={(e) => setNamePerson(e.target.value)}
                    />
                </div>
                
                <div className="textfield">
                    <label className="labelnome-createUserStore"></label><br/>
                    <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="Endereço"
                    onChange={(e) => setEndereco(e.target.value)}
                    />
                </div>

                <div className="textfield">
                    <label className="labelnome-createUserStore">Whatsapp</label><br/>
                    <input
                        type="phone"
                        className="inputtext-createUserStore"
                        placeholder="(00) 0000-0000"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                
                <div className="textfield">
                    <label className="labelnome-createUserStore"></label><br/>
                    <input
                        type="email"
                        className="inputtext-createUserStore"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="textfield">
                    <label className="labelnome-createUserStore"></label><br/>
                    <input
                        type="text"
                        className="inputtext-createUserStore"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="divCreateButton-createUserStore">
                    <button onClick={createUserStore} className="button-createUserStore">Criar Conta</button>
                </div>
            </form>
            {popUpPositivo && (
                <div className="popupPositivo">
                    <p>{popUpPositivo}</p>
                </div>
            )}
            {popUpNegativo && (
                <div className="popupNegativo">
                    <p>{popUpNegativo}</p>
                </div>
            )}
        </div>
    )
}

export default CreateUserStore