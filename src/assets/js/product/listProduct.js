import axios from "axios";
import React, {useState, useEffect} from "react";

const ListProduct = () => {

    //*===================== GET - Exibe os produtos =====================*
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        axios.get('http://localhost:8080/api/produtos')
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error('Erro ao buscar produtos:', error);
        });
    };

    useEffect(() => {
        // Realize a chamada para buscar os produtos quando o componente for montado.
        getProducts();
    }, []);
    //*===================== GET - Exibe os produtos =====================*


    //*===================== Carrinho - coloca no model Pedidos =====================*
    const addToCart = (productNome, productDescricao, productTamanhos, productSabores, productPreco) => {
        axios.post('http://localhost:8080/pedidos', {
            nome: productNome,
            descricao: productDescricao,
            tamanhos: productTamanhos,
            sabores: productSabores,
            preco: productPreco,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Erro ao adicionar ao carrinho', error)
        })
    };
    //*===================== Carrinho - coloca no model Pedidos =====================*

    return(
        <div>
            <h1>Nossos Produtos</h1>
            <span id="showcart"></span>
            {products.map((product) => (
            <div key={product._id}>
                <p>{product.nome}</p>
                <p>{product.descricao}</p>
                <p>R${product.preco}</p>
                <p>{product.tamanhos}</p>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {product.sabores.map((sabor, index) => (
                        <li key={index}>{sabor}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => addToCart(product.nome, product.descricao, product.tamanhos, product.sabores, product.preco)}>Colocar no Carrinho</button>
                <p>______________________</p>
                {/* Renderize outros detalhes do produto */}
            </div>
            ))}
      </div>
    )
}

export default ListProduct