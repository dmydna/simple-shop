import { useMemo } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useUIContext } from "../../../contexts/UIContext.jsx";
import { FilterTags } from "../../../components/common/FilterTags.jsx";
import { FilterBarProvider } from "../context/FilterBarContext.jsx";
import { useUrlFilters } from "../hooks/useUrlFilters.jsx";





function FilterBar({className, children, dataSource, onApply, concealable = true, fix=false }) {

    const { showFilter, setSelectedTags } =  useUIContext();

    const {
        filterDraft,
        setFilterDraft,
        applyFilters,
        removeFilters,
        isFiltering
    } = useUrlFilters();

    const handleSubmit = () => {
        // 1. Actualiza la URL
        applyFilters(filterDraft);
        console.log(filterDraft);
        // 2. Actualiza el contexto global de listados
        onApply(filterDraft);
    };

    const handleReset = () => {
        removeFilters()
        applyFilters({})
        onApply({});
        setSelectedTags([])
    }

// Generar tags dinámicos sigue igual
    const availableTags = useMemo(() =>
            [...new Set(dataSource.flatMap(p => p.tags || []))],
        [dataSource]
    );


    return(

    <Form
     onSubmit={handleSubmit}
     style={{top:"70px"}}
     className={`bg-white ${className} ${!showFilter && concealable ? 'd-none' : ''} w-100`}>
      <Form.Group className="d-flex flex-wrap gap-3">
          <FilterBarProvider
              onFilterDraft={setFilterDraft}
              array={availableTags}
              applyFilters={applyFilters}
          >
              {children}
          </FilterBarProvider>
          <Col className="order-2">
             <div className="w-100 d-flex justify-content-start justify-content-md-end gap-2">
                <Button
                    onClick={handleSubmit}
                    style={{maxWidth: fix ? "initial" : "200px", minWidth: "100px"}} className="w-100 my-2 border"
                    disabled={!isFiltering}
                >
                    <i className="bi bi-funnel"></i>
                    <span className="ms-2">filtrar</span>
                </Button>
                <Button
                    onClick={handleReset}
                    style={{maxWidth: "200px"}} className="w-100 my-2 border"
                    variant="secondary"
                >
                    <i className="bi bi-trash3"></i>
                    <span className="ms-2 d-md-none">limpiar</span>
                </Button>
             </div>
          </Col>
      </Form.Group>
        <FilterTags className='w-100' />
    </Form>


    )
}

export default FilterBar;