import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageUpload from "../s3/upload_s3";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tamanhos, setTamanhos] = useState('')
    const [sabores, setSabores] = useState('')
    const [preco, setPreco] = useState('')
    const [userid, setUserid] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageKey, setImageKey] = useState('')
    const [categoria, setCategoria] = useState('')


    const [showFormCreate, setShowFormCreate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState()

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/protected/userstore/buscar", {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            const getid = response.data.userData._id
            setUserId(getid);

            // Pega as categorias
            const responseCategories = await axios.get(`http://localhost:8080/categorias/user/${response.data.userData._id}`);
            setCategories(responseCategories.data); 


        } catch (error) {
            console.error("Erro ao buscar os dados do usuário:", error);
        }
    }

    // Delete - apaga a imagem do Amazon S3 
    const deleteImage = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete/${imageKey}`)
            setImageUrl('')
            setImageKey('')
            console.log('Sucesso ao apagar imagem no Amazon S3')
        } catch (error) {
            console.error("Erro ao apagar imagem no Amazon S3", error)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleImageUrlChange = (url) => {
        setImageUrl(url);
    };
        
    const handleImageKeyChange = (key) => {
        setImageKey(key);
    };

    //Volta pra home
    const cancelar = () => {
        try {
            deleteImage()
            setShowFormCreate(false)
        } catch (error) {
            console.error('Erro ao cancelar')
        }
    }
    

    const createProduct = async () => {
        try {
            try {
                const response = await axios.post('http://localhost:8080/produtos/criar', { nome, descricao, tamanhos, sabores, preco, userid: userId, imageUrl, imageKey, categoria})
                console.log('Produto cadastrado com sucesso');
                setShowFormCreate(false);
            } catch (error) {
                console.error('Erro ao criar produto: ', error);
            }
        } catch (error) {
            console.error('Erro ao criar produto: ', error);
        }
    };

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
                        value={nome}
                        onChange={(e) => setNome(e.target.value )}
                    /><br />

                    <label htmlFor="descricao" className="labelnome-createProduct">Descrição</label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="descricao"
                        placeholder="(opcional)"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    /><br />

                    <label htmlFor="preco" className="labelnome-createProduct">Preço</label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="preco"
                        required
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    /><br />

                    <label htmlFor="tamanhos" className="labelnome-createProduct">Tamanho: - <b>Mais de 1 tamanho, separar por vígula</b> "," </label>
                    <br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="tamanhos"
                        value={tamanhos}
                        onChange={(e) => setTamanhos(e.target.value.split(','))}
                    /><br />

                    <label htmlFor="tamanhos" className="labelnome-createProduct">Sabores - <b>Mais de 1 sabor, separar por vígula</b> "," </label>
                    <br/>
                    <input
                        id="sabores"
                        className="inputtext-createProduct"
                        placeholder="Ex.: Chocolate, morango"
                        value={sabores}
                        onChange={(e) => setSabores(e.target.value.split(','))}
                    /><br/><br/>

                    <div className="div-categoria-e-createButton-createProduct">
                        <label htmlFor="categoria" className="labelnome-createProduct">Categoria: </label>
                        
                        <select
                            id="categoria"
                            className="select-categorias-createProduct"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="" className="option-categorias-createProduct">Selecione uma categoria</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.nome}</option>
                            ))}
                        </select><br />

                        <button type="button" onClick={createProduct} className="createButton-createProduct">Cadastrar Produto</button>
                         {/* Botão para cancelar */}
                         <button type="button" onClick={cancelar} className="cancelButton-createProduct"> Cancelar </button>
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
