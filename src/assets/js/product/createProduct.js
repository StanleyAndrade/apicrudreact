import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        nome: '',
        descricao: '',
        tamanhos: '',
        sabores: '',
        preco: '',
        userid: '',
        categoria: '',
    });

    const [showFormCreate, setShowFormCreate] = useState(false);
    const [categories, setCategories] = useState([]);

    const createProduct = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/produtos', newProduct)
            .then(() => {
                setNewProduct({
                    nome: '',
                    descricao: '',
                    tamanhos: '',
                    sabores: '',
                    preco: '',
                    userid: '', 
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
        <div>
            {showFormCreate ? (
                <form onSubmit={createProduct}>
                    <h2>Cadastrar produto</h2>
                    <label htmlFor="nome">Nome do Produto: </label>
                    <input
                        type="text"
                        id="nome"
                        required
                        value={newProduct.nome}
                        onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
                    /><br />

                    <label htmlFor="descricao">Descrição: </label>
                    <input
                        type="text"
                        id="descricao"
                        placeholder="Opcional"
                        value={newProduct.descricao}
                        onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
                    /><br />

                    <label htmlFor="preco">Preço: </label>
                    <input
                        type="text"
                        id="preco"
                        required
                        value={newProduct.preco}
                        onChange={(e) => setNewProduct({ ...newProduct, preco: e.target.value })}
                    /><br />

                    <h5>Informações Opcionais</h5>

                    <label htmlFor="tamanhos">Tamanhos: </label>
                    <input
                        type="text"
                        id="tamanhos"
                        value={newProduct.tamanhos}
                        onChange={(e) => setNewProduct({ ...newProduct, tamanhos: e.target.value.split(',') })}
                    /><br />

                    <label htmlFor="tamanhos">Sabores: </label>
                    
                    <input
                        id="sabores"
                        placeholder="Separe por vírgula. Ex.: chocolate, morango, uva"
                        value={newProduct.sabores}
                        onChange={(e) => setNewProduct({ ...newProduct, sabores: e.target.value.split(',') })}
                    /><br/>

                    <label htmlFor="categoria">Categoria: </label>
                    <select
                        id="categoria"
                        value={newProduct.categoria}
                        onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.nome}</option>
                        ))}
                    </select><br />

                    <button type="submit">Cadastrar Produto</button>
                </form>
            ) : ( 
                <button onClick={() => setShowFormCreate(true)}>Novo produto</button>
            )}
        </div>
    );
};

export default CreateProduct;