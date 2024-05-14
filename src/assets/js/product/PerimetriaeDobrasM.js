import React from "react"
import CreatePerimetria from "./createPerimetria"
import CreateCategoria from "./createCategoria"
import CreateDobrasCutaneasM from "./createDobrasCutaneasM"
import CreatePreUser from "../user/createPreUser"

const PerimetriaeDobrasM = () => {
    return (
        
    <div>
        <h2 className="FM">Avaliação Masculina</h2>
        <div className="divComponent-ProductAndCategory"> 
            <div className="component1-ProductAndCategory"><CreatePreUser/></div>
            <div className="component1-ProductAndCategory"><CreatePerimetria/></div>
            <div className="component2-ProductAndCategory"><CreateDobrasCutaneasM/></div>
        </div>
    </div>
    )
}

export default PerimetriaeDobrasM