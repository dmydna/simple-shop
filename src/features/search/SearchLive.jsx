import React, { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";

function SearchLive({className, items, handleSearch, handleActive, handleFilter, tail=true}) {
  const [query, setQuery] = useState(""); 
//   const {setSearch, clients} = useController();

  const [showtail, setshowtail] = useState(false)
  const handleClickFilter = () => {
    if(tail){setshowtail(prev => !prev)}
    handleFilter()
  }

  useEffect(() => {
      if (!query.trim()) {
        handleSearch("");
          return;
      }
      handleSearch(query);
  }, [items, query]);

  function handleChange(e) {
      const value = e.target.value;
      setQuery(value);
      if(!value && handleActive) {
          handleActive();
      }
  }

  return (
      <div className={`d-flex align-items-center my-2 ${className}`}>
          <InputGroup className="border rounded">
              <input
                  type="text"
                  placeholder="Buscar entrada..."
                  className="form-control border-0 no-focus"
                  value={query}
                  onChange={handleChange}
              />
               <span className={`${showtail ? 'badge-tooltip' : ''} p-0 m-0 border-0`}>
              <span onClick={handleClickFilter} className="btn opacity-50" >
                <i className="bi-sliders"></i>
              </span>
              </span>
              <span className="btn opacity-50" >
                <i className="bi-search"></i>
              </span>
          </InputGroup>
      </div>
  );
}

export default SearchLive;
