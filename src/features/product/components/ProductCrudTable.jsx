import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../../pagination/components/Pagination.jsx';
import {Link} from "react-router-dom";
import {useProductCrud} from "../context/ProductCrudContex.jsx";
import {useProductContext} from "../context/ProductContext.jsx";
import CrudTable from "../../../components/common/CrudTable.jsx";
import {CRUD} from "../../../utils/crud.js";

export  const ProductCrudTable = ({children}) => {

  const baseHook = useProductContext()
  const crudHook = useProductCrud()

  const { handleDelete, handleVisibility, setShowCrud, setCrudMode,
    setCurrentItem, setCurrentStep, setExpandx, step }  = crudHook

  const openEditModal = (item) => {
    setCrudMode(CRUD.UPDATE);
    setCurrentItem(item);
    setShowCrud(true);
    setExpandx(true);
    setCurrentStep(step.OPTIONS_UPDATE)
  };

  return (
      <CrudTable
          className='shadow-sm border rounded p-3 island'
          crudHook={crudHook}
          baseHook={baseHook}
          handleclick={(item) =>openEditModal(item)}>
        {(key, item)=>{
          if(key=='title'){
            return (
                <>
                  <p className="h5 my-4">
                    Productos </p>
                  <hr></hr>
                </>
            )
          }
          if(key=='buttons'){
            return (
                <>  {/** Editar */}
                  <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => openEditModal(item)}
                      className="me-3 mb-1 border"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>


                </>
            )
          }

        }}
      </CrudTable>
  );
}

export default ProductCrudTable;