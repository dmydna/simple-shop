import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useListings } from "../contexts/ListingContext";

function DropdownCheck({children, array ,className, style, variant, onFilterDraft}){


    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(()=>{
      if(selectedTags.length != 0){
        onFilterDraft(prev =>  ({
          ...prev, 
          tags : selectedTags
        }))
      }
    },[selectedTags])

    // 2. Función para manejar los cambios
    const handleTagChange = (tag) => {
      // Verifica si la etiqueta ya está en el arreglo (está marcada)
      if (selectedTags.includes(tag)) {
        // Si está, la eliminamos (desmarcar)
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        // Si no está, la agregamos (marcar)
        setSelectedTags([...selectedTags, tag]);
      }
    };

    return(
       <Dropdown className={className} style={style} >
           <Dropdown.Toggle 
              style={{opacity: '.6'}}
              variant={variant} 
              className="container-fluid d-flex toggle-end align-items-center" 
              id="dropdown-basic">
               {children} :
               <span className="small text-muted fw-semibold ms-3">
                  {selectedTags.length != 0 ?  `${selectedTags[0]} (${selectedTags.length}) ` : 'Seleccionar'  }
               </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="multi-col-dropdown-menu">
          {array.map((t) => (
          <div key={t} className="multi-col-item">
             <Form.Check
              type="checkbox"
              id={`checkbox-${t}`} // ¡ID único es CRÍTICO!
              label={t}
              onChange={(e) => handleTagChange(t)}
             />
          </div>
          ))}
         </Dropdown.Menu>
    </Dropdown>
    )
}

export default DropdownCheck