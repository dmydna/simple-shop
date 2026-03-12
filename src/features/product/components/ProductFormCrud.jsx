import {Alert, Button, Col} from "react-bootstrap";
import React, {useState} from "react";


import StepCreate from "./StepCreate.jsx";
import {useProductCrud} from "../context/ProductCrudContex.jsx";
import FormProducts from "../../listing/components/FormProduct.jsx";
import {CRUD} from "../../../utils/crud.js";
import {Link} from "react-router-dom";



function ProductFormCrud({className, style}){


  const { crudMode, currentItem, currentStep } = useProductCrud()

  return (
      <Col style={style} className={`${className ||''}`}>

        <div className="py-2">
            <StepCreate>
                <p className='fs-5 fw-semibold'> Producto </p>
                {crudMode === CRUD.UPDATE &&
                    <Alert>
                        Para <b>editar</b> el producto <b>asociado</b> a esta publicacion
                        ve a la seccion correspondiente <b><Link to={'#'}>(*?)</Link></b>
                    </Alert> }
            </StepCreate>
        </div>

      </Col>
  )
}

export default ProductFormCrud;