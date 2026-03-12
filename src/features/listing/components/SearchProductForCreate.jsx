import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import Img1 from '../../../assets/box.png';
import { useListingCrud } from "../contexts/ListingCrudContext.jsx";
import FormProductSearch from "./FormProductSearch.jsx";



function SearchProductForCreate({children, handleProductMode, className}) {

    const [selected, setSelected] = useState(false);
    const { setCurrentItem, currentItem } = useListingCrud()

    const handleSelect = (item) => {
        if(currentItem.id == item.id){
            setSelected(true)
            setCurrentItem({...currentItem, ...item})
        }
    }

    return (
        <div className={`w-100 pb-5 bg-listing-welcome ${className || ''}`}>
            <p className='fs-5 fw-semibold'> Selccionar un Producto </p>

            <FormProductSearch
                handleSelect={handleSelect}
                handleCreate={() => setSelected(true)}
            >
                <p
                    style={{ opacity: '.5' }}
                    className="mt-4 mb-2 bg-white">
                    Busca un producto para publicar
                </p>
            </FormProductSearch>

        </div>
    )
}

export default SearchProductForCreate;