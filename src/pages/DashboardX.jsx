import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useMatch, useNavigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartCupon from "../features/cart/components/CartCupon.jsx";
import CartEmpty from "../features/cart/components/CartEmpty.jsx";
import ProductBuyModal from "../features/product/components/ProductBuyModal.jsx";
import { useCart } from "../features/cart/contexts/CartContext.jsx";
import Img0 from "/src/assets/empty-cart.png";
import {MyCart} from "../features/cart/components/MyCart.jsx";
import {MyOrderCart} from "../features/cart/components/MyOrderCart.jsx";
import ListingTable from "../features/listing/components/ListingTable.jsx";
import FilterBar from "../features/filters/components/FilterBar.jsx";
import SearchLive from "../features/search/SearchLive.jsx";
import DropdownCheck from "../components/common/DropdownCheck.jsx";
import {useListings} from "../features/listing/hooks/ListingContext.jsx";
import {useUIContext} from "../contexts/UIContext.jsx";
import {useListingsForm} from "../features/listing/hooks/ListingFormContext.jsx";
import {CRUD} from "../utils/crud.js";
import ListingCRUD from "./ListingCRUD.jsx";
import ListingPanel from "../features/listing/components/ListingPanel.jsx";
import ListingFormCrud from "../features/listing/components/ListingFormCrud.jsx";




function DashboardX() {

    const { listings, setFilters } = useListings()
    const {onHideFilter} =  useUIContext();

    const { handleDelete, handleVisibility,
        setShowModal, setModalMode, setCurrentItem } = useListingsForm()


    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()

    // Carga inicial

    useEffect(()=>{
        if(search)  setFilters({page:0, title: search })
    }, [search])

    useEffect(() => {
        onHideFilter(true);
        if(!isCreating){ setIsCreating(true) }
    }, []);


    const openCreateModal = () => {
        setModalMode(CRUD.CREATE);
        setCurrentItem({ title: "", description: "" });
        setShowModal(true);
        handleExpandx(0)
    };

    const openEditModal = (item) => {
        setModalMode(CRUD.UPDATE);
        setCurrentItem(item);
        setShowModal(true);
        handleExpandx(0)
    };




    const [expandx, setExpandx] = useState(false);
    const [hasExpandx, setHasExpandx] = useState(1);

    const handleExpandx = (island) => {
        setHasExpandx(island)
        if(island !== hasExpandx){
            setExpandx(prev => !prev);
        }
    }


  return(
          <Container fluid="xl" className="mt-4">
            <Row className="g-0" md={4}>

                <div className="w-100 d-flex flex-wrap mt-2 mb-4">
                    <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
                        <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted"
                           style={{opacity: '.6', background: ''}}></i>
                        <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                                  Dashboard
                       </span>
                    </Link>
                    <span style={{lineHeight: '2.3rem'}} className="text-secondary">
                              Administra tus publicaciones
                   </span>
              </div>

              {/* MY CART */}
              <Col
                  // onClick={()=>handleExpandx(0)}
                  className={`col-12 col-md-12 col-lg-12 col-xl-${expandx ? '5' : '12'}`}>
                  <Card className="my-2 p-4 border island" >
                      <FilterBar
                          dataSource={listings}
                          onApply={setFilters}
                          className="d-block"
                          concealable={false}
                      >
                          <Button variant="primary" onClick={openCreateModal} className="my-2">
                              <i className="bi bi-plus-lg"></i>
                              <span className="ms-2">Create new</span>
                          </Button>
                          <SearchLive className='flex-fill' items={listings} handleSearch={setSearch} />
                          <DropdownCheck variant="light"  className="border rounded my-2">
                              <span className="fw-semibold">etiquetas</span>
                          </DropdownCheck>
                      </FilterBar>
                  </Card>
                  <ListingTable>
                      {(key, item)=>{
                          if(key=='title'){
                              return (
                                <>
                                    <p className="h5 my-4">Publicaciones</p>
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
                                      {/** Delete */}
                                      <Button
                                          variant="outline-secondary"
                                          size="sm"
                                          onClick={() => handleDelete(item.id)}
                                          className="me-3 mb-1 border"
                                      >
                                          <i className="bi bi-trash3"></i>
                                      </Button>
                                      {/** Visibility */}
                                      <Button
                                          variant="secondary"
                                          size="sm"
                                          onClick={() => handleVisibility(item)}
                                          className="mb-1 border"
                                      >
                                          <i className="bi bi-eye"></i>
                                      </Button>

                                  </>
                              )
                          }

                      }}
                  </ListingTable>
              </Col>

              {/* CUPON */}

              <Col
                  // onClick={()=>handleExpandx(1)}
                  className={`col-12 col-md-12 col-lg-12 col-xl-${expandx ? '7' : '0'}`}>


                {/* MY ORDER CART  */}
                <ListingFormCrud
                    style={{top: '60px'}}
                    className="m-2 sticky-md-top rounded border p-4 island"
                />
              </Col>
              <ToastContainer />
            </Row>
          </Container>
  )

}

export default DashboardX;
