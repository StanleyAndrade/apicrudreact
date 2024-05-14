import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

// Importe os componentes que você deseja exibir dinamicamente
import CreateProduct from "../product/createPerimetria";
import CreateCategoria from "../product/createCategoria";
import ManageProduct from "../product/manageProduct";
import Account from "./account";
import ListProductNew from "../product/listProductNew";
import UploadImage from "../s3/upload_s3";
import LogoutUserStore from "./logoutUserStore";
import PerimetriaeDobrasM from "../product/PerimetriaeDobrasM";
import PerimetriaeDobrasF from "../product/PerimetriaeDobrasF";


const Dashboard = () => {

    const [componente, setComponemte] = useState(<ManageProduct/>)

    function manageProduct () {
        setComponemte(<ManageProduct/>)
    }

    function createAvaliacaoM () {
        setComponemte(<PerimetriaeDobrasM/>)
    }

    function createAvaliacaoF () {
        setComponemte(<PerimetriaeDobrasF/>)
    }

    function createCategoria () {
        setComponemte(<CreateCategoria/>)
    }



    return (
        <div className="father-dashboard">
            <div className="barra-lateral-dashboard">
                <Account/>
                <button onClick={manageProduct} className="MeusprodutosButton-dashboard">Lista de Avaliações</button>
                <button onClick={createAvaliacaoM} className="CreateButton-dashboard">Nova Avaliação<br/> Masculina</button>
                <button onClick={createAvaliacaoF} className="CreateButton-dashboard">Nova Avaliação<br/> Feminina</button>
                <LogoutUserStore/>
            </div>

            <div className="div-dashboard">
                {componente}
            </div>

        </div>
    )
}

export default Dashboard
