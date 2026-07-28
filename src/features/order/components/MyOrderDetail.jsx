import { useMemo } from "react";
import { Card } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useOrderDetailContext } from "../contexts/OrderDetailContext";
import CartNavButton from "@/features/cart/components/CartNavButton";

export const MyOrderDetail = ({check}) => {

    const {currentOrder} = useOrderDetailContext()
    
    return (
        <>
        <Card // style={{top: (width > 900 ? "55px" : 0)  }}
                   className={`m-2 p-4 island`} >
            <Card.Text className="h5 fw-bold text-secondary py-2">
                Order Details
            </Card.Text>
            <hr/>

            {/* SUBTOTAL */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                    Subtotal ({currentOrder?.totalQuantity} unidades)</Card.Text>
                <Card.Text className="fw-bold">
                    ${currentOrder?.totalAmount?.toFixed(2)}
                </Card.Text>
            </div>

            {/* DESCUENTOS */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Descuento {check && '(1 cupon)'} </Card.Text>
                <Card.Text className="fw-bold">
                   {/* ${Order?.descuento.toFixed(2)}*/}
                </Card.Text>
            </div>

            {/* ENVIO */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Envio</Card.Text>
                <Card.Text className="fw-bold small text-success">
                    Gratis
                </Card.Text>
            </div>
            <hr/>

            {/* TOTAL */}
            <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
                <Card.Text className="hs-5 fw-bold m-0">TOTAL</Card.Text>
                <Card.Text className="h5 fw-bold">
                    ${currentOrder?.totalAmount?.toFixed(2)}
                </Card.Text>
            </div>

        </Card>

            <div style={{ marginTop: '10px' }} className="border p-3 mx-2 d-flex justify-content-center gap-3 island">
              <CartNavButton  
                visible={true} 
                variant="success disabled"
                title="ENTREGADO" 
                icon="bi bi-check-circle me-2"
              />
              
            </div>

        </>
    );
}
