import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {CardListingPlaceholder} from "@f/placeholder/CardListingPlaceholder.jsx";


export const FeaturesPlaceholder = () => {
    return (

        <div className="bg-heaven">
            <Container fluid="xl">
                <Row className="g-4 py-3 mb-3">
                    {[...Array(4)].map((_, i) => <CardListingPlaceholder key={i} />)}
                </Row>
            </Container>
        </div>

    );
};
