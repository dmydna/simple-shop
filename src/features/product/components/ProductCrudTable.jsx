import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../../pagination/components/Pagination.jsx';
import {Link} from "react-router-dom";
import {useProductCrud} from "../contexts/ProductCrudContex.jsx";
import {useProductContext} from "../contexts/ProductContext.jsx";
import CrudTable from "../../../components/common/CrudTable.jsx";
import {CRUD} from "../../../utils/crud.js";
import { useUIContext } from '../../../contexts/UIContext.jsx';
import { ImgGenApi } from '../../../dev/utils.js';

export  const ProductCrudTable = ({children}) => {

  const baseHook = useProductContext()
  const crudHook = useProductCrud()

  const { setShowCrud, openEdit, setCrudMode, setItemHash, dataItem ,setExpandx, setDataItem }  = crudHook

  
  const baseImg = {
    "icon": "F7D3",
    "dimension": "150x150", 
    "fontSize": "60",
    "fontWeight": "light",
    "textColor": "fff",
    "background": "ddd",
  }

  const iconCrud = ImgGenApi({...baseImg })


  return (
      <CrudTable
          className='shadow-sm border rounded p-3 island'
          crudHook={crudHook}
          baseHook={baseHook}
          iconCrud={iconCrud}
          handleclick={(item) =>openEdit(item)}>
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
                      onClick={() => openEdit(item)}
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