import { useMemo } from "react";
import { Card } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import { useWindowsWidth } from "../../../contexts/useWindowSize.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export const MyOrderCart = ({check, oncheck, handle}) => {

    const {totalPrice, cartItems, couponDiscount} = useCart()

    const buyMatch = useMatch("/cart/:buy")

    const width = useWindowsWidth()

    const Order = useMemo(() => {
        const descuento = couponDiscount ? 5.0 : 0;
        const envio = 10.30;
        return ({
            envio: envio,
            descuento: descuento,
            subtotal: totalPrice,
            total: totalPrice + envio - descuento
        });
    }, [check, totalPrice]);

    return (
        <Card // style={{top: (width > 900 ? "55px" : 0)  }}
                   className={`m-2 p-4 island`} >
            <Card.Text className="h5 fw-bold text-secondary py-2">
                Mi pedido
            </Card.Text>
            <hr/>

            {/* SUBTOTAL */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                    Subtotal ({cartItems?.length} unidades)</Card.Text>
                <Card.Text className="fw-bold">
                    ${totalPrice?.toFixed(2)}
                </Card.Text>
            </div>

            {/* DESCUENTOS */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Descuento {check && '(1 cupon)'} </Card.Text>
                <Card.Text className="fw-bold">
                    ${Order?.descuento}
                </Card.Text>
            </div>

            {/* ENVIO */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Envio</Card.Text>
                <Card.Text className="fw-bold">
                    ${Order?.envio}
                </Card.Text>
            </div>
            <hr/>

            {/* TOTAL */}
            <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
                <Card.Text className="hs-5 fw-bold m-0">TOTAL</Card.Text>
                <Card.Text className="h5 fw-bold">
                    ${Order?.total?.toFixed(2)}
                </Card.Text>
            </div>

        </Card>
    );
}
