import {step} from "../../../utils/posts.js";
import StepPublicacion from "./StepPublicacion.jsx";
import StepProductOption from "./StepProductOption.jsx";
import ProductSelectTable from "./ProductSelectTable.jsx";
import StepProductos from "./StepProducto.jsx";
import {CRUD} from "../../../utils/crud.js";
import StepDetalles from "./StepDetalles.jsx";
import StepUploadImage from "./StepUploadImage.jsx";
import {StepNavigation} from "./StepNavigation.jsx";
import {Col} from "react-bootstrap";
import {useState} from "react";
import {useListingsForm} from "../hooks/ListingFormContext.jsx";
import StepWelcomeEdit from "./StepWelcomeEdit.jsx";
import StepWelcomeCreate from "./StepWelcomeCreate.jsx";


function ListingFormCrud({className, style}){


    const [currentStep, setCurrentStep] = useState(0);
    const [isSelectedProduct, setIsSelectedProduct] = useState(false)
    const [enabled, setEnabled] = useState(true)
    const { modalMode, currentItem, setProductMode, setCurrentItem } = useListingsForm()


    const handleProductMode = (mode) => {
        setEnabled(mode === 'SELECT' ? false : true)
        setProductMode(mode)
        setCurrentStep(
            mode == "SELECT" ?
                step.TABLE :
                step.PRODUCT
        )
    }

    const handleSelect = (elem) => {
        setIsSelectedProduct(true);
        setCurrentItem((prev) => ({
            ...prev,
            productName: elem.name,
            productId: elem.id,
            sku: elem.sku,
            brand: elem.brand,
            stock: elem.stock,
            weight: elem.weight
        }))
    }


    return (
        <Col style={style} className={`${className ||''}`}>

            <div>

                {currentStep === step.WELCOME &&
                    modalMode === CRUD.CREATE && (
                    <StepWelcomeCreate></StepWelcomeCreate>
                )}

                {currentStep === step.WELCOME &&
                    modalMode === CRUD.UPDATE && (
                    <StepWelcomeEdit></StepWelcomeEdit>
                )}

                {currentStep === step.PUBLICATION && (
                    <StepPublicacion  >
                        <p style={{fontWeight: '500'}}  className="fs-5 mb-4">Informacion de Publicacion</p>
                        <p
                            style={{ opacity: '.5' }}
                            className="d-none my-4 small">
                            Los campos a completar son necesarios para finalizar el proceso.
                        </p>
                    </StepPublicacion>
                )}
                {currentStep === step.OPTIONS && (
                    <StepProductOption handleProductMode={handleProductMode}>
                        <p  style={{fontWeigth: '500'}} className="fs-5 mb-4">Producto</p>
                        <p
                            style={{ opacity: '.5' }}
                            className="mt-4 mb-5 bg-white">
                            Para continuar <b>selecciona</b> un producto que ya publicaste rapidamente o <b>crea</b> un nuevo producto
                        </p>
                    </StepProductOption>
                )}
                {currentStep === step.TABLE && (
                    <ProductSelectTable handleSelect={handleSelect}>
                        <p className='fs-5 mb-4'>
                            Selecciona un Producto
                        </p>
                    </ProductSelectTable>
                )}

                {currentStep === step.PRODUCT && (
                    <StepProductos>
                        <p style={{fontWeigth: '500'}} className="fs-5 mb-4">
                            Producto
                        </p>
                        {modalMode === CRUD.UPDATE &&
                            <p
                                style={{ opacity: '.5' }}
                                className="mb-4">
                                Puedes ver toda la informacion del  producto publicado y solo editar campos especificos como: <b>precio</b> y <b>descuento</b>. <br />
                                Para <b>editar</b> los demas campos del producto ve a la seccion correspondiente <b>(*?)</b>
                            </p>}

                    </StepProductos>
                )}

                {currentStep === step.DETAILS && (
                    <StepDetalles>
                        <p className="fs-4 mb-4">
                            Detalles
                        </p>
                    </StepDetalles>
                )}

                {currentStep === step.UPLOAD && (
                    <StepUploadImage
                        productId={currentItem.id}
                        title="Subir Imagen del Producto"
                    >
                    </StepUploadImage>
                )}
            </div>


            <StepNavigation
                showNavigation={modalMode === CRUD.CREATE}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                isSelectedProduct={isSelectedProduct}
            />

        </Col>
    )
}

export default ListingFormCrud;