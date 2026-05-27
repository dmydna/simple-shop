import { useServiceParams } from "@/hooks/useServiceParams.js";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { AppStatus } from "../../components/common/AppStatus.jsx";
import CategoryCarrousel from "../../components/common/CategoryCarrousel.jsx";
import CategoryNav from "../../components/common/CategoryNav.jsx";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";
import DropdownRange from "../../components/common/DropdownRange.jsx";
import { useUIContext } from "../../contexts/UIContext.jsx";
import AddToCartButton from "../../features/cart/components/AddToCartButton.jsx";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import { useListingContext } from "../../features/listing/contexts/ListingContext.jsx";
import Pagination from "../../features/pagination/components/Pagination.jsx";
import { ListingPlaceholder } from "../../features/placeholder/ListingPlaceholder.jsx";
import ProductCard from "../../features/product/components/ProductCard.jsx";


// FIXME no agrega searchparams de paginacion

  function ProductListing() {
    
  const baseHook = useListingContext()
  const { error, listings, totalPages, setFilters ,filters,totalElements, loading, fetchData , ...props} = baseHook;


  const [meta, setMeta] = useState({
    title: "Productos",
    message: "",
    description: "",
  });

  const serviceParams = useServiceParams({ baseHook: baseHook});

  useEffect(()=>{
        if (filters && Object.keys(filters).length == 0) {
          setMeta({ title: "Productos" });  
        }
        if (filters?.category) {
            setMeta((prev) => ({ ...prev, title: filters?.category }));
        }
        if (filters?.title) {
            setMeta((prev) => ({
                ...prev,
                title: "Resultados",
                message: `encontrados: ${totalElements}`
            }));
        }
  },[filters])

  const { showFilter } = useUIContext()


  return (
    <>

      <AppStatus
          loading={loading}
          onRetry={fetchData}
          error={error}
          placeholder={<ListingPlaceholder/>}
          isEmpty={ totalElements === 0 }
      >
        <>
          <Container fluid="xl" className="bg-white rounded mt-2 mb-5 pb-5">
            <div className="w-100 d-flex flex-wrap mt-2 mb-4">
              <span className="text-capitalize fw-semibold me-3 fs-5 fw-medium" >
                {meta.title}
              </span>
              <span style={{ lineHeight: '2.3rem' }} className="text-secondary">
                {meta.message}
              </span>
            </div>
            {showFilter ?
                <>
                  <CategoryNav className='d-none d-m-block' show={showFilter} />

                  <CategoryCarrousel className='d-block d-md-none' />

                  <FilterBar fix={true} dataSource={listings} onApply={setFilters} className="mb-5" >
                        <DropdownCheck variant="light"  className="border rounded my-2 flex-fill">
                            <span className="fw-semibold">etiquetas</span>
                        </DropdownCheck>
                         <DropdownRange variant="light" className="border rounded my-2 flex-fill"  min={0} max={1500} defaultValue={20} type={'$'}>
                              <span className="fw-medium">precio</span>
                         </DropdownRange>
                  </FilterBar >
                </> : ''
            }
            <Row>
              {listings.map((p) => (
                  <ProductCard className={'border m-2 p-2 island'}
                               visibility={p?.visibility}
                               key={p.id}
                               id={p.id}
                               hash={p.hash}
                               image={p.thumbnail}
                               title={p.title}
                               stock={p.stock}
                               price={p.price}
                               discount={p.discountPercentage}
                  >
                    <AddToCartButton variant="outline-success" id={p.id} />
                  </ProductCard>
              ))}
            </Row>
          </Container>
          <Pagination
              className={`container-xl`}
              totalPages={totalPages}
          />
        </>
      </AppStatus>
    </>
  )
}

export default ProductListing;
