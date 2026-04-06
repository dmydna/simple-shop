import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CardReview from "../../components/common/CardReviews.jsx";
import CarouselImages from "../../components/common/CarouselImages.jsx";
import BreadCrumb from "../../components/layout/BreadCrumb.jsx";
import { DataHandler } from "../../contexts/DataHandler.jsx";
import { useListingContext } from "../../features/listing/contexts/ListingContext.jsx";
import { DetailsPlaceholder } from "../../features/placeholder/DetailsPlaceholder.jsx";
import ProductBuyCard from "../../features/product/components/ProductBuyCard.jsx";
import ProductCarousel from "../../features/product/components/ProductCarousel.jsx";
import ProductSpecs from "../../features/product/components/ProductSpecs.jsx";



function ProductDetails() {


   const {name, hash} = useParams()

   const { currentListing, error, loading, setListingHash, fetchDataByHash } = useListingContext()

   useEffect(()=>{
      setListingHash(hash)
      console.log(currentListing)
      window.scrollTo({
         top: 0,
         behavior: 'instant'
      });
   },[hash])


   return (
       <DataHandler
           loading={loading}
           onRetry={fetchDataByHash}
           error={error}
           placeholder={<DetailsPlaceholder />}
       >
          <Container fluid="xl" className="bg-white rounded mt-2 pt-2">
             <>
                { !currentListing ?
                    '' :
                    <>
                       <Row className="g-3" key={currentListing.id}>

                          <BreadCrumb
                              tags={currentListing.tags || []}
                              category={currentListing.category}
                          />

                          {/** Carrousel */}
                          <Col sm={12} md={7}>
                             <CarouselImages
                                 order={true}
                                 className="m-0"
                                 col={1}
                                 images={currentListing.images}>
                             </CarouselImages>
                          </Col>

                          {/**Buy Card */}
                          <Col style={{ top: '60px' }} className="sticky-md-bottom" xs={12} md={5}>
                             <ProductBuyCard
                                 className='p-2 border island h-100'
                                 id={currentListing.id}
                                 title={currentListing.title}
                                 rating={currentListing.rating}
                                 ship={currentListing.shippingInformation}
                                 stock={currentListing.stock}
                                 price={currentListing.price}
                                 discount={currentListing.discountPercentage}
                             />
                          </Col>

                          {/**Product Specs */}
                          <Col className="mt-3 mt-5 mx-0" sm={12} md={7}>
                             <Col md={12} className='rounded p-4 border island' >
                                <ProductSpecs producto={currentListing} >
                                   <div className="fs-5 fw-medium mb-5">
                                      Características del producto
                                   </div>
                                </ProductSpecs>
                             </Col>
                          </Col >

                          {/**Product Description */}
                          <Col  className="mt-3 mx-0" xs={12} md={7}  >
                             <Col md={12} style={{minHeight:"220px"}} className='rounded p-4 border island' >
                                <div className="fs-5 fw-medium mb-5">Descripcion</div>
                                <p>{currentListing.description || 'N/A'}</p>
                             </Col>
                          </Col >

                          {/**Product Reviews */}
                          {currentListing.reviews &&
                              currentListing.reviews.length > 0 &&  (
                                  <Col className="mt-3 mx-0" xs={12} md={7}>
                                     <Col md={12} className='p-4 border rounded island' >
                                        <div className="fs-5 fw-medium mb-5">Reseñas</div>
                                        {currentListing.reviews.map(r =>
                                            <CardReview
                                                key={r.id}
                                                id={r.id}
                                                comment={r.comment}
                                                rating={r.rating}
                                                date={r.date}
                                            />
                                        ) || ''}
                                     </Col>
                                  </Col >
                              )}
                       </Row>
                       {/** Carousels  */}
                       <Row className="g-0">
                          <ProductCarousel
                              className="border mx-0 my-3 p-4 island"
                              filter={{ categories : [currentListing.category] }}
                              maxCols={4}
                              imgSize={140} >
                             <h3 className="fs-4 fw-medium pb-0 m-0 ">Productos similares</h3>
                             <Link to={`/products?category=${currentListing.category}`}
                                   className="text-decoration-none fw-bold">
                                Ver mas
                             </Link>
                          </ProductCarousel>
                       </Row>
                    </>
                }
             </>
          </Container>
       </DataHandler>
   );
}

export default ProductDetails
