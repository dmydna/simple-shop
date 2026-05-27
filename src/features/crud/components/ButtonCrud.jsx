import { Button } from "react-bootstrap";

export default function ButtonCreate ({visible=true, handle, title, variant, icon}){
    return ( 
    <> {visible && (
           <Button
             className="rounded-3 border-1 fw-medium"
             onClick={handle}
             variant={ variant || "outline-dark"}
           >
              <i className={icon || ''}></i>
              <span className="mx-3">{title || ''}</span>
           </Button>
       )} 
    </>)
}
