import { Tintify } from "@/components/common/FloatButtonCollection";
import { Col } from "react-bootstrap";

export default function ActivityItemWid({ className, count, children, col, bg }) {


    return (
        <Col className={`${col ? col : 'col-12 col-sm-6 col-md-4 col-lg-3'} `}>
            <div style={{ backgroundColor: bg }} className={`border rounded-4  mb-3 ${className}`}>
                <Tintify style={{justifyContent: 'start', lineHeight: 'initial'}} className="p-3 w-100 rounded-4">
                    <div className="small">
                    {children}
                    </div>
                </Tintify> 
            </div>
        </Col>
    )
}


