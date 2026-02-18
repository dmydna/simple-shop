import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {CardDetailsPlaceholder} from "./CardDetailsPlaceholder.jsx";
import {ImgPlaceholder} from "./ImgPlaceholder.jsx";

export const DetailsPlaceholder = () => {
    return (
        <Container fluid="xl mt-5">
            <Row className='mt-4'>
                <ImgPlaceholder />
                <CardDetailsPlaceholder />
            </Row>
        </Container>

    );
};
