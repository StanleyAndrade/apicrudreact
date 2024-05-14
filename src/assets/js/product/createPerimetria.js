import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foto from '/ProjetosVScode/frontend-userStore-gym/src/assets/img/ok.webp'

const CreatePerimetria = () => {
    const navigate = useNavigate()
    const [bracoRelaxadoEsquerdo, setbracoRelaxadoEsquerdo] = useState('')
    const [bracoRelaxadoDireito, setbracoRelaxadoDireito] = useState('')
    const [bracoContraidoEsquerdo, setbracoContraidoEsquerdo] = useState('')
    const [bracoContraidoDireito, setbracoContraidoDireito] = useState('')
    const [antebracoDireito, setantebracoDireito] = useState('')
    const [antebracoEsquerdo, setantebracoEsquerdo] = useState('')
    const [pernaDireito, setpernaDireito] = useState('')
    const [pernaEsquerdo, setpernaEsquerdo] = useState('')
    const [torax, settorax] = useState('')
    const [abdomen, setabdomen] = useState('')
    const [quadril, setquadril] = useState('')

    
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tamanhos, setTamanhos] = useState('')
    const [sabores, setSabores] = useState('')
    const [preco, setPreco] = useState('')
    const [userid, setUserid] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageKey, setImageKey] = useState('')
    const [categoria, setCategoria] = useState('')


    const [showFormCreate, setShowFormCreate] = useState(true);
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState()

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/protected/userstore/buscar", {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            const getid = response.data.userData._id
            setUserId(getid);

            // Pega as categorias
            const responseCategories = await axios.get(`http://localhost:8080/categorias/user/${response.data.userData._id}`);
            setCategories(responseCategories.data); 


        } catch (error) {
            console.error("Erro ao buscar os dados do usuário:", error);
        }
    }

    // Delete - apaga a imagem do Amazon S3 
    const deleteImage = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete/${imageKey}`)
            setImageUrl('')
            setImageKey('')
            console.log('Sucesso ao apagar imagem no Amazon S3')
        } catch (error) {
            console.error("Erro ao apagar imagem no Amazon S3", error)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    //Volta pra home
    const cancelar = () => {
        try {
            deleteImage()
            setShowFormCreate(false)
        } catch (error) {
            console.error('Erro ao cancelar')
        }
    }
    

    const createProduct = async () => {
        try {
            const Userid = localStorage.getItem('AlunoUserid')
            const UserStoreid = localStorage.getItem('userStoreid')

            try {
                const response = await axios.post('http://localhost:8080/perimetria/criar', { bracoRelaxadoEsquerdo, bracoRelaxadoDireito, bracoContraidoEsquerdo, bracoContraidoDireito, antebracoDireito, antebracoEsquerdo, pernaDireito, pernaEsquerdo, torax, abdomen, quadril, userid: Userid, storeid: UserStoreid})
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
                    <h3 className="title-createProduct">Passo 2 <br/> Perimetria</h3>
                    <br/>

                    <label htmlFor="nome" className="labelnome-createProduct">Braço Relaxado Esquerdo</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={bracoRelaxadoEsquerdo}
                        onChange={(e) => setbracoRelaxadoEsquerdo(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Braço Relaxado Direito</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={bracoRelaxadoDireito}
                        onChange={(e) => setbracoRelaxadoDireito(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Braço Contraído Esquerdo</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={bracoContraidoEsquerdo}
                        onChange={(e) => setbracoContraidoEsquerdo(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Braço Contraído Direito</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={bracoContraidoDireito}
                        onChange={(e) => setbracoContraidoDireito(e.target.value )}
                    /><br />

                    
                    <label htmlFor="nome" className="labelnome-createProduct">Antebraço Esquerdo</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={antebracoEsquerdo}
                        onChange={(e) => setantebracoEsquerdo(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Antebraço Direito</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={antebracoDireito}
                        onChange={(e) => setantebracoDireito(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Perna Esquerda</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={pernaEsquerdo}
                        onChange={(e) => setpernaEsquerdo(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Perna Direita</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={pernaDireito}
                        onChange={(e) => setpernaDireito(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Torax</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={torax}
                        onChange={(e) => settorax(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Abdomen</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={abdomen}
                        onChange={(e) => setabdomen(e.target.value )}
                    /><br />

                    <label htmlFor="nome" className="labelnome-createProduct">Quadril</label><br/>
                    <input
                        type="text"
                        className="inputtext-createProduct"
                        id="nome"
                        required
                        value={quadril}
                        onChange={(e) => setquadril(e.target.value )}
                    /><br />


                    <div className="div-categoria-e-createButton-createProduct">
                        <button type="button" onClick={createProduct} className="createButton-createProduct">Concluir</button>
                         {/* Botão para cancelar */}
                         <button type="button" onClick={cancelar} className="cancelButton-createProduct"> Cancelar </button>
                    </div>
                </form>
                </div>
            ) : ( 
                <img src={foto} className="foto-Ok"></img>
            )}
        </div>
    );
};

export default CreatePerimetria;
