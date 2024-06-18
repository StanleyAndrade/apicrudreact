import {React, useContext, useState} from 'react';
import { IoWoman } from "react-icons/io5";
import { IoMan } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PerimetriaeDobrasM from './PerimetriaeDobrasM';
import PerimetriaeDobrasF from './PerimetriaeDobrasF';
import Dashboard from '../userStore/dashboard';

// importando Contexto
import { ComponenteContext } from './Context';

const Escolha = () => {
    const navigate = useNavigate()
    const {componente, setComponente} = useContext(ComponenteContext); // Usar o contexto

    const Masculino = () => {
        setComponente(<PerimetriaeDobrasM/>)
    }

    const Feminino = () => {
        setComponente(<PerimetriaeDobrasF/>)
    }

    return(
        <div className='father-escolha'>
                <div>
                    <h2>Quem será avaliado?</h2>
                    <div className='div-escolha'>
                    <div className='div-buttonEscolha'>
                        <button className="bottom-bar-button" onClick={Masculino}>
                            <IoMan className="icone-buttonbar-dumbble"/> 
                        </button>
                        <p>Homem</p>
                    </div>
                    <div className='div-buttonEscolha'>
                        <button className="bottom-bar-button" onClick={Feminino}>
                            <IoWoman className="icone-buttonbar"/>
                        </button>
                        <p>Mulher</p>
                    </div>
                </div>
                </div> 
        </div>
    )
} 

export default Escolha