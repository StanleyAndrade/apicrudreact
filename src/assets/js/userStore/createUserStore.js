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

    const createUserStore = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/userstore/criar", { name, endereco, phone, email, horarioDeFuncionamento, time, payment, nameperson, password, username})
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
        <div className="father-createUserStore">
            <h1>Cadastrar Loja</h1>
            <form>
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

                <button onClick={createUserStore} className="button-createUserStore">Criar Conta</button>
            </form>
        </div>
    )
}

export default CreateUserStore