import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Img0 from "../assets/cubic.png";
import Pagination from "../features/pagination/components/Pagination.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { listingDataList } from "./listingDataList.js";
import { listingService } from '../features/listing/services/listingService.js';

const ListingDev = () => {


  const { currentItems, items,setItems, setItemsPerPage, currentPage, setCurrentPage, totalPages } = useUIContext();
  



  const [ listingDraft, setListingDraft ] = useState({});
  const [ listingDraftList, setListingDraftList ] = useState([]);
  const [currentItem, setCurrentItem ] = useState();
  const [loading, setLoading] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingALL, setIsCreatingALL ] = useState(false)

  useEffect(() => {
    setListingDraftList(listingDataList)
    setItems(listingDraftList)
    setItemsPerPage(8)
    setLoading(true)
  },[items])



  const handleSend = async (productData) => {
    try {
      await listingService.createWithImage(productData, null)
      handleDeleteDraft();
    } catch (error) {
      alert("Error creando item");
      console.error(error);
    }
  };


  const handleDeleteDraft  = async () => {
    alert("Operacion exitosa!")
    const updateDraftList = listingDraftList.filter(l => l.id != currentItem.id)
    setListingDraftList(updateDraftList)
  } 

  const handleDeleteAllDraft = async () => {
    alert("Operacion exitosa!")
    setListingDraftList([]);
    setIsCreatingALL(false);
  }

  const handleSendAll = async () => {
    const listingDataList = listingDraftList; 
    try {
      await listingService.createBulk(listingDataList);
      handleDeleteAllDraft()
    } catch (error) {
      alert("Error creando item");
      console.error(error);
    }
  }


  const toPublish = (item) => {
     setCurrentItem(item)
     handleSend(item)
  }

  const toPublishAll = () => {
     handleSendAll()
  }



  return (
    <>
    <Container className="mt-4">
      
    <div className="w-100 d-flex flex-wrap mt-2 mb-4">
         <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
         <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted" 
               style={{opacity: '.6', background: ''}}></i>
         <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
            Dashboard
         </span>
         </Link>
         <span style={{lineHeight: '2.3rem'}} className="text-secondary">
          <b>Borradores</b> de publicaciones
         </span>
    </div>

      
      <Button variant="primary" onClick={toPublishAll} className="mb-5">
        <i className="bi bi-plus-lg"></i>
        <span className="ms-2">Publicar Todo</span>
      </Button>

      {/* <FilterBar  order="order-1" className="d-block"
          items={products} 
          filterDraft={filterDraft} 
          onFilterDraft={setFilterDraft} 
          onActiveFilters={setActiveFilters} 
          onResetFilter={setResetFilter}>
          <SearchLive 
             items={products}
             handleSearch={setSearch}
          />
      </FilterBar> */}
      
      <Table striped={true} hover={true}>
        <thead className="d-none">
          <tr>
            <th></th>
            <th style={{ width: '60%' }}>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(
            currentItems.map((item, index) => (
              <tr style={{borderStyle: "hidden"}} key={index}>
                <td>
                  {item.id ? item.id : <img style={{opacity: '0.7999'}} width={55} src={Img0} /> } 
                </td>
                <td style={{ width: '60%', lineHeight: '55px' }}>{item.title}</td>
                <td style={{ textAlign: "end", lineHeight: '55px'}}>

                  {/* READ  */}

                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-3 mb-1"
                  >
                    <i className="bi bi-eye"></i>
                    <span className="ms-2 small">VER</span>
                  </Button>

                  {/* CREATE */}
                  
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => toPublish(item)}
                    className="me-3 mb-1"
                  >
                    <i className="bi bi-send-fill"></i>
                    <span className="ms-2 small">PUBLICAR</span>
                  </Button>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

    </Container>
    </>
  );
};


export default ListingDev;
