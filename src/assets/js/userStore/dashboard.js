import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { GoHistory } from "react-icons/go";
import { LiaDumbbellSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import { useParams } from "react-router-dom";
import { CiCalculator2 } from "react-icons/ci";
import { SlCalculator } from "react-icons/sl";


// Importe os componentes que você deseja exibir dinamicamente
import ManageProduct from "../product/manageProduct";
import Account from "./account";
import LogoutUserStore from "./logoutUserStore";
import PerimetriaeDobrasM from "../product/PerimetriaeDobrasM";
import PerimetriaeDobrasF from "../product/PerimetriaeDobrasF";
import CreateTreino from "../product/createTreino";
import Escolha from "../product/escolha";
import { useNavigate } from "react-router-dom";

// importando Contexto
import { ComponenteContext } from "../product/Context";



const Dashboard = () => {
    const navigate = useNavigate()

    const buttonAvaliacao = () => {
        setComponente(<Escolha/>);
    }

    const buttonDados = () => {
        setComponente(<Account/>);
    }

    const buttonTreino = () => {
        setComponente(<CreateTreino/>);
    }

    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    //const [componente, setComponente] = useState(<Account/>);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://15.228.166.75:8080/protected/userstore/buscar", {
                    headers: { Authorization: `${localStorage.getItem("token")}` }
                });
                setUserData(response.data.userData);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
                console.error("Erro ao buscar os dados do usuário:", error);
                navigate('/')
            }
        }
        fetchUserData();
    }, []);

    const { componente, setComponente } = useContext(ComponenteContext); // Usar o contexto



    return (
        <div className="father-dashboard">
            {userData ? (
                <div>
                    {/* <div className="user-profile">
                        <div className="profile-info">
                            <FaUserCircle className="profile-icon" />
                            <div className="user-info">
                                <h3>{userData.name}</h3>
                                <p>@{userData.username}</p>
                            </div>
                        </div>
                        <div className="settings">
                            <button className="bottom-bar-button" onClick={clearLocalStorage}>
                            <IoIosLogOut className="profile-icon-logout" />
                            </button>
                        </div>
                    </div> */}

                    {componente}
                    <div className="bottom-bar">
                        
                            <button className="bottom-bar-button" onClick={buttonDados}>
                                <GrHomeRounded className="icone-buttonbar"/> 
                            </button>
                            <button className="bottom-bar-button" onClick={buttonAvaliacao}>
                                <SlCalculator className="icone-buttonbar"/> 
                            </button>
                            <button className="bottom-bar-button" onClick={buttonTreino}>
                                <LiaDumbbellSolid className="icone-buttonbar-dumbble"/> 
                            </button>
                        
                    </div>
                </div>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    )
}

export default Dashboard
