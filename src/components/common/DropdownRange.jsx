import React, { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import {useFilterBarContext} from "@features/filters/context/FilterBarContext.jsx";



function DropdownRange({ children, min, max, defaultValue, type, style, className, variant }) {

    const [range, setRange] = useState({minPrice: min, maxPrice: max});
    const { onFilterDraft } = useFilterBarContext()

    useEffect(()=>{
        // no guarda filtro si tiene valores por default
        if(range
            && range?.maxPrice != max
            && range?.maxPrice != min
        ){
            onFilterDraft( prev => ({
                ...prev,
                minPrice: range.minPrice,
                maxPrice: range.maxPrice
            }))
        }
    },[range])


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setRange({ ...range, [name]: val });
    }

    const toggleText = `${type}${range.minPrice} - ${type}${range.maxPrice}`

    return(

        <Dropdown  style={style} className={`${className}`}>
            <Dropdown.Toggle
                style={{opacity: '.6'}}
                variant={variant}
                className="d-flex align-items-center container-fluid text-start toggle-end" id="dropdown-basic">
                {children}  :
                <span className="small text-muted fw-semibold mx-3">
                 { range.maxPrice != max || range.minPrice != min ? `${toggleText}` : 'Seleccionar' }
            </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Row  style={{minWidth: "320px"}} className="p-3 align-items-center">
                    <Col className="mb-2" xs={12}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center p-0 m-0">
                                <small className="text-muted">Minimo: {type}</small>
                                <div style={{maxWidth: "60px"}} className="p-0 me-2">
                                    <Form.Control
                                        style={{fontSize: ".875em"}}
                                        className="p-1"
                                        type="number"
                                        name="minPrice"
                                        min={min}
                                        max={max}
                                        defaultValue={range.minPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <small>Maximo: {type}{range.maxPrice} </small>
                        </div>
                    </Col>
                    <Col xw={12}>
                        <Form.Range
                            className="w-100"
                            min={min}
                            max={max}
                            name="maxPrice"
                            defaultValue={defaultValue}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default DropdownRange;