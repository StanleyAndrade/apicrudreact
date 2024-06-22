import axios from "axios";
import React, { useState, useEffect } from "react";

const ListProductNew = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Função para buscar todos os produtos
  const getAllProducts = async () => {
    try {
      const response = await axios.get('https://api.fittreinoapp.com/produtos/buscar');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para buscar produtos por categoria
  const getProductsByCategory = async (categoryId) => {
    try {
      if (categoryId) {
        const response = await axios.get(`https://api.fittreinoapp.com/produtos/${categoryId}`);
        setProducts(response.data);
      } else {
        const response = await axios.get('https://api.fittreinoapp.com/produtos/buscar');
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos por categoria", error)
    }
  };

  // Função para buscar todas as categorias
  const getAllCategories = async () => {
    try {
      const response = await axios.get('https://api.fittreinoapp.com/categorias/buscar');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    // Realize a chamada para buscar todas as categorias quando o componente for montado.
    getAllCategories();
    // Realize a chamada para buscar todos os produtos quando o componente for montado.
    getAllProducts();
  }, []);


  // Função para lidar com a mudança de categoria selecionada
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    getProductsByCategory(event.target.value);
  };

  //*===================== Carrinho - coloca no model Pedidos =====================*
  const addToCart = (productNome, productDescricao, productTamanhos, productSabores, productPreco) => {
    axios.post('https://api.fittreinoapp.com/pedidos', {
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

  return (
    <div>
      <h1>Nossos Produtos</h1>
      {/* Dropdown de Categorias */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todas as Categorias</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.nome}</option>
        ))}
      </select>

      {categories.map(category => (
        <div key={category._id}>
          <h2>{category.nome}</h2>
          {products
            .filter(product => product.categoria === category._id)
            .map((product) => (
              <div key={product._id}>
                <p>{product.imageUrl}</p>
                <p>{product.nome}</p>
                <p>{product.descricao}</p>
                <p>R${product.preco}</p>
                <div>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {product.tamanhos.map((tamanho, index) => (
                      <li key={index}>{tamanho}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {product.sabores.map((sabor, index) => (
                      <li key={index}>{sabor}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => addToCart(product.nome, product.descricao, product.tamanhos, product.sabores, product.preco)}>Colocar no Carrinho</button>
                {/* Renderize outros detalhes do produto */}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ListProductNew;
