import axios from "axios";
import React, {useState, useEffect} from "react";

const ManageProduct = () => {
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editedProduct, setEditedProduct] = useState({
      nome: '',
      descricao: '',
      tamanhos: '',
      sabores: '',
      preco: '',
      userid: '',
      imageUrl: '',
      imageKey: '',
      categoria: '',
    })

    const [isEditing, setIsEditing] = useState(false); 
    const [editingProductId, setEditingProductId] = useState();

    const handleCancelButtonClick = () => {
        setIsEditing(false)
    }

    // Função para buscar todos os produtos
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/produtos`)
        setProducts(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos', error)
      }
    }

    const getProductsByCategory = async (categoryId) => {
      try {
        if (categoryId) {
          const response = await axios.get(`http://localhost:8080/produtos/${categoryId}`);
          setProducts(response.data);
        } else {
          const response = await axios.get('http://localhost:8080/api/produtos');
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos por categoria", error)
      }
    };

    // Função pra buscar todas as categorias
    const getAllCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categorias')
        setCategories(response.data)
      } catch (error) {
        console.error("Erro ao buscar categorias", error)
      }
    }

    useEffect(() => {
        // Realize a chamada para buscar os produtos quando o componente for montado.
        getAllCategories()
        getAllProducts();
    }, []);

    // Função para manipular a mudança de categoria
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value)
      getProductsByCategory(event.target.value)
    }

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


    //oculta e exibe o formulário
    const [editingProduct, setEditingProduct] = useState(null)

    //*===================== PATCH =====================*
    //consumindo API
    const editProduct = (event) => {
      event.preventDefault()
      axios.patch(`http://localhost:8080/api/produtos/${editingProduct._id}`, editedProduct)
      .then((response) => {
      getAllProducts()
      setEditingProduct(null)
      setEditedProduct({
        nome: '',
        descricao: '',
        tamanhos: '',
        sabores: '',
        preco: '',
        userid: '',
        imageUrl: '',
        imageKey: '',
        categoria: '',
      })
      })
      .catch((error) => {
        console.error('Erro ao atualizar produto: ', error)
      })
    }

    //Abre o formulário e preenche os inputs
    const openEditForm = (product) => {
      if (product) {
        setEditingProduct(product)
        setEditedProduct({
          nome: product.nome,
          descricao: product.descricao,
          tamanhos: product.tamanhos,
          sabores: product.sabores,
          preco: product.preco,
        })
        setIsEditing(true);
        setEditingProductId(product._id); // Armazena o ID do produto que está sendo editado
        
        console.log('Onde está ' + editingProductId)
      }
    }
    
    //*===================== PATCH =====================*



    //*===================== DELETE =====================*
    const deleteProduct = (productId) => {
      axios.delete(`http://localhost:8080/api/produtos/${productId}`)
      .then(() => {
        getAllProducts()
      })
      .catch((error) => {
        console.error('Erro ao apagar produto: ', error)
      })
    }
    //*===================== DELETE =====================*



    return(
      <div className="manageProduct-father"> 
          {products && (
                        <div className="dadosExibidos-manageProduct">
                        <h1 className="title-manageProduct">Meus produtos</h1>
                        {/* Dropdown de Categorias */}
                        <select value={selectedCategory} onChange={handleCategoryChange} className="select-categorias-manageProduct">
                          <option value="" className="option-categorias-manageProduct">Todas as Categorias</option>
                          {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.nome}</option>
                          ))}
                        </select>
                          
                        {categories.map(category => (
                          <div key={category._id}>
                            <h2>{category.nome}</h2>
          
                            <div className="product-container">
                              {products.filter(product => product.categoria === category._id)
                              .map((product, index) => (
                                <div key={product._id} className="product-item">
                                  {editingProductId !== product._id && ( // Verifica se este produto está em modo de edição
                                    <>
                                      <img src={product.imageUrl} className="img-product-manageProduct"/>
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
                                      <div className="div-buttons-manageProduct">
                                        <button onClick={() => openEditForm(product)} className="editButton-manageProduct">Editar</button>
                                        <button onClick={() => deleteProduct(product._id)} className="deleteButton-manageProduct">Apagar</button>
                                      </div>
                                    </>
                                  )}
                                  {editingProductId === product._id && (
                                    <div className="inputEdit-manageProduct">
                                      <h2>Editar Produto</h2>
                                      <form onSubmit={editProduct}>
                                        <input type="hidden" value={editingProduct._id} />
                                        <label htmlFor="edit-nome">Nome do Produto: </label>
                                        <input
                                          type="text"
                                          id="edit-nome"
                                          required
                                          value={editedProduct.nome}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, nome: e.target.value })}
                                        /><br />
                                        <label htmlFor="edit-preco">Preço: </label>
                                        <input
                                          type="text"
                                          id="edit-preco"
                                          required
                                          value={editedProduct.preco}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, preco: e.target.value })}
                                        /><br />
                                        <label htmlFor="edit-descricao">Descrição: </label>
                                        <input
                                          type="text"
                                          id="edit-descricao"
                                          value={editedProduct.descricao}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, descricao: e.target.value })}
                                        /><br />
                                        <label htmlFor="edit-tamanhos">Tamanhos: </label>
                                        <input
                                          type="text"
                                          id="edit-tamanhos"
                                          value={editedProduct.tamanhos}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, tamanhos: e.target.value })}
                                        /><br />
                                        <label htmlFor="edit-sabores">Sabores: </label>
                                        <input
                                          type="text"
                                          id="edit-sabores"
                                          value={editedProduct.sabores}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, sabores: e.target.value })}
                                        /><br />
                                        <button type="submit">Salvar</button>
                                      </form>
                                      <button onClick={handleCancelButtonClick}>Cancelar Alteração</button>
                                    </div>
                                  )}
                                </div>
                                
                              ))}
                            </div>
          
                          </div>
                        ))}
                      </div>
          )}
      </div>
    )
}

export default ManageProduct