import { useEffect, useState, useMemo } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useListing } from "@features/listing/hooks/useListing";
import { useSearchParams, useNavigate } from 'react-router-dom';


function InputCheckParam({ name, array = [] , className, style, variant = "light" }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState([]);

  // 1. Sincronizar estado inicial con la URL
  useEffect(() => {
    const tagsParam = searchParams.get(name);
    if (tagsParam) {
      // Si viene como string separado por comas: "seafood,vegetables"
      const tagsArray = tagsParam.split(',').map(t => t.trim()).filter(t => t);
      setSelectedTags(tagsArray);
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  // 2. Sincronizar URL cuando cambia el estado local
  useEffect(() => {
    if (selectedTags.length > 0) {
      // Actualiza el parámetro 'tags' con los valores seleccionados
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set(name, selectedTags.join(','));
        return next;
      }, { replace: true });
    } else {
      // Si no hay tags, elimina el parámetro de la URL
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.delete(name);
        return next;
      });
    }
  }, [selectedTags, setSearchParams]);


  const handleTagChange = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  return (
    <>
    <Dropdown className={className} style={style}>
      <Dropdown.Toggle
        variant={variant}
        className="border container-fluid d-flex toggle-end align-items-center"
        id="dropdown-basic"
      >
        <b style={{opacity: '.7'}} >tags :</b>
        <span className="small text-muted fw-semibold mx-3">
          {selectedTags.length !== 0 ? (
            <span className="">
              {selectedTags[selectedTags.length-1]} ({selectedTags.length})
            </span>
          ) : (
            'Seleccionar'
          )}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="multi-col-dropdown-menu">
        {array.map((t) => (
          <div key={t} className="multi-col-item">
            <Form.Check
              type="checkbox"
              id={`checkbox-${t}`}
              label={t}
              onChange={() => handleTagChange(t)}
              checked={selectedTags.includes(t)}
            />
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default InputCheckParam;