import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../../pagination/components/Pagination.jsx';
import {Link} from "react-router-dom";
import {useProductCrud} from "../contexts/ProductCrudContex.jsx";
import {useProductContext} from "../contexts/ProductContext.jsx";
import CrudTable from "../../../components/common/CrudTable.jsx";
import {CRUD} from "../../../utils/crud.js";

export  const ProductCrudTable = ({children}) => {

  const baseHook = useProductContext()
  const crudHook = useProductCrud()

  const { setShowCrud, setCrudMode, setItemHash, dataItem ,setExpandx, setDataItem }  = crudHook

  const openEditModal = (item) => {
    setCrudMode(CRUD.UPDATE); //  cambia a modo editar de wizard
    setItemHash(item?.id);   // <- hash de item actual
    setDataItem(item);       // <- datos de item actual
    setShowCrud(true);       // <- muestra wizard crud
  };

  return (
      <CrudTable
          className='shadow-sm border rounded p-3 island'
          crudHook={crudHook}
          baseHook={baseHook}
          handleclick={(item) =>openEditModal(item)}>
        {(key, item)=>{
          if(key=='name'){
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