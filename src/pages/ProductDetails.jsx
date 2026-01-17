import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CardReview from "../components/common/CardReviews";
import ProductBuyCard from "../components/product/ProductBuyCard";
import ProductSpecs from "../components/product/ProductSpecs";
import CarouselImages from "../components/common/CarouselImages";
import { useListings } from "../contexts/ListingContext";



function ProductDetails() {

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const name = decodeURIComponent(useParams().name)
   const { products } = useListings()

   return (
      <Container fluid="xl" className="bg-white rounded mt-2 pt-2">
         <>
            {products.map((p) => (
               name != p.title ?
                  '' :
                     <Row className="g-3" key={p.id}>
                        {/**Breadcrumb */}
                        <Col className="mb-5" xs={12}>
                           <Link className='text-decoration-none fw-bold' to='/productos'> Volver</Link>
                           <span className="fw-bold mx-2"> | </span>
                           <Link className='text-decoration-none text-capitalize'
                              to={`/productos/category/${p.category || ''}`}>
                              {p.category}
                           </Link>
                        </Col>

                        {/** Carrousel */}
                        <Col sm={12} md={7}>
                           <CarouselImages  order={true} className="mx-0 my-3 p-4" col={1} images={p.images}>
                           </CarouselImages>
                        </Col>

                        {/**Buy Card */}
                        <Col style={{ top: '55px' }} className="sticky-md-bottom" xs={12} md={5}>
                           <ProductBuyCard
                              id={p.id}
                              title={p.title}
                              rating={p.rating}
                              ship={p.shippingInformation}
                              stock={p.stock}
                              price={p.price}
                              discount={p.discountPercentage}
                           />
                        </Col>

                        {/**Product Specs */}
                        <Col className="m-3 mt-5 mx-0" sm={12} md={7}>
                           <Col md={12}>
                              <ProductSpecs producto={p} >
                                 <div className="fs-5 fw-medium mb-5">Características del producto</div>
                              </ProductSpecs>
                           </Col>
                        </Col >

                        {/**Product Description */}
                        <Col className="m-3 mx-0" xs={12} md={7}  >
                           <Col md={12} >
                              <div className="fs-5 fw-medium mb-5">Descripcion</div>
                              <p>{p.description || 'N/A'}</p>
                           </Col>
                        </Col >

                        {/**Product Reviews */}
                        <Col className="m-3 mx-0" xs={12} md={7}>
                           <Col md={12} >
                              <div className="fs-5 fw-medium mb-5">Opiniones</div>
                              {p.reviews?.map(r =>
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
                     </Row>
            ))}
         </>
      </Container>
   );
}

export default ProductDetails