import { Button } from 'react-bootstrap';
import CrudTable from "../../../components/common/CrudTable.jsx";
import { useListingContext } from '../contexts/ListingContext.jsx';
import { useListingCrudContext } from '../contexts/ListingCrudContext.jsx';


export  const ListingCrudTable = ({children}) => {

    const baseHook = useListingContext()
    const crudHook = useListingCrudContext()
    // const {setCurrentStep, step} = useWizard()

    const { setShowCrud, setCrudMode, setItemHash, setItemId, 
        setExpandx, setDataItem, currentItem ,openEdit : openEditModal }  = crudHook

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
