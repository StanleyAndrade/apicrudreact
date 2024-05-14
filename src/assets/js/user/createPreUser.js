import React, {useState} from "react";
import axios from "axios";
import foto from '/ProjetosVScode/frontend-userStore-gym/src/assets/img/ok.webp'

const CreatePreUser = () => {
    //*===================== POST =====================*
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setcheckEmail] = useState("")
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("");
    const [showFormCreate, setShowFormCreate] = useState(true);

    const createUser = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/user/criar", { name, phone, email, password, username})
            localStorage.setItem('AlunoUserName', name)
            localStorage.setItem('AlunoUserEmail', email)
            localStorage.setItem('AlunoUserid', response.data.user._id)
            localStorage.setItem('AlunoUsername', response.data.user.username)
            localStorage.setItem('userPhone', phone)
            setShowFormCreate(false)
            console.log('Sucesso ao criar Pré usuário')
        } catch (error) {
            console.log('Erro ao criar Pré usuário')
        }
    };

    // Checar pelo email
    const checkEmailUser = async (event) => {
        event.preventDefault();

        // Suponha que o e-mail esteja armazenado em uma variável chamada 'checkEmail'
        const email = checkEmail;

        try {
            const response = await axios.get(`http://localhost:8080/user/${email}`);
            
            // Se o usuário foi encontrado, você pode acessar seus dados na resposta
            const userId = response.data._id;
            const getEmail = response.data.email
            const getName = response.data.name
            const getUsername = response.data.username
            const getUserPhone = response.data.phone
            
            // Armazene o _id do usuário no localStorage ou faça o que precisar com ele
            localStorage.setItem('AlunoUserName', getName)
            localStorage.setItem('AlunoUserEmail', getEmail)
            localStorage.setItem('AlunoUserid', userId);
            localStorage.setItem('AlunoUsername', getUsername)
            localStorage.setItem('userPhone', getUserPhone)
            
            
            console.log('Sucesso ao buscar usuário');
            setShowFormCreate(false)
        } catch (error) {
            console.error('Erro ao buscar usuário', error);
        }
    };

    return (
        <div>
            
            {showFormCreate ? (
                <div className="father-createProduct">
                    <h3 className="title-createProduct">Passo 1 <br/> Dados do Aluno</h3>
                    <div className="createAccount">
                        <form>
                            <p>Usuário sem cadastro na Gym</p>
                            <input
                            className="inputtext-createProduct"
                            type="text"
                            placeholder="Nome"
                            onChange={(e) => setName(e.target.value)}
                            /><br />
                            <input
                            className="inputtext-createProduct"
                                type="text"
                                placeholder="(00) 0000-0000"
                                onChange={(e) => setPhone(e.target.value)}
                            /><br />
                            <input
                            className="inputtext-createProduct"
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            /><br />
                            <p>Nome de Usuário</p>
                            <input
                            className="inputtext-createProduct"
                                type="text"
                                placeholder="nomedeusuario"
                                onChange={(e) => setusername(e.target.value)}
                            /><br />
                            <button onClick={createUser} className="createButton-createProductNew">Cadastrar</button>
                        </form>
                    </div>
                    <div className="searchEmail">
                        <p>Usuário cadastrado na Gym</p>
                        <form>
                            <input
                            className="inputtext-createProduct"
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setcheckEmail(e.target.value)}
                            /><br />
                            <button onClick={checkEmailUser} className="createButton-createProductNew">Encontrar</button>
                        </form>
                    </div>
                </div>
            ) : (
                <img src={foto} className="foto-Ok"></img>
            )}
        </div>
    )
}

export default CreatePreUser