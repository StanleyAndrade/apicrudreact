import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

// Importe os componentes que você deseja exibir dinamicamente
import CreateProduct from "../product/createProduct";
import CreateCategoria from "../product/createCategoria";
import ManageProduct from "../product/manageProduct";
import Account from "./account";
import ListProductNew from "../product/listProductNew";
import UploadImage from "../s3/upload_s3";
import LogoutUserStore from "./logoutUserStore";
import ProductAndCategory from "../product/productAndCategory";

const Dashboard = () => {

    const [componente, setComponemte] = useState(<ManageProduct/>)

    function manageProduct () {
        setComponemte(<ManageProduct/>)
    }

    function createProduct () {
        setComponemte(<ProductAndCategory/>)
    }

    function createCategoria () {
        setComponemte(<CreateCategoria/>)
    }



    return (
        <div className="father-dashboard">
            <div className="barra-lateral-dashboard">
                <Account/>
                <button onClick={manageProduct} className="MeusprodutosButton-dashboard">Meus Produtos</button>
                <button onClick={createProduct} className="CreateButton-dashboard">Cadastrar item</button>
                <LogoutUserStore/>
            </div>

            <div className="div-dashboard">
                {componente}
            </div>

        </div>
    )
}

export default Dashboard
