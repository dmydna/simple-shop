import { Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";

export default function PageFormLayout({children}){


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant'});
        const body = document.querySelector("body");
        const main = document.querySelector("main");
        if (!body && !main) return;
        body.classList.add("bg-full-heaven");
        main.classList.add("d-flex");
        return () => {
            body.classList.remove("bg-full-heaven");
            main.classList.remove("d-flex");
        };
    }, []);

    return (
    <Container className="my-auto" fluid="xl">
        <Row className="my-4">
            {children}
        </Row>
    </Container>
    )
}

