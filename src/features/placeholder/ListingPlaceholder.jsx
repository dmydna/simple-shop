import {Container, Row} from "react-bootstrap";
import {CardListingPlaceholder} from "@f/placeholder/CardListingPlaceholder.jsx";
import React from "react";

export const ListingPlaceholder = () => (
    <Container fluid="xl" className="bg-white rounded mt-2 mb-5 pb-5">
        <h5 className="card-title placeholder-glow mb-4">
            <span className="placeholder col-1 bg-white"></span>
        </h5>
        <Row>
            {[...Array(4)].map((_, i) => <CardListingPlaceholder key={i} />)}
        </Row>
    </Container>
)


