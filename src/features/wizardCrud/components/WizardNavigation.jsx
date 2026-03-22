import {Button} from "react-bootstrap";
import React, {useEffect, useMemo} from "react";
import {useWizard} from "../contexts/WisardContext.jsx";
import {useListingCrud} from "../../listing/contexts/ListingCrudContext.jsx";
import WizardButtons from "./WizardButtons.jsx";
import {useWizardButtonsUI} from "./useWizardButtonsUI.js";

function WizardNavigation({onSubmit, onClose, crudHook}) {

    const config = useWizardButtonsUI({crudHook})
    const {goTo, next, prev} = useWizard()
    const handleSubmit = () => {
        goTo(-1000)  // <-- crud feedback
        onSubmit()
    }

    return (
        <WizardButtons
            show={config.show}
            onSubmit={handleSubmit}
            onCancel={onClose}
            configButtons={config}
            next={next}
            prev={prev}
        />
    )
}

export default WizardNavigation;