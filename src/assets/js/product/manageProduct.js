import axios from "axios";
import React, {useState, useEffect} from "react";
import ImageUpload from "../s3/upload_s3";

const ManageProduct = () => {
    const [userId, setUserId] = useState('')
    const [products, setProducts] = useState([]); // Armazena os dados do produto
    const [categories, setCategories] = useState([]); // Armazena dados da categoria
    const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selecionada
    const [imageKey, setImageKey] = useState('') //armazena key da imagem
    const [imageUrl, setImageUrl] = useState('') //armazena Url da imagem
    const [editingProductId, setEditingProductId] = useState(null); //recebe o id do produto que está sendo editado e serve pra abrir e fechar o formulário
    const [editingProduct, setEditingProduct] = useState(null) // Estado que oculta e exibe o formulário
    const [selectedFile, setSelectedFile] = useState(null); //armazena o arquivo do upload
    const [editedProduct, setEditedProduct] = useState({ // Estado que armazena os dados editados
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

    const fetchData = async () => {
      try {
        // Aqui você precisa passar o email na URL como um parâmetro de consulta (query parameter)
        const response = await axios.get('http://localhost:8080/protected/userstore/buscar', {
                  headers: { Authorization: `${localStorage.getItem("token")}` }
        });
        const getid = response.data.userData._id
        setUserId(getid)

        // Pega os produtos
        const responseProducts = await axios.get(`http://localhost:8080/produtos/user/${response.data.userData._id}`);
        setProducts(responseProducts.data);

        // Pega as categorias
        const responseCategories = await axios.get(`http://localhost:8080/categorias/user/${response.data.userData._id}`);
        setCategories(responseCategories.data);

      } catch (error) {
        console.error('Deu erro:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleCategoryChange = async (categoryId) => {
      try {
          setSelectedCategory(categoryId);
          if (categoryId) {
              const response = await axios.get(`http://localhost:8080/produtos/${categoryId}/${userId}`);
              setProducts(response.data);
              console.log('Sucesso ao buscar produtos por categoria no MongoDB')
          } else {
              const response = await axios.get(`http://localhost:8080/produtos/user/${userId}`);
              setProducts(response.data);
              console.log('Sucesso 2 ao buscar produtos por categoria no MongoDB')
          }
      } catch (error) {
          console.error("Erro ao buscar produtos por categoria", error);
      }
  };

    //*===================== PATCH =====================*
    const editProduct = (event) => {
      event.preventDefault()
      axios.patch(`http://localhost:8080/produtos/editar/${editingProduct._id}`, editedProduct)
      .then((response) => {
      //getAllProducts()
      fetchData()
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
      setEditingProductId(false)
      console.log('Sucesso ao atualizar produto no MongoDB', response.data)
      })
      .catch((error) => {
        console.error('Erro ao atualizar produto no MongoDB: ', error)
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
          imageUrl: product.imageUrl,
          imageKey: product.imageKey, // Preenche o campo da chave da imagem
        })
        const getimageUrl = product.imageUrl
        const getimageKey = product.imageKey
        setImageUrl(getimageUrl) // passa a url do MongoDB para a "imageUrl"
        setImageKey(getimageKey) // passa a key do MongoDB para a "imageKey"
        setEditingProductId(product._id); // Armazena o ID do produto que está sendo editado
      }
    }

    // Função que fecha o formulário de edição quando clica em "cancelar"
    const handleCancelButtonClick = () => {
      setEditingProductId(false)
    }
    //*===================== PATCH =====================*

    //*===================== Patch da Image no MongoDB =====================*
    const editImageProduct = async (url, key) => {
      try {
        const response = await axios.patch(`http://localhost:8080/produtos/editar/${editingProduct._id}`, {
          imageUrl: url,
          imageKey: key
        })
        console.log('Sucesso ao atualizar Imagem (url e key) no MongoDB')
      } catch (error) {
        console.log('Erro ao atualizar imagem (url e key) no MongoDB', error)
      }
    }
    //*===================== Patch da Image no MongoDB =====================*


    //*===================== DELETE - Product =====================*
    const deleteProduct = (productId) => {
      axios.delete(`http://localhost:8080/produtos/deletar/${productId}`)
      .then(() => {
        //getAllProducts()
        fetchData();
        console.log('Sucesso ao apagar produto no MongoDB')
      })
      .catch((error) => {
        console.error('Erro ao apagar produto do MongoDB: ', error)
      })
    }
    //*===================== DELETE - Product =====================*



    //*===================== DELETE - Image =====================*
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
    //*===================== DELETE - Image =====================*

    //*===================== UPLOAD da Image no S3 =====================*
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
    //*===================== UPLOAD da Image no S3 =====================*





    return(
      <div className="manageProduct-father"> 
          {products && ( // renderização condicional
                        <div className="dadosExibidos-manageProduct">
                        <h1 className="title-manageProduct">Meus produtos</h1>
                        {/* Dropdown de Categorias */}
                        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="select-categorias-manageProduct">
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
                                  {editingProductId !== product._id && ( //Se o id dos dois for diferente, exibe o código entre ( )
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

                                  

                                  {editingProductId === product._id && ( // Se o id for igual, exibe o código entre ( )
                                    <div className="inputEdit-manageProduct">
                                      <form onSubmit={editProduct}>
                                        {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className="img-product-manageProduct" />} {/* Exibe a imagem se houver um link */}
                                        <input type="file" onChange={handleFileChange} accept="image/*" className='fileUpload-upload_s3'/>
                                        <div>
                                            <button onClick={(e) => { e.preventDefault(); handleImageUpload()}} disabled={!selectedFile}>Confirmar imagem</button>
                                            <button onClick={(e) => { e.preventDefault(); deleteImage() }}>Remover foto atual</button>
                                        </div>
                                        <br/>
                                        <br/>                                      
                                        <input type="hidden"/>
                                        <label htmlFor="edit-nome">Nome do Produto: </label>
                                        <input
                                          className="input-manageProduct"
                                          type="text"
                                          id="edit-nome"
                                          required
                                          value={editedProduct.nome}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, nome: e.target.value })}
                                        /><br />
                                        
                                        <label htmlFor="edit-descricao">Descrição: </label>
                                        <input
                                          className="input-manageProduct"
                                          type="text"
                                          id="edit-descricao"
                                          value={editedProduct.descricao}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, descricao: e.target.value })}
                                        /><br />

                                        <label htmlFor="edit-preco">Preço: </label>
                                        <input
                                          className="input-manageProduct"
                                          type="text"
                                          id="edit-preco"
                                          required
                                          value={editedProduct.preco}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, preco: e.target.value })}
                                        /><br />

                                        <label htmlFor="edit-tamanhos">Tamanhos: </label>
                                        <input
                                          className="input-manageProduct"
                                          type="text"
                                          id="edit-tamanhos"
                                          value={editedProduct.tamanhos}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, tamanhos: e.target.value })}
                                        /><br />
                                        <label htmlFor="edit-sabores">Sabores: </label>
                                        <input
                                          className="input-manageProduct"
                                          type="text"
                                          id="edit-sabores"
                                          value={editedProduct.sabores}
                                          onChange={(e) => setEditedProduct({ ...editedProduct, sabores: e.target.value })}
                                        /><br /><br/>
                                        <div className="div-buttons-manageProduct">
                                          <button type="submit" className="salvarButton-manageProduct">Salvar</button>
                                          <button onClick={handleCancelButtonClick} className="cancelButton-manageProduct">Cancelar</button>
                                        </div>
                                      </form>
                                      
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
