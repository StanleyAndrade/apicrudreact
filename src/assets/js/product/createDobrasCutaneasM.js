import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateDobrasCutaneas = () => {
    const navigate = useNavigate()
    const [ subescapular, setsubescapular ] = useState('')
    const [ triciptal, settriciptal ] = useState('')
    const [ abdominal, setabdominal ] = useState('')
    const [ suprailiaca, setsuprailiaca ] = useState('')
    const [ peitoral, setpeitoral ] = useState('')
    const [ coxa, setcoxa ] = useState('')
    const [ biciptal, setbiciptal ] = useState('')
    const [ axilarmedia, setaxilarmedia ] = useState('')
    const [ panturrilhamedia, setpanturrilhamedia ] = useState('')
    const [ resultadopercentualdegordura, setresultadopercentualdegordura ] = useState('')
    const [ pesoatual, setpesoatual ] = useState('')
    const [ pesogordo, setpesogordo ] = useState('')
    const [ pesomagro, setpesomagro ] = useState('')
    const [ pesoideal, setpesoideal ] = useState('')
    const [ idade, setidade ] = useState('')
    const [ somatoriodasdobras, setsomatoriodasdobras ] = useState('')


    const [showFormCreate, setShowFormCreate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState()

    //Volta pra home
    const cancelar = () => {
        try {
            //deleteImage()
            setShowFormCreate(false)
        } catch (error) {
            console.error('Erro ao cancelar')
        }
    }

const sendWhatsapp = () => {

const name = localStorage.getItem('AlunoUserName')
const username = localStorage.getItem('AlunoUsername')
const userStorename = localStorage.getItem('userStorename')
const userStoreendereco = localStorage.getItem('userStoreendereco')
const userPhone = localStorage.getItem('userPhone')

//Mensagem do whatsapp
var zap = `https://wa.me/55${userPhone}?text=`
var tudoJunto = `
*${userStorename}*
${userStoreendereco}
Aluno: *${name}*

*Percentual de Gordura:* ${resultadopercentualdegordura}%
*Peso Atual:* ${pesoatual}kg

Resultado completo no site:
http://www.localhost:3001/${username}
`;    
    
//Transforma em texto de Whatsapp
tudoJunto = window.encodeURIComponent(tudoJunto);
    
//Concatena e exibe
var codigoTodo = zap + tudoJunto;
window.open(codigoTodo, '_blank')
}
    

    const createProduct = async () => {
        try {
            // somatório das 7 dobras
            const somatorio7Dobras = parseInt(peitoral) + parseInt(axilarmedia) + parseInt(triciptal) + parseInt(subescapular) + parseInt(abdominal) + parseInt(suprailiaca) + parseInt(coxa)
            // somatório das dobras x 0.00043499
            const etapa1 = parseInt(somatorio7Dobras) * 0.00043499
            // somatório das 7 dobras ²
            const somatorio7Dobras2 = parseInt(somatorio7Dobras) * parseInt(somatorio7Dobras)
            // somatório das 7 dobras ² x 0.00000055
            const etapa2 = parseInt(somatorio7Dobras2) * 0.00000055
            // idade x 0.00028826
            const etapa3 = parseInt(idade) * 0.00028826
            // Densidade Corporal
            const preDC = 1.112 - etapa1 + etapa2 - etapa3 
            //Faz aparecer só 3 casas decimais do resultado 
            const DC = preDC.toFixed(8)

            //Fórmula de Siri %G = [ (4,95 / DC) - 4,50 ] x 100
            // (4,95 / DC)
            const passo1 = (4.95)/parseFloat(DC)
            // passo1 - 4,50
            const passo2 = passo1 - (4.50)
            // passo2 * 100
            const passo3 = passo2 * 100
            // %G
            const G = passo3.toFixed(2)

            setsomatoriodasdobras(somatorio7Dobras)
            setresultadopercentualdegordura(G)
            const Userid = localStorage.getItem('AlunoUserid')
            const UserStoreid = localStorage.getItem('userStoreid')
                try {
                    const response = await axios.post('http://localhost:8080/dobrascutaneas/criar', { subescapular, triciptal, abdominal, suprailiaca, peitoral, coxa, biciptal, axilarmedia, panturrilhamedia, somatoriodasdobras: somatorio7Dobras, resultadopercentualdegordura: G, pesoatual, pesogordo, pesomagro, pesoideal, idade, userid: Userid, storeid: UserStoreid})
                    console.log('Perimetria cadastrada com sucesso');
                    setShowFormCreate(false);
                } catch (error) {
                    console.error('Erro ao criar Perimetria: ', error);
                }
        } catch (error) {
            console.error('Erro ao criar Perimetria: ', error);
        }
    };

    return (
        <div >
            {showFormCreate ? (
                
                <div className="father-createProduct">
                    <form >
                    <h3 className="title-createProduct">Passo 3 <br/> Dobras Cutâneas</h3>
                    <br/>

                    <label htmlFor="nome" className="labelnome-createProduct">Peitoral</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={peitoral}
                        onChange={(e) => setpeitoral(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Axilar Média</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={axilarmedia}
                        onChange={(e) => setaxilarmedia(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Trícips</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={triciptal}
                        onChange={(e) => settriciptal(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Subescapular</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={subescapular}
                        onChange={(e) => setsubescapular(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Abdominal</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={abdominal}
                        onChange={(e) => setabdominal(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Suprailiaca</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={suprailiaca}
                        onChange={(e) => setsuprailiaca(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Coxa</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={coxa}
                        onChange={(e) => setcoxa(e.target.value )}
                    /><br />

                    <h5>Informações complementares</h5>

                    <label htmlFor="nome" className="labelnome-createProduct">Bícips</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={biciptal}
                        onChange={(e) => setbiciptal(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Panturrilha Média</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={panturrilhamedia}
                        onChange={(e) => setpanturrilhamedia(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Peso Atual</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={pesoatual}
                        onChange={(e) => setpesoatual(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Idade</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={idade}
                        onChange={(e) => setidade(e.target.value )}
                    /><br />


                    <div className="div-categoria-e-createButton-createProduct">
                        <button type="button" onClick={createProduct} className="createButton-createProduct">Concluir</button>
                         {/* Botão para cancelar */}
                         <button type="button" onClick={cancelar} className="cancelButton-createProduct"> Cancelar </button>
                    </div>
                </form>
                </div>
            ) : ( 
                <div>
                    <h3>Enviar Resultado via Whatsapp</h3>
                                    <butto onClick={sendWhatsapp} className="createAccount">Enviar</butto>
                </div>
            )}
        </div>
    );
};

export default CreateDobrasCutaneas;