import React from "react"
import CreatePerimetria from "./createPerimetria"
import CreateCategoria from "./createCategoria"
import CreateDobrasCutaneasF from "./createDobrasCutaneasF"
import CreatePreUser from "../user/createPreUser"

const PerimetriaeDobrasF = () => {
    return (
        <div>
            <h2 className="FM">Avaliação Feminina</h2>
            <div className="divComponent-ProductAndCategory"> 
            <div className="component1-ProductAndCategory"><CreatePreUser/></div>
            <div className="component1-ProductAndCategory"><CreatePerimetria/></div>
            <div className="component2-ProductAndCategory"><CreateDobrasCutaneasF/></div>
            </div>
        </div>
    )
}

export default PerimetriaeDobrasF