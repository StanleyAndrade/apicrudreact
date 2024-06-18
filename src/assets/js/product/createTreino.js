import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTreino = () => {
    const navigate = useNavigate();
    const [treino1, setTreino1] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino2, setTreino2] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino3, setTreino3] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino4, setTreino4] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino5, setTreino5] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino6, setTreino6] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino7, setTreino7] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);

    const [popUpPositivo, setpopUpPositivo] = useState("");
    const [popUpNegativo, setpopUpNegativo] = useState("");

    const handleInputChange = (index, event, setTreino, treino) => {
        const values = [...treino];
        values[index] = {
            ...values[index],
            [event.target.name]: event.target.value
        };
        setTreino(values);
    };

    const createTreino = async () => {
        try {
            const Userid = localStorage.getItem('AlunoUserid');
            const UserStoreid = localStorage.getItem('userStoreid');
            try {
                await axios.post('http://15.228.166.75:8080/treinogym/criar', { treino1, treino2, treino3, treino4, treino5, treino6, treino7});
                console.log('Treino cadastrado com sucesso');
                setpopUpPositivo("Treino criado com sucesso!");
                setTimeout(() => {
                    setpopUpPositivo("")// Oculta o popup após 4 segundos
                }, 3000);
                setTimeout(() => {
                    window.location.reload()// Navega após 3 segundos
                }, 2500);
            } catch (error) {
                setpopUpNegativo("Erro ao criar usuário!");
                setTimeout(() => setpopUpNegativo(""), 4000); // Oculta o popup após 3 segundos
                console.error('Erro ao criar Treino: ', error);
            }
        } catch (error) {
            setpopUpNegativo("Erro ao criar usuário!");
            setTimeout(() => setpopUpNegativo(""), 4000); // Oculta o popup após 3 segundos
            console.error('Erro ao criar Treino: ', error);
        }
    };

    const addExerciseFields = (setTreino, treino) => {
        setTreino([...treino, { grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    };

    return (
        <div className="father-Treino">
            <form>
                {[
                    { treino: treino1, setTreino: setTreino1, label: "Treino A" },
                    { treino: treino2, setTreino: setTreino2, label: "Treino B" },
                    { treino: treino3, setTreino: setTreino3, label: "Treino C" },
                    { treino: treino4, setTreino: setTreino4, label: "Treino D" },
                    { treino: treino5, setTreino: setTreino5, label: "Treino E" },
                    { treino: treino6, setTreino: setTreino6, label: "Treino F" },
                    { treino: treino7, setTreino: setTreino7, label: "Treino G" }
                ].map(({ treino, setTreino, label }, treinoIndex) => (
                    <div key={treinoIndex} className="div-Treino">
                        <label htmlFor={`treino${treinoIndex + 1}`} className="labelnome-createTreino">{label}</label>
                        <br/>
                        {treino.map((field, index) => (
                            <div key={index}>
                                {index === 0 && (
                                    <input
                                        type="text"
                                        name="grupoMuscular"
                                        placeholder="Ex.: Peito e Tríceps"
                                        className="inputtext-createTreio"
                                        value={field.grupoMuscular}
                                        onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                    />
                                )} <br/>
                                <input
                                    type="text"
                                    name="exercicio"
                                    placeholder="Exercicio"
                                    className="inputtext-createTreio"
                                    value={field.exercicio}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <input
                                    type="text"
                                    name="series"
                                    placeholder="Series"
                                    className="inputtext-createTreio"
                                    value={field.series}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <input
                                    type="text"
                                    name="repeticoes"
                                    placeholder="Repetições"
                                    className="inputtext-createTreio"
                                    value={field.repeticoes}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <br />
                            </div>
                        ))}
                        <button type="button" onClick={() => addExerciseFields(setTreino, treino)} className="moreTreinoButton">+</button>
                        <br />
                    </div>
                ))}
                <button type="button" onClick={createTreino} className="createButton-createTreino">Cadastrar treino</button>
            </form>
            {popUpPositivo && (
                <div className="popupPositivo">
                    <p>{popUpPositivo}</p>
                </div>
            )}
            {popUpNegativo && (
                <div className="popupNegativo">
                    <p>{popUpNegativo}</p>
                </div>
            )}
        </div>
    );
}

export default CreateTreino;
