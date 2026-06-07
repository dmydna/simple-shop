import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserAccordion({children, eventKey, className, icon}) {

    return (
    <Accordion.Item className="small border-0" eventKey={"2"}>
        <Accordion.Header className="px-1">
             <li className="list-group-item border-0 p-2 py-1">
                {icon !=null &&  <i className={`bi ${icon} fs-4 ps-0 me-3`}></i> }
                <span>Users</span>            
            </li>
        </Accordion.Header>
        <Accordion.Body style={{marginLeft: '20px'}} >
            <ul className="list-group list-group-flush">
                <li className="list-group-item border-0">
                    <Link className="text-normalize" to={`/dashboard/user-list`}>
                        <span> Users List </span>
                    </Link>
                </li>
                <li className="list-group-item border-0">
                    <Link className="text-normalize" to={`/dashboard/user-form?mode=create`}>
                        <span> Add User</span>
                    </Link>
                </li>
                <li className="list-group-item border-0">
                    <Link className="text-normalize" to={`/dashboard/user-form?mode=view`}>
                        <div className="item">
                            <span> Edit User </span>
                        </div>
                    </Link>
                </li>
               </ul>
        </Accordion.Body>
    </Accordion.Item>)
}

export default UserAccordion;