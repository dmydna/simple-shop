import { Tintify } from "@/components/common/FloatButtonCollection";
import { Col } from "react-bootstrap";

export default function ActivityItem({ count, children, col, bg }) {


    return (
        <Col className={`${col ? col : 'col-12 col-sm-6 col-md-4 col-lg-3'} `}>
            <div style={{ backgroundColor: bg }} className="border rounded-4  mb-3">
                <Tintify className="p-3 w-100 rounded-4">
                    <div className="h1  text-center">{count} </div>
                    {children}
                </Tintify> 
            </div>
        </Col>
    )
}


