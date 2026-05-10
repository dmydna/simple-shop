import { useState } from "react";
import { useListingCrudContext } from "../legacy/ListingCrudContext.jsx";
import FormProductSearch from "./FormProductSearch.jsx";


function SearchProductForCreate({children, handleProductMode, className}) {

    const [selected, setSelected] = useState(false);
    const { setCurrentItem, currentItem } = useListingCrudContext()

    const handleSelect = (item) => {
        if(currentItem.id == item.id){
            setSelected(true)
            setCurrentItem({...currentItem, ...item})
        }
    }

    return (
        <div className={`w-100 pb-5 bg-listing-welcome ${className || ''}`}>
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