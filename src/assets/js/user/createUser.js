import React, {useState} from "react";
import axios from "axios";

const CreateUser = () => {
    //*===================== POST =====================*
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/register", { name, phone, nascimento, email, password})
          .then((response) => {
            console.log(response.data);
            console.log("Funcionou"); 
          })
          .catch((error) => {
            console.error(error.response.data);
            console.error("Deu erro", error);
          });
    };
    //*===================== POST =====================*

    return (
        <div>
            <h1>Cadastrar usuário</h1>
            <form>
                <input
                type="text"
                placeholder="nome"
                onChange={(e) => setName(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Nascimento"
                    onChange={(e) => setNascimento(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="(00) 0000-0000"
                    onChange={(e) => setPhone(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button onClick={createUser}>Criar</button>
            </form>
        </div>
    )
}

export default CreateUser