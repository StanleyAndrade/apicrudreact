import axios from "axios";
import React, { useState, useEffect } from "react";


const ListUser = () => {

//*===================== GET =====================*
  //pega os usuários pra exibir no html
  const [users, setUsers] = useState([]);

  //obs.: O estado 'useState' controla o valor dos campos dos inputs
  //os dados do get são passados pra setProducts e jogados pra products
  //para que products seja exibido no {products.map((product)
  const getUsers = () => {
    axios.get("http://localhost:8080/user")
      .then((response) => {
        setUsers(response.data);
        console.log("Dados buscados com sucesso")
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários: ", error);
      });
  };

  useEffect(() => {
    getUsers()
  }, [])
  //*===================== GET =====================*


  return (
    <div>
        <h1>Lista de Usuário</h1>
        {users.map((user) => (
            <div key={user._id}>
                <p>{user.email}</p>
            </div>
        ))}
    </div>
  )
}

export default ListUser