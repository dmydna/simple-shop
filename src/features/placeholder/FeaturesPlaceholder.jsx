import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardFeature from "../../components/common/CardFeature.jsx";
import Img5 from "../../assets/purchasing.png";
import Img8 from "../../assets/discount.png";
import Img6 from "../../assets/new-product.png";
import Img4 from "../../assets/open-store.png";
import {CardListingPlaceholder} from "./CardListingPlaceholder.jsx";


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
