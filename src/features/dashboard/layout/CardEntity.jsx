import { Card } from "react-bootstrap";
import { IconTintyColor, IconTint } from "@/components/common/IconTintyColor";
import { useNavigate } from "react-router-dom";
import { Tintify } from "@/components/common/FloatButtonCollection";
import OffCanvasButton from "@/components/common/OffCanvasButton";



export default function CardEntity({to, variant, ico, title, className ,description, offCanvas }) {

	const navigate = useNavigate()

    return (
        <Card  className={`mb-2 island border text-start flex-row ${className}`}>

            {offCanvas && (
                <OffCanvasButton className={"d-block d-md-none"}/>
            )}

            <div className="d-block mx-auto position-relative">
 


            <div className="h-100 m-3 pointer" onClick={() => navigate(to)}>
            	<IconTint
            		variant={variant} 
            		icon={ico} 
                /> 	
            	</div>	
        	</div>

 

            <Card.Body className="rounded mt-2 ps-1 overflow-hidden me-3">
                <Card.Title  className='fs-6 mb-0'>
                    { title || "entity" }
                </Card.Title>
                <Card.Text className="mb-0">
                <span style={{whiteSpace: 'nowrap', maxWidth:'100%'}} 
                    className="text-secondary mb-0 small d-inline-block text-truncate">
                    { description || '30 (active)' }
                </span>
                </Card.Text>


            </Card.Body>
        </Card>
    )
}
