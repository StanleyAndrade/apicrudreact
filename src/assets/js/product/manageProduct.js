import axios from "axios";
import React, { useState, useEffect } from "react";

const ManagePerimetria = () => {
  const [perimetriaData, setPerimetriaData] = useState([]);
  const [dobrascutaneasData, setDobrascutaneasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeid = ('66270e54555470c3ab6e0be6');

        // Busca perimetrias pelo userstoreid
        const responsePerimetria = await axios.get(`http://localhost:8080/perimetria/${storeid}`);
        setPerimetriaData(responsePerimetria.data);

        // Busca dobrascutaneas pelo userstoreid
        const responseDobras = await axios.get(`http://localhost:8080/dobrascutaneas/${storeid}`);
        setDobrascutaneasData(responseDobras.data);

      } catch (error) {
        console.error("Erro ao buscar dados:", error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div>
        <h2>Perimetria</h2>
        <ul>
          {perimetriaData.map((perimetria) => (
            <li key={perimetria._id}>
              {/* Exibir os dados da perimetria */}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Dobras Cutâneas</h2>
        <ul>
          {dobrascutaneasData.map((dobra) => (
            <li key={dobra._id}>
              <p><b>Percentual de Gordura:</b> {dobra.resultadopercentualdegordura}%</p>
              <p><b>Peso Atual:</b> {dobra.pesoatual}kg</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePerimetria;
