import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import AddToCartButton from "../components/cart/AddToCartButton";
import CategoryNav from "../components/common/CategoryNav";
import Pagination from "../components/pagination/Pagination";
import CardProduct from "../components/product/CardProduct";
import SearchFilter from "../components/search/SearchFilter";
import { useListings } from "../contexts/ListingContext";
import { useUIContext } from "../contexts/UIContext";
import { ListingPlaceholder } from "../components/listing/ListingPlaceholder";



function Products() {

  const { error, listings, currentPage, setCurrentPage, totalPages, setFilters, totalListings, loading, fetchData } = useListings()
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
    if (!isNaN(pageParam)) {
      setCurrentPage(pageParam);
    }
    if (tagsParam) {
      setFilters({ tags: tagsParam });
    }
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
        message: `encontrados: ${totalListings}`
      }
      ));
    }
  }, [tagsParam, pageParam, categoryParam, searchParam, searchParam])


  const { showFilter } = useUIContext()

  return (
    <>
      {loading ? (
      
      // PLACEHOLDER --
        <Container fluid="xl" className="bg-white rounded mt-2 mb-5 pb-5">
          <h5 className="card-title placeholder-glow mb-4">
            <span className="placeholder col-1"></span>
          </h5>
          <Row>
            {[...Array(6)].map((_, i) => <ListingPlaceholder key={i} />)}
          </Row>
        </Container> ) : error ? (

    //  ERROR --
    <div className="col-12 text-center py-5">
      <div className="alert alert-danger shadow-sm">
        <p className="mb-0">⚠️ {error}</p>
        <button className="btn btn-outline-danger btn-sm mt-3" onClick={() => fetchData(1, {})}>
           Reintentar carga
        </button>
      </div>
    </div> ) : (

    // CONTENT --
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
                <CategoryNav show={showFilter} />
                <SearchFilter
                  items={listings}
                  className="" />
              </> : ''
            }
            <Row>
              {listings.map((p) => (
                <CardProduct className={'border m-2'}
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
                </CardProduct>
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
     )}
    </>
  )
}

export default Products;
