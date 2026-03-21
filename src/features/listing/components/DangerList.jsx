
import {useCallback, useEffect, useMemo} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";

function DangerList() {

    const {handleDelete, handleVisibility, currentItem} = useListingCrud()
    const { goTo } = useWizard()

    const visibilityHandler = (item)=>{
        goTo(-1000) // <-- crud feedback
        handleVisibility(item)
    }
    const deleteHandler = (item)=>{
        goTo(-1000) // <-- crud feedback
        handleDelete(item)
    }



    return (
        <>
            <ul className="list-group list-group-flush">

                
                <li className={`list-group-item`}>
                    <Link className="simple-link"
                          onClick={() =>  visibilityHandler(currentItem)}>
                        <div className="item">
                            <i className="bi bi-eye fs-5 ps-0 p-2"></i>
                            <span>Cambiar visibilidad </span>
                        </div>
                    </Link>
                </li>


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