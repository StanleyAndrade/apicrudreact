import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DisplayTreinos = () => {
    const [treinos, setTreinos] = useState([]);

    useEffect(() => {
        const fetchTreinos = async () => {
            try {
                const response = await axios.get('https://api.fittreinoapp.com/treino/buscar');
                setTreinos(response.data);
            } catch (error) {
                console.error('Erro ao buscar treinos: ', error);
            }
        };

        fetchTreinos();
    }, []);

    return (
        <div>
            <h1>Lista de Treinos</h1>
            {treinos.length === 0 ? (
                <p>Nenhum treino encontrado.</p>
            ) : (
                treinos.map((treino, index) => (
                    <div key={index}>
                        <h2>Treino {index + 1}</h2>
                        <div>
                            {treino.treino1.map((exercicio, i) => (
                                <div key={i}>
                                    <p>Exercício: {exercicio.exercicio}</p>
                                    <p>Séries: {exercicio.series}</p>
                                    <p>Repetições: {exercicio.repeticoes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DisplayTreinos;
