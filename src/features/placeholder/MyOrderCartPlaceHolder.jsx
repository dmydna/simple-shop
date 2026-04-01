import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useWindowsHeight, useWindowsWidth } from "../../contexts/useWindowSize.jsx";


export const MyOrderCartPlaceHoder = () => {


    const width = useWindowsWidth()
    return (
        <Card style={{ top: (width > 900 ? "55px" : 0) }}
            className={` sticky-md-top m-2 p-4 island`} >
            <p style={{opacity: '.4'}} className="card-text placeholder-glow d-flex gap-3 justify-content-between">
                <span className="placeholder col-12"></span>
            </p>
            <hr />

            {/* SUBTOTAL */}
            <p style={{opacity: '.4'}} className="card-text placeholder-glow d-flex gap-3 justify-content-between">
                <span className="placeholder col-6"></span>
                <span className="placeholder col-2"></span>
            </p>


            {/* DESCUENTOS */}
            <p  style={{opacity: '.4'}} className="card-text placeholder-glow d-flex gap-3 justify-content-between">
                <span className="placeholder col-4"></span>
                <span className="placeholder col-2"></span>
            </p>


            {/* ENVIO */}
            <p style={{opacity: '.4'}} className="card-text placeholder-glow d-flex gap-3 justify-content-between">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
            </p>

            <hr />

            {/* TOTAL */}

            <p style={{opacity: '.4'}} className="card-text placeholder-glow d-flex gap-3 justify-content-between">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
            </p>

            <span style={{opacity: '.4'}} className="placeholder-glow">
                <a className="btn bg-dark placeholder col-12 disabled" aria-disabled="true"></a>
            </span>
        </Card>
    )
}