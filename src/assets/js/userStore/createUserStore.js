import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../s3/upload_s3";

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

    // POST - Cria o usuário
    const createUserStore = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/userstore/criar", { name, endereco, phone, email, horarioDeFuncionamento, time, payment, nameperson, password, username, imageUrl, imageKey})
          .then((response) => {
            console.log(response.data);
            console.log("Funcionou");
            navigate('/')
          })
          .catch((error) => {
            console.error(error.response.data);
            console.error("Deu erro", error);
        });
    };

    // PATCH - Edita apenas o imageKey e imageUrl no MongoDB
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

    // Delete - apaga a imagem do Amazon S3 
    const deleteImage = async () => {
        try {
          const response = await axios.delete(`http://localhost:8080/delete/${imageKey}`)
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

    return (
        <div className="father-createUserStore">
            <h1>Cadastrar Loja</h1>
            <form>
                <div className="divimage-createUserStore">
                    {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className="img-product-createUserStore" />} {/* Exibe a imagem se houver um link */}<br/>
                    <input type="file" onChange={handleFileChange} accept="image/*" className='fileUpload-upload_s3'/>
                    <div>
                    <button onClick={(e) => { e.preventDefault(); handleImageUpload()}} disabled={!selectedFile}>Confirmar imagem</button>
                    <button onClick={(e) => { e.preventDefault(); deleteImage() }}>Remover foto atual</button>
                    </div>
                </div>

                <br/>
                <br/>                                      
                <label className="labelnome-createUserStore">Qual o nome da sua loja?</label><br/>
                <input
                type="text"
                className="inputtext-createUserStore"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                /><br/><br/>

                <label className="labelnome-createUserStore">Nome de usuário minusculo e sem espaço <br/>Exemplo: <b>www.delivery.com/nomedasualoja</b></label><br/>
                <input
                type="text"
                className="inputtext-createUserStore"
                placeholder="Exemplo: nomedasualoja"
                onChange={(e) => setUsername(e.target.value)}
                /><br/><br/>

                <label className="labelnome-createUserStore">Endereço da loja</label><br/>
                <input
                type="text"
                className="inputtext-createUserStore"
                placeholder="Endereço"
                onChange={(e) => setEndereco(e.target.value)}
                /><br/><br/>

                <label className="labelnome-createUserStore">Qual whatsapp deseja receber os pedidos?</label><br/>
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="(00) 0000-0000"
                    onChange={(e) => setPhone(e.target.value)}
                /><br/><br/>

                <label className="labelnome-createUserStore">Email pra fazer login</label><br/>
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder=""
                    onChange={(e) => setEmail(e.target.value)}
                /><br/><br/>
                
                <label className="labelnome-createUserStore"> Horário de atendimento </label> <br/>
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="Exemplo: Das 17h as 00h"
                    onChange={(e) => setHorarioDeFuncionamento(e.target.value)}
                /><br/><br/>

                <label className="labelnome-createUserStore"> Tempo de entrega do pedido </label> <br/> 
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="Exemplo: 40 minutos a 1 hora"
                    onChange={(e) => setTime(e.target.value)}
                /><br />

                <p className="labelnome-createUserStore">Marque as formas de pagamento aceitas pela loja</p>
                <label><input id="dinheiro" type="checkbox"onChange={(e) => concatenar()} ></input>Dinheiro</label>
                <label><input id="cartao" type="checkbox"onChange={(e) => concatenar()} ></input>Cartão</label>
                <label><input id="pix" type="checkbox"onChange={(e) => concatenar()} ></input>Pix</label>
                <br/><br/>

                <label className="labelnome-createUserStore">Nomes do Proprietários separado por vírgula</label><br/>
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder="Exemplo: João Lucas, Fabiane"
                    onChange={(e) => setNamePerson(e.target.value)}
                /><br /><br/>

                <label className="labelnome-createUserStore">Senha</label><br/>
                <input
                    type="text"
                    className="inputtext-createUserStore"
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <div className="divCreateButton-createUserStore">
                    <button onClick={createUserStore} className="button-createUserStore">Criar Conta</button>
                    <button onClick={cancelar} className="button-createUserStore">Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUserStore