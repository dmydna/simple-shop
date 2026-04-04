import React, { useEffect, useState } from "react";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { useDevContext } from "../contexts/DevContext";
import AlertWrapper from "../../components/common/AlertWrapper";
import Alert from 'react-bootstrap/Alert';

function DevItem({ image, title, description, cantidad, handle, success, disabled, reset, labelBtn }) {

    const { loading, Error } = useDevContext()

    return (
        <div className={`island p-3 border d-flex mb-3 ${disabled ? 'disabled' : ''}`}>
            <div>
                <img className="rounded" src={image} ></img>
            </div>
            <div className="px-3 my-1">
                <p className="small fw-bold d-block  mb-0">{title}</p>
                <div className="my-2">
                    {description && (<small className="d-block text-secondary">{description}</small>)}
                    {cantidad && (<small className="d-block text-secondary">cantidad: {cantidad}</small>)}
                </div>

                {success == null && (
                    <Button
                        disabled={loading || disabled}
                        className={`mb-0`}
                        variant="primary btn-sm"
                        onClick={handle}>
                        <i className='bi bi-plus-lg'></i>
                        <span className="ms-2">{labelBtn ? labelBtn : "Publicar todo"}</span>
                    </Button>
                )}
                {success && (
                    <div className="d-flex">
                        <Alert className='p-1 px-3 mb-0' variant='success'>
                            <small>PUBLICADO!</small>
                        </Alert>
                        <i onClick={reset} className='btn bi bi-arrow-clockwise p-1 px-2 border rounded mx-3'></i>
                    </div>

                )}
                {success == false && (
                    <div className="d-flex">
                       <Alert className='p-1 px-3 mb-0' variant='danger'>
                           <small>Error!</small>
                       </Alert>
                        <i onClick={reset} className='btn bi bi-arrow-clockwise p-1 px-2 border rounded mx-3'></i>
                    </div>
                    
                )}
            </div>
        </div>
    )
}

export default DevItem;