import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import Img1 from '../../../assets/box.png';
import { useListingsForm } from "../../../contexts/ListingFormContext";



function StepProductOption({children, handleProductMode}) {


    return (
        <>
            <div className="w-100 py-5 d-flex justify-content-spacebetween">
                <div>
                    {children}
                    <div className="py-3">
                        <Button 
                           onClick={() => handleProductMode("SELECT")} 
                           className="me-3 mb-2" 
                           variant="secondary"
                        >
                            <i className="bi bi-check2-square"></i>
                            <span className="ms-2"> Elegir producto </span>
                        </Button>
                        <Button 
                           className="me-3 mb-2" 
                           onClick={() => handleProductMode("CREATE")}
                        >
                            <i className="bi bi-plus-circle"></i>
                            <span className="ms-2"> Crear producto </span>
                        </Button>
                    </div>
                </div>
                <div>
                    <img className="ps-3" src={Img1} alt="" />
                </div>

            </div>
        </>
    )
}

export default StepProductOption;