import React from "react";
import StepEditList from "./StepEditList.jsx";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";

function StepOptionsEdit ({className}) {

    const {currentItem} = useListingCrud();

    return (
        <div className={`w-100 bg-listing-welcome ${className || ''}`}>
            <div>
                <p className='h4'>{currentItem.title}</p>

                <p style={{ opacity: '.5' }} className="mt-3 bg-white">
                    {currentItem.description}
                </p>

                <StepEditList></StepEditList>

                <hr style={{visibility: 'hidden'}}></hr>
            </div>
        </div>
    )
}

export default StepOptionsEdit;