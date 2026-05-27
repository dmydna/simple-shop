import CrudTable from "@common/CrudTable.jsx";
import { Button } from 'react-bootstrap';
import { ImgGenApi } from '../../../dev/imageJS.js';
import { useUserContext } from "../contexts/UserContext.jsx";
import { useUserCrud } from '../contexts/UserCrudContext.jsx';

//@deprecated 
export  const UserCrudTable = ({children}) => {

  const baseHook = useUserContext()
  const crudHook = useUserCrud()

  const { setShowCrud, setCrudMode, setItemHash, dataItem ,
    setExpandx, setDataItem, openEdit:openEditModal }  = crudHook

      const baseImg = {
        "icon": "bi-person-fill",
        "dimension": "150x150", 
        "fontSize": "70",
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

export default UserCrudTable;