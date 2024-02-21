import React, {useState} from "react";
import axios from "axios";

const CreateUserStore = () => {
    //*===================== POST =====================*
    const [name, setName] = useState("");
    const [endereco, setEndereco] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [time, setTime] = useState("");
    const [payment, setPayment] = useState("");
    const [nameperson, setNamePerson] = useState("");
    const [password, setPassword] = useState("");

    const createUserStore = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/register/store", { name, endereco, phone, email, time, payment, nameperson, password})
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

    return (
        <div>
            <h1>Cadastrar Estabelecimento</h1>
            <form>
                <input
                type="text"
                placeholder="Nome do Estabelecimento"
                onChange={(e) => setName(e.target.value)}
                /><br />
                <input
                type="text"
                placeholder="Endereço"
                onChange={(e) => setEndereco(e.target.value)}
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
                <label> Tempo de entrega do pedido
                <input
                    type="text"
                    placeholder="Exemplo: 40 minutos, 1 hora"
                    onChange={(e) => setTime(e.target.value)}
                /></label><br />
                <p>Formas de pagamento aceitas pelo estabelecimento</p>
                <label><input id="dinheiro" type="checkbox"onChange={(e) => concatenar()} ></input>Dinheiro</label>
                <label><input id="cartao" type="checkbox"onChange={(e) => concatenar()} ></input>Cartão</label>
                <label><input id="pix" type="checkbox"onChange={(e) => concatenar()} ></input>Pix</label>
                <br/>
                <input
                    type="text"
                    placeholder="Nome do proprietário"
                    onChange={(e) => setNamePerson(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button onClick={createUserStore}>Criar</button>
            </form>
        </div>
    )
}

export default CreateUserStore