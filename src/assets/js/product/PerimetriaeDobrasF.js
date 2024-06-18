import React from "react"
import CreatePerimetria from "./createPerimetria"
import CreateCategoria from "./createCategoria"
import CreateDobrasCutaneasF from "./createDobrasCutaneasF"
import CreatePreUser from "../user/createPreUser"

const PerimetriaeDobrasF = () => {
    return (
        <div>
            <h2 className="FM">Avaliação Feminina</h2>
            <div className="divComponent-PerimetriaeDobras"> 
            <div className="component1-PerimetriaeDobras"><CreatePreUser/></div>
            <div className="component1-PerimetriaeDobras"><CreatePerimetria/></div>
            <div className="component2-PerimetriaeDobras"><CreateDobrasCutaneasF/></div>
            </div>
        </div>
    )
}

export default PerimetriaeDobrasF