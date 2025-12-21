import React, { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { useProducts } from "../contexts/ProductContext";

function SearchLive() {
  const [query, setQuery] = useState(""); 
  const {setSearch} = useProducts(); // Falta este estado
  const {products} = useProducts();

  useEffect(() => {
      if (!query.trim()) {
          setSearch("");
          return;
      }
      setSearch(query);
  }, [products, query]);

  function handleChange(e) {
      const value = e.target.value;
      setQuery(value);
  }

  return (
      <div className="position-relative my-2">
          <InputGroup className="border rounded shadow-sm">
              <input
                  type="text"
                  placeholder="Buscar en el dashboard..."
                  className="form-control border-0 no-focus"
                  value={query}
                  onChange={handleChange}
              />
              <Button 
                  variant="light" 
                  className="bi-search border-0 opacity-50"
              />
          </InputGroup>
      </div>
  );
}

export default SearchLive;