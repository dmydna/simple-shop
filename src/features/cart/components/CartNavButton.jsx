import { Button } from "react-bootstrap";

export default function CartNavButton({handle, visible, icon, variant, title, style,className}) {

    return (
        <>
        {visible && (
            <Button
                style={{style}}
                onClick={handle} 
                variant={variant || "dark"} 
                className={`small w-100 d-block border rounded-4 ${className}`}>
                {icon && (<i className={icon}></i>)} {title ||  ""}
            </Button>
        )}

        </>

    )
}