import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageUpload from "../s3/upload_s3";


const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        nome: '',
        descricao: '',
        tamanhos: '',
        sabores: '',
        preco: '',
        userid: '',
        imageUrl: '',
        imageKey: '',
        categoria: '',
    });

    const [showFormCreate, setShowFormCreate] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleImageUrlChange = (url) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            imageUrl: url,
        }));
    };
        
    const handleImageKeyChange = (key) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            imageKey: key,
        }));
    };
    

    // useEffect(() => {
    //     if (newProduct.imageUrl !== '' && newProduct.imageKey !== '') {
    //         createProduct();
    //     }
    // }, [newProduct.imageUrl, newProduct.imageKey]);

    const createProduct = () => {
        axios.post('http://localhost:8080/api/produtos', newProduct)
            .then(() => {
                setNewProduct({
                    nome: '',
                    descricao: '',
                    tamanhos: '',
                    sabores: '',
                    preco: '',
                    userid: '', 
                    imageUrl: '',
                    imageKey: '',
                    categoria: '',
                });
                console.log('Produto cadastrado com sucesso');
                setShowFormCreate(false);
            })
            .catch((error) => {
                console.error('Erro ao criar produto: ', error);
            });
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categorias');
            setCategories(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div >
            {showFormCreate ? (
                <div className="father-createProduct">
                    <form >
                    <h3 className="title-createProduct">Cadastrar produto</h3>
                    <div>
                        <ImageUpload onImageUrlChange={handleImageUrlChange} onImageKeyChange={handleImageKeyChange} />
                    </div>
                    <br/>

                    <label htmlFor="nome" className="labelnome-createProduct">Nome do Produto</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={newProduct.nome}
                        onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
                    /><br />

                    <label htmlFor="descricao" className="labelnome-createProduct">Descrição</label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="descricao"
                        placeholder="(opcional)"
                        value={newProduct.descricao}
                        onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
                    /><br />

                    <label htmlFor="preco" className="labelnome-createProduct">Preço</label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="preco"
                        required
                        value={newProduct.preco}
                        onChange={(e) => setNewProduct({ ...newProduct, preco: e.target.value })}
                    /><br />

                    <label htmlFor="tamanhos" className="labelnome-createProduct">Tamanho: - <b>Mais de 1 tamanho, separar por vígula</b> "," </label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="tamanhos"
                        value={newProduct.tamanhos}
                        onChange={(e) => setNewProduct({ ...newProduct, tamanhos: e.target.value.split(',') })}
                    /><br />

                    <label htmlFor="tamanhos" className="labelnome-createProduct">Sabores - <b>Mais de 1 sabor, separar por vígula</b> "," </label>
                    <br/>
                    <input
                        id="sabores"
                        className="inputtext-createProduct"
                        placeholder="Ex.: Chocolate, morango"
                        value={newProduct.sabores}
                        onChange={(e) => setNewProduct({ ...newProduct, sabores: e.target.value.split(',') })}
                    /><br/><br/>

                    <div className="div-categoria-e-createButton-createProduct">
                        <label htmlFor="categoria" className="labelnome-createProduct">Categoria: </label>
                        
                        <select
                            id="categoria"
                            className="select-categorias-createProduct"
                            value={newProduct.categoria}
                            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                        >
                            <option value="" className="option-categorias-createProduct">Selecione uma categoria</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.nome}</option>
                            ))}
                        </select><br />

                        <button type="button" onClick={createProduct} className="createButton-createProduct">Cadastrar Produto</button>
                    </div>
                </form>
                </div>
            ) : ( 
                <button onClick={() => setShowFormCreate(true)} className="createProductButton-account">Novo produto</button>
            )}
        </div>
    );
};

export default CreateProduct;
