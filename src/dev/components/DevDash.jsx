import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDevContext } from "../contexts/DevContext.jsx";
import { listingDataList, listingSaveAll } from "../data/listingDataList.js";
import { productDataList, productSaveAll } from "../data/productDataList.js";
import { userDataList, userSaveAll } from "../data/userDataList.js";
import { ImgGenApi } from "../utils.js";
import DevItem from "./DevItem.jsx";


const DevDash = () => {

    const { devMode, setDevMode,
        savedProducts, setSavedProducts,
        savedListings, setSavedListings,
        savedUsers, setSavedUsers, loading, error, resetDash,
        setLoading } = useDevContext()


    const navigate = useNavigate();
    const goToBack = () => {
        navigate("/dashboard")
    }

    const handleSend = async (listHandle, state, savedfun) => {
        setLoading(true)
        try {
            const response = await listHandle()
            savedfun(true) // localStorage
            state(true)
        } catch (err) {
            state(false)
        } finally {
            setLoading(false)
        }

    }


    const disabledsavedAll = useMemo(()=>{
        return !(savedListings == true || savedProducts == true || savedUsers == true)
    },[savedListings, savedProducts, savedUsers])

    useEffect(() => {
            if(savedListings == true && savedProducts == true && savedUsers == true){
               setSavedAll(true)
            }
    }, [savedListings, savedProducts, savedUsers]);



    const handleClickListing = async () => {
        await handleSend(
            listingSaveAll, 
            setSavedListings, 
            (value) => localStorage.setItem("savedListings", value)
        )
        ;
    }

    const reset = (value) => localStorage.removeItem(value)

    const handleClickProduct = async () => {
        await handleSend(
            productSaveAll, 
            setSavedProducts, 
            (value) => localStorage.setItem("savedProducts", value)
        )
    }
    const handleClickUser = async () => { 
        await handleSend(
            userSaveAll, 
            setSavedUsers, 
            (value) => localStorage.setItem("savedUsers", value)
        )

    }


    const imgInfo = {
        "icon": "bi-braces",
        "dimension": "120x120",
        "background": ".menta",
        "fontColor":"000",
        "fontWeight": "normal",
        "fontSize":70,
    }

    return (
            <>
                <Container className="mt-4">

                    <div className="w-100 d-flex flex-wrap mt-2 mb-4">
                        <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
                            <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted"
                                style={{ opacity: '.6', background: '' }}></i>
                            <span style={{ fontSize: '1.4rem' }} className="text-capitalize fw-semibold me-3" >
                               DevDash
                            </span>
                        </Link>
                        <span style={{ lineHeight: '2.3rem' }} className="m-0 text-secondary">
                           <b>panel</b> de desarrollo
                        </span>
                    </div>

                    <Row>

                        <Col md={12} lg={6}>
                            <DevItem
                                success={savedListings}
                                image={ImgGenApi({...imgInfo, "background": ".menta"})}
                                title='Publicaciones'
                                description='Cargar muestra de publicaciones'
                                cantidad={listingDataList?.length}
                                handle={handleClickListing}
                                reset={()=>{
                                    reset("savedListings")
                                    setSavedListings(null)
                                }}
                            />
                        </Col>


                        <Col md={12} lg={6}>
                            <DevItem
                                success={savedListings}
                                image={ImgGenApi({...imgInfo, "background": ".menta"})}
                                title='Carga Masiva por archivo'
                                description='Cargar muestra por archivo JSON'
                                cantidad={null}
                                handle={()=>navigate("uploader/")}
                                labelBtn={'ver'}
                            />
                        </Col>

                        <Col md={12} lg={6}>
                            <DevItem
                                success={savedUsers}
                                image={ImgGenApi({...imgInfo, "background": ".limon"})}
                                title='Usuarios'
                                description='Cargar muestra de usuarios'
                                cantidad={userDataList?.length}
                                handle={handleClickUser}
                                reset={()=>{
                                    reset("savedUsers")
                                    setSavedUsers(null)
                                }}
                            />
                        </Col>

                        <Col md={12} lg={6}>
                            <DevItem
                                success={savedProducts}
                                image={ImgGenApi({...imgInfo, "background": ".rosa"})}
                                title='Productos'
                                description='Cargar muestra de productos'
                                cantidad={productDataList?.length}
                                handle={handleClickProduct}
                                reset={()=>{
                                    reset("savedProducts")
                                    setSavedProducts(null)
                                }}
                            />
                        </Col>



                    </Row>

                </Container>
            </>
        )

};


export default DevDash;
