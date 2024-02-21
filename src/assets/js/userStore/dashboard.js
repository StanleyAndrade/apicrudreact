import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

//páginas a serem exibidas
import CreateProduct from "../product/createProduct";
import ManageProduct from "../product/manageProduct";
import Account from "./account";
import ListProductNew from "../product/listProductNew";
import CreateCategoria from "../product/createCategoria";
import UploadImage from "../s3/upload_s3";
import ImageDelete from "../s3/delete_s3";

const Dashboard = () => {
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
    // const email = localStorage.getItem('userEmail')

    // useEffect(() => {
    //     // Recupere o token JWT armazenado no localStorage
    //     const token = localStorage.getItem('token')
    
    //     if (!token) {
    //         setError(`Você não está logado. Faça login` )
    //         return;
    //     }
    
    //     axios.get('http://localhost:8080/protected/store', {
    //             headers: { Authorization: token },
    //     }).then((response) => {
    //         setMessage(response.data.message)
    //     }).catch((error) => {
    //         setError(error.response.data.message)
    //     })
    // }, [])

    return(
        <div>
            <div className="div-dashboard">
                <Account/>
                <CreateProduct/>
                <CreateCategoria/>
                <ManageProduct/>
                <UploadImage/>
                <ImageDelete/>
            </div>
        </div>
    )
}

export default Dashboard