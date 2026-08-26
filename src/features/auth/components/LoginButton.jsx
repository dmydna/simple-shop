import React from "react";
import LoginModal from "@f/auth/components/LoginModal.jsx";
import {Button} from "react-bootstrap";

function LoginButton({className, Style, children, handle}){
   
    const handleLogin = handle && handle()

    return(
        <>
            <Button
                variant="primary"
                className="py-3 fw-medium fs-5 w-100 mb-3"
                style={{ opacity: 0.8 }}
                onClick={handleLogin}
            >
            <>{children}</>
            </Button>
            <LoginModal/>
        </>
    )





}

export default LoginButton;