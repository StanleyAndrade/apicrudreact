import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

const History = () => {
    const [userData, setUserData] = useState(null);
    const [perimetrias, setPerimetrias] = useState([]);
    const [dobrascutaneas, setDobrasCutaneas] = useState([]);
    const [treinos, setTreinos] = useState([]);
    const [selectedDobra, setSelectedDobra] = useState(null);
    const [selectedPerimetria, setSelectedPerimetria] = useState(null);
    const [selectedTreino, setSelectedTreino] = useState(null);

    const fetchLoja = async () => {
        try {
            const response = await axios.get("http://192.168.247.103:8080/protected/userstore/buscar", {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setUserData(response.data.userData);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário:", error);
        }
    };

    useEffect(() => {
        fetchLoja();
    }, []);

    const fetchPerimetrias = async () => {
        try {
            const responsePerimetrias = await axios.get(`http://192.168.247.103:8080/perimetriaPersonal/${userData._id}`);
            setPerimetrias(responsePerimetrias.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as perimetrias do usuário: ", error);
        }
    };

    const fetchDobrasCutaneas = async () => {
        try {
            const responseDobrasCutaneas = await axios.get(`http://192.168.247.103:8080/dobrascutaneasPersonal/${userData._id}`);
            setDobrasCutaneas(responseDobrasCutaneas.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as dobras cutâneas do usuário: ", error);
        }
    };

    const fetchtreino = async () => {
        try {
            const responseTreinos = await axios.get(`http://192.168.247.103:8080/treinoPersonal/${userData._id}`);
            setTreinos(responseTreinos.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar os treinos do usuário: ", error);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchPerimetrias();
            fetchDobrasCutaneas();
            fetchtreino();
        }
    }, [userData]);

    const handleShowMoreDobra = (dobra) => {
        setSelectedDobra(selectedDobra === dobra ? null : dobra);
    };

    const handleShowMorePerimetria = (perimetria) => {
        setSelectedPerimetria(selectedPerimetria === perimetria ? null : perimetria);
    };

    const handleShowMoreTreino = (treino) => {
        setSelectedTreino(selectedTreino === treino ? null : treino);
    };

    return (
        <div className="">
            {userData ? (
                <div className="father-manageProduct">
                    <div className="item-history">
                        <h2>Dobras Cutâneas:</h2>
                        {dobrascutaneas.map((dobra) => (
                            <div key={dobra._id}>
                                <p><b>Criado em:</b> {moment(dobra.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                <p><b>Percentual de Gordura:</b> {dobra.resultadopercentualdegordura}%</p>
                                <p><b>Peso Atual:</b> {dobra.pesoatual}kg</p>
                                {selectedDobra === dobra && (
                                    <>
                                        <p>Peso Ideal: {dobra.pesoideal}</p>
                                        <p>Peitoral: {dobra.peitoral}</p>
                                        <p>Axilar Média: {dobra.axilarmedia}</p>
                                        <p>Triciptal: {dobra.triciptal}</p>
                                        <p>Subescapular: {dobra.subescapular}</p>
                                        <p>Abdominal: {dobra.abdominal}</p>
                                        <p>Suprailiaca: {dobra.suprailiaca}</p>
                                        <p>Coxa: {dobra.coxa}</p>
                                        <p>Biciptal: {dobra.biciptal}</p>
                                        <p>Panturrilha Média: {dobra.panturrilhaMedia}</p>
                                        <p>Somatório das dobras: {dobra.somatoriodasdobras}</p>
                                        <p>Peso Gordo: {dobra.pesogordo}</p>
                                        <p>Peso Magro: {dobra.pesomagro}</p>
                                        <p>Idade: {dobra.idade}</p>
                                    </>
                                )}
                                <button onClick={() => handleShowMoreDobra(dobra)} className="button-history">
                                    {selectedDobra === dobra ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="item-history">
                        <h2>Perimetrias:</h2>
                        {perimetrias.map((perimetria) => (
                            <div key={perimetria._id}>
                                <p><b>Criado em:</b> {moment(perimetria.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                {selectedPerimetria === perimetria && (
                                    <>
                                        <p>Braço relaxado esquerdo: {perimetria.bracoRelaxadoEsquerdo}cm</p>
                                        <p>Braço relaxado direito: {perimetria.bracoRelaxadoDireito}cm</p>
                                        <p>Braço contraído esquerdo: {perimetria.bracoContraidoEsquerdo}cm</p>
                                        <p>Braço contraído direito: {perimetria.bracoContraidoDireito}cm</p>
                                        <p>Antebraço esquerdo: {perimetria.antebracoEsquerdo}cm</p>
                                        <p>Antebraço direito: {perimetria.antebracoDireito}cm</p>
                                        <p>Perna esquerda: {perimetria.pernaEsquerdo}cm</p>
                                        <p>Perna direita: {perimetria.pernaDireito}cm</p>
                                        <p>Torax: {perimetria.torax}cm</p>
                                        <p>Abdomen: {perimetria.abdomen}cm</p>
                                        <p>Quadril: {perimetria.quadril}cm</p>
                                    </>
                                )}
                                <button onClick={() => handleShowMorePerimetria(perimetria)} className="button-history">
                                    {selectedPerimetria === perimetria ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="item-history">
                        <h2>Treinos:</h2>
                        {treinos.map((treino, treinoIndex) => (
                            <div key={treino._id}>
                                <p><b>Data de Criação:</b> {moment(treino.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                {selectedTreino === treino && (
                                    <>
                                        {Object.keys(treino).filter(key => key !== "_id" && key !== "userid" && key !== "storeid" && key !== "__v").map((key, index) => (
                                            treino[key].length > 0 && (
                                                <div key={index} style={{ marginBottom: '20px' }}>
                                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {treino[key][0]?.grupoMuscular}
                                                    </h3>
                                                    {treino[key].map((exercicio, i) => (
                                                        <div key={i} style={{ marginBottom: '10px' }} className="exercicios">
                                                            {exercicio.exercicio && <p>Exercício: {exercicio.exercicio}</p>}
                                                            {exercicio.series && <p>Séries: {exercicio.series}</p>}
                                                            {exercicio.repeticoes && <p>Repetições: {exercicio.repeticoes}</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        ))}
                                    </>
                                )}
                                <button onClick={() => handleShowMoreTreino(treino)} className="button-history">
                                    {selectedTreino === treino ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
};

export default History;
