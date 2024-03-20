import React from "react"
import CreateProduct from "./createProduct"
import CreateCategoria from "./createCategoria"

const ProductAndCategory = () => {
    return (
    <div className="divComponent-ProductAndCategory"> 
        <div className="component1-ProductAndCategory"><CreateProduct/></div>
        <div className="component2-ProductAndCategory"><CreateCategoria/></div>
    </div>
    )
}

export default ProductAndCategory