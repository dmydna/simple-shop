import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import CardFeature from "../components/common/CardFeature";
import CardPromo from "../components/common/CardPromo";
import CouponModal from "../components/common/CouponModal";
import ProductCarousel from "../features/product/components/ProductCarousel.jsx";
import ProductSection from "../features/product/components/ProductSection.jsx";

import Img8 from "../assets/discount.png";
import Img2 from "../assets/dressing-table.png";
import Img1 from "../assets/lipstick.png";
import Img6 from "../assets/new-product.png";
import Img10 from "../assets/online-store.png";
import Img4 from '../assets/open-store.png';
import Img5 from "../assets/purchasing.png";
import Img3 from "../assets/snowman.png";
import { AppStatus } from "../components/common/AppStatus.jsx";
import BannerAds from "../components/common/BannerAds";
import { useAuth } from "../features/auth/hooks/AuthContext.jsx";
import { useListingContext } from "../features/listing/contexts/ListingContext.jsx";
import { FeaturesPlaceholder } from "../features/placeholder/FeaturesPlaceholder.jsx";

function Home() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

    const {loading, totalElements, error, fetchData} = useListingContext();
    const {isAuth} = useAuth()



    const [showCupon, setShowCupon] = useState()

    return (
        <AppStatus
            loading={loading}
            onRetry={fetchData}
            error={error}
            placeholder={<FeaturesPlaceholder/>}
            isEmpty={  totalElements === 0 }
        >
            <>

                {/** Features */}

                <div className="bg-heaven">
                    <Container fluid="xl">
                        <Row className="g-4 py-3 mb-3">
                            <CardFeature
                                title='Compra Protegida'
                                image= {Img5}
                                text='Podes devolver tu compra gratis'
                            />
                            <CardFeature
                                id={'cupon'}
                                title='Cupones'
                                image={Img8}
                                text='Descubri los mejores descuentos'
                            />
                            <CardFeature
                                title='Envios Express'
                                image= {Img6}
                                text='Recibi tu compra mas rapido'
                            />
                            <CardFeature
                                title='Tiendas oficiales'
                                image={Img4}
                                text='Encontra tus marcas preferidas'
                            />
                        </Row>
                    </Container>
                </div>

                {/** Home Banner */}
                {/*
                <HeroBanner image={Img3} variant="white">
                    <h2> Increibles Descuentos </h2>
                    <h2> en <b>ropa de invierno</b> </h2>
                    <div className="d-flex align-items-center gap-2">
                        <p className="border rounded px-3 py-1 small bg-white"
                            style={{transform: "translateY(28px)"}}>ver marcas</p>
                    </div>
                </HeroBanner> */}

                {/** Banner ads */}

                <Container fluid="xl" className={`mb-3`}>
                    <Row className="g-0">
                        <BannerAds
                            className={"bg-color-heaven my-3 me-md-2 me-0"}
                            image={Img10}
                            btnText={'ver ofertas'}
                        >
                            <h5 className="mb-0"> Increibles Descuentos </h5>
                            <h5> usando la <b>App</b> </h5>
                        </BannerAds>
                        <BannerAds
                            image={Img3}
                            className={"bg-wave-0 my-3 ms-md-2 ms-0"}
                            btnText={'ver marcas'}
                        >
                            <h5 className="mb-0"> Temporada Invierno </h5>
                            <h5> con <b>precios congelados</b> </h5>
                        </BannerAds>
                    </Row>
                </Container>

                <Container fluid="xl">

                    {/** Product Ilands */}

                    <Row className="g-0">
                        <ProductSection
                            maxElems={4}
                            maxCols={4}
                            className="border p-4 my-3 island"
                            filter={{ categories : ["fragrances"] }}
                        >
                            <p className="fs-4 fw-medium pb-0 m-0">Lo mas visto</p>
                            <Link to={'/products'} className="text-decoration-none fw-bold">ver mas</Link>
                        </ProductSection>
                    </Row>


                    <Row className="g-0">
                        <Col className="p-0 my-3" md={12} lg={4}>
                            <ProductSection
                                maxCols={1}
                                maxElems={1}
                                className="border p-4 m-0 me-lg-3 island"
                                filter={{ tags : ["vegetables"] }}
                            >
                                <p className="fs-5 fw-medium pb-0 m-0 ">Oferton del día</p>
                                <Link to="/products" className="text-decoration-none fw-bold">ver más</Link>
                            </ProductSection>
                        </Col>

                        <Col className="p-0 my-3" md={12} lg={8}>
                            <ProductSection
                                maxCols={3}
                                maxElems={3}
                                className="border p-4 island"
                                filter={{ categories : ["furniture"] }}
                            >
                                <p className="fs-5 fw-medium pb-0 m-0 ">Para llevar más de uno</p>
                                <Link to="/products" className="text-decoration-none fw-bold">ver más</Link>
                            </ProductSection>
                        </Col>

                    </Row>


                    {/** Carousels  */}

                    <Row className="g-0">
                        <ProductCarousel
                            className="border mx-0 my-3 p-4 island"
                            filter={{ categories : ["furniture"] }}
                            maxCols={3}
                        >
                            <h3 className="fs-5 fw-medium pb-0 m-0 ">Con envio gratis</h3>
                            <Link to={'/products?category=groceries'}
                                  className="text-decoration-none fw-bold">
                                Ver mas
                            </Link>
                        </ProductCarousel>
                    </Row>


                    <Row className="g-0">
                        <ProductCarousel
                            className="border mx-0 my-3 p-4 island"
                            filter={{ categories : ["beauty"] }}
                            maxCols={4}
                            maxElems={4}>
                            <h3 className="fs-5 fw-medium pb-0 m-0 ">Ofertas</h3>
                            <Link to={'/products?category=groceries'}
                                  className="text-decoration-none fw-bold">
                                ver mas
                            </Link>
                        </ProductCarousel>
                    </Row>


                    {/** Card Promos */}

                    <Row className="g-0">
                        <CardPromo className="my-3 me-md-1 me-0" Img={Img1} variant="primary" to={'/products/category/beauty'} cta="comprar ahora">
                            <p className="mb-1">6 cuotas sin interés</p>
                            <p className="h5 fw-bold mb-1">HASTA 40% OFF EN</p>
                            <p className="h5 fw-bold">PERFUMES Y BELLEZA</p>
                        </CardPromo>
                        <CardPromo className="my-3 ms-md-1 ms-0" Img={Img2} variant="success" to={'/products/category/furniture'} cta="ver ofertas">
                            <p className="mb-1">6 cuotas sin interés</p>
                            <p className="h5 fw-bold mb-1">2X1 EN ARTICULOS</p>
                            <p className="h5 fw-bold">PARA EL HOGAR</p>
                        </CardPromo>
                    </Row>


                </Container>
            </>
            <CouponModal show={showCupon} onHide={setShowCupon}/>

        </AppStatus>


    )

}

export default Home;
