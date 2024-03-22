import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateCategoria = () => {
    // Variáveis para pegar categorias
    const [categories, setCategories] = useState([]) // getAllCaterories armazena categorias aqui    
    // Variáveis para pegar Criar Categorias
    const [showFormCreate, setShowFormCreate] = useState(true) // Estado que oculta e exibe o formulário de criação
    const [newCategoria, setNewCategoria] = useState({ // Armazena os dados da categoria que será criada
        nome: '',
    })
    const [nome, setNome] = useState('')
    const [userid, setUserid] = useState('')

    const [showAndOcultForm, setShowAndOcultForm] = useState(null) // Estado que oculta e exibe o formulário
    const [editedCategoria, setEditedCategoria] = useState({ 
        nome: '',
    })
    const [editingCategoriaId, setEditingCategoriaId] = useState(null); //recebe o id do produto que está sendo editado e serve pra abrir e fechar o formulário
    const [userId, setUserId] = useState()

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/protected/userstore/buscar", {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            const getid = response.data.userData._id
            setUserId(getid);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    
    // Função para buscar todas as categorias
    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categorias/buscar')
            setCategories(response.data) //armazena as categorias em "categoria"
        } catch (error) {
            console.error("Erro ao buscar categorias no MongoDB", error)
        }
    }

    // Função para criar uma nova categoria
    const createCategoria = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/categorias/criar', {nome, userid: userId})
            .then(() => {
                getAllCategories()
                setNewCategoria({
                    nome: '',
                });
                console.log('Sucesso ao cadastrar categoria no MongoDB')
                setShowFormCreate(true) // Oculta o formulário de criação após o envio bem-sucedido
            }).catch((error) => {
                console.error('Erro ao cadastrar categoria: ', error)
            })
    }

    // Patch
    const editCategory = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:8080/categorias/editar/${showAndOcultForm._id}`, editedCategoria)
            getAllCategories()
            setEditedCategoria({
                nome: '',
            })
            setShowAndOcultForm(null)
            setEditingCategoriaId(false)
            console.log('Sucesso ao atualizar categoria no MongoDB', response.data)
        } catch (error) {
            console.error('Erro ao atualizar categoria no MongoDB: ', error)
        }
    }

    //Abrir formulário
    const openEditForm = (category) => {
        if (category) {
            setShowAndOcultForm(category)
            setEditedCategoria({
                nome: category.nome
            })
            setEditingCategoriaId(category._id)
        }
    }

    // Fecha o formulário. Cancela a edição
    const handleCancelButtonClick = () => {
        setEditingCategoriaId(false)
    }


    // Função para deletar uma categoria
    const deleteCategoria = async (categoryId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/categoria/delete/${categoryId}`)
            getAllCategories()
            console.log('Sucesso ao apagar categoria no MongoDB')
        } catch (error) {
            console.error('Erro ao apagar categoria ', error)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div className="father-createCategoria">
            {showFormCreate ? (
                <div className="card-createCategoria">
                    <form onSubmit={createCategoria}>
                        <h3 className="title-createCategoria">Cadastrar Categoria</h3>
                        <label htmlFor="nome" className="labelnome-createCategoria">Nome da categoria: </label>
                        <input
                            type="text"
                            className="inputtext-createCategoria"
                            id="nome"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        /><br />

                        <div className="div-createButton-createCategoria">
                            <button type="submit" className="createButton-createCategoria">Cadastrar Categoria</button>
                            {/* Botão para cancelar */}
                            <button type="button" onClick={() => setShowFormCreate(false)} className="cancelButton-createProduct"> Cancelar </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button onClick={() => setShowFormCreate(true)} className="createCategoryButton-account">Nova Categoria</button>
            )}

            <div className="div-createCategoria">
                <h3>Suas Categorias</h3>
                {categories.map(category => (
                    <div key={category._id}>
                        {editingCategoriaId !== category._id && (
                            <>
                            <p>{category.nome}</p>
                            <div className="div-buttons-createCategoria">
                                <button onClick={() => openEditForm(category)} className="editButton-createCategoria">Editar</button>
                                <button onClick={() => deleteCategoria(category._id)}>Apagar</button>
                            </div>
                            </>
                        )}
                        
                        {editingCategoriaId === category._id && (
                            <div className="inputEdit-createCategoria">
                                <form onSubmit={editCategory}>
                                    <label htmlFor="edit-nome">Nome</label>
                                    <input
                                    className="input-createCategoria"
                                    type="text"
                                    id="edit-nome"
                                    required
                                    value={editedCategoria.nome}
                                    onChange={(e) => setEditedCategoria({ ...editedCategoria, nome: e.target.value})}/>
                                    <br/><br/>
                                    <div className="div-buttons-createCategoria">
                                        <button type="submit" className="salvarButton-createCategoria">Salvar</button>
                                        <button onClick={handleCancelButtonClick} className="cancelButton-createCategoria">Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateCategoria
