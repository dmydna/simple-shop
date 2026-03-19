import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import warningIMG from "/src/assets/404.png"
import Img1 from "/src/assets/web_404_crop.png"
import '/src/styles/animations.css'
import {FeedbackMessage} from "../components/common/FeedbackMessage.jsx";


export default function Page403Forbidden(){

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/")
    }
    const error = 'Acceso restringido';
    return (
        <FeedbackMessage
            title="403 forbidden"
            message={error}
            icon="bi-exclamation-circle"
            actionLabel="volver a Incio"
            onAction={goToHome}
        />
    )
}
