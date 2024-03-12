import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateCategoria = () => {
    //*===================== POST =====================*
    const [categories, setCategories] = useState([]) // armazena categorias    
    const [showFormCreate, setShowFormCreate] = useState(true) // Estado que oculta e exibe o formulário de criação
    const [showFormEdit, setShowFormEdit] = useState(false) // Estado que oculta e exibe o formulário de edição
    const [editedCategoria, setEditedCategoria] = useState({ // Armazena a edição da categoria para atualizar
        nome: '',
    })
    const [newCategoria, setNewCategoria] = useState({ // Armazena os dados da categoria que será criada
        nome: '',
    })
    const [editingCategoryId, setEditingCategoryId] = useState(null); // ID da categoria em edição
    const [editedCategoriaData, setEditedCategoriaData] = useState({ // Dados editados temporariamente
        nome: '',
    })

    // Função para buscar todas as categorias
    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categorias')
            setCategories(response.data)
        } catch (error) {
            console.error("Erro ao buscar categorias no MongoDB", error)
        }
    }

    // Função para criar uma nova categoria
    const createCategoria = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/categorias', newCategoria)
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

    // Função para editar uma categoria
    const editCategoria = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:8080/categorias/${editingCategoryId}`, {
              nome: nome
            })
            console.log('Sucesso ao atualizar categoria no MongoDB', response.data)
            setShowFormEdit(false) // Oculta o formulário de edição após a edição bem-sucedida
            setEditingCategoryId(null); // Limpa o ID da categoria em edição
            setEditedCategoria(editedCategoriaData); // Atualiza os dados da categoria editada
        } catch (error) {
            console.error('Erro ao atualizar categoria no MongoDB: ', error)
        }
    }

    console.log('Teste ', editedCategoriaData)

    // Função para lidar com o clique no botão "Editar"
    const handleEditClick = (categoria) => {
        setEditedCategoriaData({ ...categoria }); // Define os dados editados temporariamente
        setEditingCategoryId(categoria._id); // Define o ID da categoria em edição
        setShowFormEdit(true); // Mostra o formulário de edição
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
                            value={newCategoria.nome}
                            onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
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
                        {editingCategoryId === category._id ? (
                            // Formulário de edição da categoria em vez do nome da categoria
                            <div className="card-createCategoria" key={category._id}>
                                <form onSubmit={editCategoria}>
                                    <h3 className="title-createCategoria">Editar Categoria</h3>
                                    <label htmlFor="edit-nome" className="labelnome-createCategoria">Novo nome da categoria: </label>
                                    <input
                                        type="text"
                                        className="inputtext-createCategoria"
                                        id="edit-nome"
                                        required
                                        value={editedCategoriaData.nome}
                                        onChange={(e) => setEditedCategoriaData({ ...editedCategoriaData, nome: e.target.value })}
                                    /><br />

                                    <div className="div-createButton-createCategoria">
                                        <button type="submit" className="createButton-createCategoria">Salvar Alterações</button>
                                        <button type="button" onClick={() => setShowFormEdit(false)} className="cancelButton-createProduct">Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            // Nome da categoria com botão de edição
                            <>
                                <p>{category.nome}</p>
                                <button onClick={() => deleteCategoria(category._id)}>Apagar</button>
                                <button onClick={() => handleEditClick(category)}>Editar</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateCategoria
