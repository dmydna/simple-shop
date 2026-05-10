import {useCallback, useEffect, useMemo} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";
import { useProductCrud } from "../contexts/ProductCrudContex.jsx";

// @deprecated
function DangerList() {

    const {handleDelete, currentItem} = useProductCrud()
    const { goTo } = useWizard()

    const deleteHandler = (item)=>{
        goTo(-1000) // <-- crud feedback
        handleDelete(item)
    }

    return (
        <>
            <ul className="list-group list-group-flush">

                <li className={`list-group-item`} >
                    <Link className="simple-link"
                          onClick={() => deleteHandler(currentItem.id)}>
                        <div className="item">
                            <i className="bi bi-trash fs-5 ps-0 p-2"></i>
                            <span> Eliminar </span>
                        </div>
                    </Link>
                </li>

            </ul>
        </>

    )
}

export default DangerList;