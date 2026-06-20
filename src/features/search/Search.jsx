import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWindowsWidth } from "../../contexts/useWindowSize.jsx";
import { useListing } from "../listing/hooks/useListing.js";

function Search({toggle, setToggle}){
    
    const width = useWindowsWidth()
    const navigate = useNavigate();
    const location = useLocation();
    


    const [query, setQuery] = useState(""); 
    const {listings, setFilters} = useListing({autofetch: true});

    const [show, setShow] = useState(false);

    function handleChange(e) {
      const value = e.target.value;
      setQuery(value);
      setShow(!!value); // se abre si hay texto
    }

    function handleSubmit(e){
      e.preventDefault();
      !! query && 
      navigate(`/products?search=${query}`);
      setFilters({title: query})
      setToggle(false);
      setShow(false);
    }


    const toggleRoute = useMemo(() => {
      return location.pathname === '/products/filter' ? '/products' : '/products/filter';
    }, [location.pathname]); 

    function handleFilter(e) {
      e.preventDefault();
      navigate(toggleRoute);
    }
    
    
    // Filtro para la lista de coincidencias
    useEffect(() => {
      if (!query) return ;
      setFilters({page:0, title: query})
    }, [listings, query]);

    return (
      <div className="d-flex w-100">
        
        <Form
          onSubmit={handleSubmit}
          className={`w-100 bg-white border mx-2 rounded custom-input-group  
            ${ !toggle && width < 1300 ? "d-none" : "" } `}
        >
          
          <InputGroup>
            <input
              type="text"
              placeholder="Buscar productos..."
              className={`form-control border-0 no-focus`}
              value={query}
              onChange={handleChange}
              onClick={() => (!!query ? setShow(true) : {})}
            />
            {/** FILTER */}
            <Button
              style={{opacity: .4}}
              variant="ligth"
              className={`bi bi-sliders border-0 hover-icon`}
              onClick={(e)=> handleFilter(e)} >
            </Button>
            <Button variant="ligth" 
              style={{opacity: .4}}
              className={`bi-search border-0 hover-icon`}
              onClick={(e)=> handleSubmit(e)} >
            </Button>
          </InputGroup>
          <Dropdown
            show={show}
            onToggle={(isOpen) => setShow(isOpen)}
            style={{zIndex: 99999 }}
          >
            {/* !! convierte a booleano cualquier expresion */}
            <Dropdown.Menu className={`w-100 pe-3`}>
              {listings.map((p) => (
                <Dropdown.Item
                  onClick={() => {
                    setShow(false);
                    setToggle(false);
                  }}
                  className="overflow-hidden"
                  as={Link}
                  to={`/products/${p.hash}/${p.title}`}
                  key={p.id}
                >
                  {p.title}
                </Dropdown.Item>
              ))}
                  <Dropdown.Item
                  onClick={() => {
                    setShow(false);
                    setToggle(false);
                  }}
                  className="overflow-hidden border-top"
                  as={Link}
                  to={`/products?search=${query}`}
                  key={99}
                >
                  resultado de busqueda... 
                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        {/** SEARCH */}
        <Button
          onClick={()=> setToggle((prev)=>!prev)}
          variant="ligth"
          className={`bg-transparent  d-xl-none border-0 bi
              ${ toggle ? "bi-x-lg" : "bi-search"} `}>
        </Button>
      </div>
    );
}

export default Search