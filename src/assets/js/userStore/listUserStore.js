import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const ListUserId = () => {

  //*===================== GET =====================*
  //Recebe os valores do usuário
  const [user, setUser ] = useState([])
  // Recebe o id que vai ficar na url (Ex. user/:id => user/544545454454545)
  const { id } = useParams()
  
  const getUser = () => {
      axios.get(`http://15.228.166.75:8080/userstore/buscar/${id}`)
      .then((response) => {
          // Verifique se a resposta é um objeto ou uma array
          const userData = Array.isArray(response.data) ? response.data : [response.data];
          setUser(userData);
          console.log("Dados buscados com sucesso")
      })
      .catch((error) => {
          console.log("Erro ao buscar usuários", error)
          console.log(" 2 O id é: " + id)
      })
      console.log("3 O id é: " + id)
  }

  useEffect(() => {
      getUser()
      console.log("O id é: " + id)
  }, [id])
  //*===================== GET =====================*


  return (
    <div>
        <h1>Lista de Usuário</h1>
        {user.map((user) => (
            <div key={user._id}>
                <p>{user.email}</p>
            </div>
        ))}
    </div>
  )
}

export default ListUserId