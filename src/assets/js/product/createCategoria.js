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
            <div className="father-createCategoria">
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
              </div>
              </form>
            </div>
            ) : ( 
            <button onClick={() => setShowFormCreate(true)} className="createCategoryButton-account">Nova Categoria</button>
            )}
      </div>
      )
}

export default CreateCategoria