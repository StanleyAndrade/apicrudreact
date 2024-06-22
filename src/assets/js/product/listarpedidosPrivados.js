import axios from "axios";
import React, {useState, useEffect} from "react";

const Listarpedidosprivados = () => {

    //*===================== GET - Exibe os produtos do carrinho =====================*
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [pedido, setPedido] = useState([])

    const getPedidos = () => {
        axios.get('https://api.fittreinoapp.com/pedidos')
        .then((response) => {
            setProducts(response.data);
            // Calcula o total ao carregar os pedidos
            const newTotal = response.data.reduce((acc, product) => acc + product.preco, 0);
            setTotal(Number(newTotal));
            
            const novoPedido = response.data.map((item) => ({
                nome: item.nome,
                descricao: item.descricao,
                preco: item.preco,
                sabores: item.sabores 
            }));
      
              // Atualiza o estado uma vez com todos os pedidos
                setPedido(novoPedido);
        })
        .catch((error) => {
            console.error('Erro ao buscar produtos:', error);
        });
    };

    useEffect(() => {
        // Realize a chamada para buscar os produtos quando o componente for montado.
        getPedidos();
    }, []);
    //*===================== GET - Exibe os produtos do carrinho =====================*


//*===================== Fechar pedido e enviar pelo whatsapp =====================*
const sendWhatsapp = () => {
    
//Mensagem do whatsapp
var zap = "https://wa.me/5521992002356?text="
var tudoJunto = `
*PIZZARIA DO 7 DE ABRIL*
_Estrada Santa Eugênia, 3000 ${null}_
www.sistemadepedido/pizzaria7deabril.html

*Nome:* Stanley Lucas Chagas de Andrade 
*Telefone:* 21992002356
*Endereço:* Estrada Santa Eugênia, 3000. Bloco 9, apto 401

*Tempo de entrega:* até ${null} minutos 

*PEDIDOS:*
${pedido.map(item => '*1x* ' +item.nome + ' R$' + item.preco + '\n' + item.descricao + ' ' + item.sabores).join('\n')}

*Método de pagamento:* ${null}
*Total:*

_Obs.: a taxa de entrega será passada pelo atendente. Agradecemos pela preferência. Obrigado._
`;    
    
//Transforma em texto de Whatsapp
tudoJunto = window.encodeURIComponent(tudoJunto);
    
//Concatena e exibe
var codigoTodo = zap + tudoJunto;
window.open(codigoTodo, '_self')
}
    
    
    //*===================== Fechar pedido e enviar pelo whatsapp =====================*



    //*===================== Delete - deletar item do carrinho =====================*
    const DeleteItem = (productId) => {
        axios.delete(`https://api.fittreinoapp.com/pedidos/${productId}`)
        .then(() => {
            getPedidos()
            console.log('Item apagado com sucesso')
        })
        .catch((error) => {
            console.log('Deu erro ao apagar: ', error)
            console.log(productId)
        })
    }
    //*===================== Delete - deletar item do carrinho =====================*



    //*===================== Delete - Esvaziar carrinho TODO =====================*
    const DeleteAll = () => {
        axios.delete(`https://api.fittreinoapp.com/pedidos`)
        .then(() => {
            getPedidos()
            console.log('Tudo apagado com sucesso')
        })
        .catch((error) => {
            console.log('Deu erro ao apagar tudo: ', error)
        })
    }
    //*===================== Delete - Esvaziar carrinho TODO =====================*

    return(
        <div>
            <span id="teste"></span>
            <h1>Seu carrinho</h1>
            <span id="showcart"></span>
            {products.map((product) => (
            <div key={product._id}>
                <p>{product.nome}</p>
                <p>{product.descricao}</p>
                <p>{product.tamanhos}</p>
                <p>{product.sabores}</p>
                <p>R${product.preco}</p>
                <input type="text" placeholder="Digite as obervações aqui"></input>
                <button onClick={() => DeleteItem(product._id)}>Tirar item do carrinho</button>
                
                <p>______________________</p>
                {/* Renderize outros detalhes do produto */}
            </div>
            ))}
            <p>Total: R${total}</p>
            <button onClick={getPedidos}>Atualizar Carrinho</button><br/>
            <button onClick={DeleteAll}>Esvaziar Carrinho</button><br/>
            <button onClick={sendWhatsapp}>Fazer pedido</button><br/>
      </div>
        )
}

export default Listarpedidosprivados