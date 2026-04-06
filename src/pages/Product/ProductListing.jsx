import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import AddToCartButton from "../../features/cart/components/AddToCartButton.jsx";
import CategoryNav from "../../components/common/CategoryNav.jsx";
import Pagination from "../../features/pagination/components/Pagination.jsx";
import ProductCard from "../../features/product/components/ProductCard.jsx";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import { useListingContext } from "../../features/listing/contexts/ListingContext.jsx";
import { useUIContext } from "../../contexts/UIContext.jsx";
import {ListingPlaceholder} from "../../features/placeholder/ListingPlaceholder.jsx";
import {DataHandler} from "../../contexts/DataHandler.jsx";
import DropdownRange from "../../components/common/DropdownRange.jsx";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";
import CategoryCarrousel from "../../components/common/CategoryCarrousel.jsx";



function ProductListing() {

  const { error, listings, currentPage,setCurrentPage, totalPages,
    setFilters ,totalElements, loading, fetchData, filters } = useListingContext()
  const [searchParams, setSearchParams] = useSearchParams();



  const [meta, setMeta] = useState({
    title: "Productos",
    message: "",
    description: "",
  });

  const tagsParam = searchParams.get('tags');
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search')
  const categoryParam = searchParams.get('category')

  useEffect(() => {
    if (!searchParam) {
      setMeta({ title: "Productos" });
      setFilters({});
    }
    if (!isNaN(pageParam)) {setCurrentPage(pageParam);}
    if (tagsParam) {setFilters({ tags: tagsParam });}
    if (categoryParam) {
      setFilters({ page: 0, categories: categoryParam });
      if (categoryParam.split(',').length == 1) {
        setMeta((prev) => ({ ...prev, title: categoryParam }));
      }
    }
    if (searchParam) {
      setFilters({ title: searchParam });
      setMeta((prev) => ({
        ...prev,
        title: "Resultados",
        message: `encontrados: ${totalElements}`
      }
      ));
    }


  }, [tagsParam, pageParam, categoryParam,
    searchParam, setFilters, setCurrentPage, totalElements])

  const { showFilter } = useUIContext()


  return (
    <>

      <DataHandler
          loading={loading}
          onRetry={fetchData}
          error={error}
          placeholder={<ListingPlaceholder/>}
          isEmpty={ totalElements === 0 }
      >
        <>
          <Container fluid="xl" className="bg-white rounded mt-2 mb-5 pb-5">
            <div className="w-100 d-flex flex-wrap mt-2 mb-4">
              <span style={{ fontSize: '1.4rem' }} className="text-capitalize fw-semibold me-3" >
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
          />
        </>
      </DataHandler>
    </>
  )
}

export default ProductListing;
