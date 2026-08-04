import { useMemo } from "react";
import { Card } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import { useWindowsWidth } from "../../../contexts/useWindowSize.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export const MyOrderCart = ({check, oncheck, handle}) => {

    const {totalPrice,totalDiscount, cartItems, cartCount,  couponDiscount} = useCart()

    const buyMatch = useMatch("/cart/:buy")

    const width = useWindowsWidth()


    const totalAmountDiscounts = useMemo(() => {
        let result = 0;

        for (let { finalPrice, discountPercentage, cantidad } 
            of cartItems || []) {

            const qty = Number(cantidad) || 0;
            if (qty === 0) continue;

            const percent = Number(discountPercentage) || 0;
            if (percent <= 0) continue; 

            const decimalDiscount = percent / 100;
            if (decimalDiscount >= 1) { continue; }

            const priceOriginal = finalPrice / (1 - decimalDiscount);
            const totalOriginal = priceOriginal * qty;
            const totalPaid = finalPrice * qty;
            const discountAmount = totalOriginal - totalPaid;

            result += discountAmount;
        }

        return result;
    }, [cartItems]);

    const Order = useMemo(() => {
        const descuento = couponDiscount ? 5.0 : 0;
        const envio = 0.0;
        return ({
            envio: envio,
            descuento: totalDiscount,
            subtotal: totalPrice,
            total: totalPrice + envio - descuento
        });
    }, [check, totalPrice, totalDiscount]);

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
                    Subtotal ({cartCount} unidades)</Card.Text>
                <Card.Text className="fw-bold">
                    ${totalPrice?.toFixed(2)}
                </Card.Text>
            </div>

            {/* DESCUENTOS */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Descuentos {check && '(1 cupon)'} </Card.Text>
                <Card.Text className="fw-bold">
                    - ${totalAmountDiscounts.toFixed(2)}
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
                    ${Order?.total?.toFixed(2)}
                </Card.Text>
            </div>

        </Card>
    );
}
