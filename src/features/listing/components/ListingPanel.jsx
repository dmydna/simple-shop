import { Col, Container, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PanelSideBar from "./PanelSideBar.jsx";
import { step } from "../../../utils/posts.js";
import ListingFormCrud from "./ListingFormCrud.jsx";


export default function ListingPanel({sidebar=true}) {
    const { page } = useParams()
    const [currentStep, setCurrentStep] = useState(0);



    useEffect(() => {
        switch (page) {
            case "publication":
                setCurrentStep(step.PUBLICATION); break;
            case "options":
                setCurrentStep(step.OPTIONS); break;
            case "product":
                setCurrentStep(step.PRODUCT); break;
            case "productTable":
                setCurrentStep(step.TABLE); break;
            case "uploadImage":
                setCurrentStep(step.UPLOAD); break;
            case "details":
                setCurrentStep(step.DETAILS); break;
            case "welcome":
                setCurrentStep(step.WELCOME); break
        }
    }, [page])

    // captura el param mandado por use Navigate





    return (
        <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>

                {sidebar && (
                    <Col className={`col-12 col-md-6 col-lg-4 px-0 mb-3 `}>
                        <div className="border rounded p-4 island">
                            <PanelSideBar onSelection={setCurrentStep}></PanelSideBar>
                        </div>

                    </Col>
                )}

                <ListingFormCrud
                    className={sidebar ? 'col-12 col-md-6 col-lg-7 mx-auto rounded border p-5 island' : ''}
                  />

            </Row>

        </Container>
    )

}