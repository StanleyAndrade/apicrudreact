import axios from "axios";
import React, {useState} from "react";

const CreateCategoria = () => {
    //*===================== POST =====================*
    // newProduct pega dados do formulario pra criar produto
    const [newCategoria, setNewCategoria] = useState({
        nome: '',
      })
  
      //Oculta e exibe o botão criar produto
      const [showFormCreate, setShowFormCreate] = useState(false)
  
      //consumindo API
      const createCategoria = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/categorias', newCategoria)
        .then(() => {
          //getProducts()
          setNewCategoria({
            nome: '',
          });
          console.log('Categoria cadastrado com sucesso')
          //oculta o formulário
          setShowFormCreate(false)
        }).catch((error) => {
          console.error('Erro ao criar Categoria: ', error)
        })
      }

      return (
        <div>
            {showFormCreate ? (            
            <form onSubmit={createCategoria}>
            <h2>Cadastrar Categoria</h2>
            <label htmlFor="nome">Nome da categoria: </label>
            <input
            type="text"
            id="nome"
            required
            value={newCategoria.nome}
            onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
            /><br />

            <button type="submit">Cadastrar Categoria</button>
            </form>
            ) : ( 
            <button onClick={() => setShowFormCreate(true)}>Nova Categoria</button>
            )}
      </div>
      )
}

export default CreateCategoria