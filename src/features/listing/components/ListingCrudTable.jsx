import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListingContext } from '../contexts/ListingContext.jsx';
import { useListingCrud } from '../contexts/ListingCrudContext.jsx';
import CrudTable from "../../../components/common/CrudTable.jsx";
import {CRUD} from "../../../utils/crud.js";
import {step} from "../../../utils/ListingWizard.js";


export  const ListingCrudTable = ({children}) => {

    const baseHook = useListingContext()
    const crudHook = useListingCrud()

    const { handleDelete, handleVisibility, setShowCrud, setCrudMode,
        setCurrentItem, setCurrentStep, setExpandx }  = crudHook

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
                              Publicaciones </p>
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
                          {/** Delete */}
                          <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              className="me-3 mb-1 border"
                          >
                              <i className="bi bi-trash3"></i>
                          </Button>
                          {/** Visibility */}
                          <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleVisibility(item)}
                              className="mb-1 border"
                          >
                              <i className="bi bi-eye"></i>
                          </Button>

                      </>
                  )
              }

          }}
      </CrudTable>
  );
}

export default ListingCrudTable;
