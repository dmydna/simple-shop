import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListingContext } from '../contexts/ListingContext.jsx';
import { useListingCrud } from '../contexts/ListingCrudContext.jsx';
import CrudTable from "../../../components/common/CrudTable.jsx";
import {CRUD} from "../../../utils/crud.js";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";


export  const ListingCrudTable = ({children}) => {

    const baseHook = useListingContext()
    const crudHook = useListingCrud()
    // const {setCurrentStep, step} = useWizard()

    const { setShowCrud, setCrudMode, setItemHash, setExpandx, setDataItem }  = crudHook

    const openEditModal = (item) => {
        setCrudMode(CRUD.UPDATE); //  cambia a modo editar de wizard
        setItemHash(item?.hash); // <- hash de item actual
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
              if(key === 'title'){
                  return (
                      <>
                          <p className="h5 my-4">
                              Publicaciones </p>
                          <hr></hr>
                      </>
                  )
              }
              if(key === 'buttons'){
                  return (
                      <>  {/** Editar */}
                          <Button
                              variant="border-0 ligth"
                              size="sm"
                              onClick={() => openEditModal(item)}
                          >
                              <i className="bi bi-three-dots-vertical h5"></i>
                          </Button>

                      </>
                  )
              }

          }}
      </CrudTable>
  );
}

export default ListingCrudTable;
