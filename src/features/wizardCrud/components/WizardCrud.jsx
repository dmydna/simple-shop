import {WizardProvider} from "../contexts/WisardContext.jsx";
import WizardItem from "./WizardItem.jsx";
import WizardBreadcrumb from "./WizardBreadcrumb.jsx";
import WizardNavigation from "./WizardNavigation.jsx";
import React from "react";
import WizardButtons from "./WizardButtons.jsx";
import WizardFeedback from "./WizardFeedback.jsx";
import {useListingCrud} from "../../listing/contexts/ListingCrudContext.jsx";

function WizardCrud({
      children,
      steps,
      mode,
      show,
      getVisibleSteps,
      onCancel,
      onSubmit,
      updateRef

}) {

    const {loading, error} = useListingCrud()

    return (
        <WizardProvider
            mode={mode}
            steps={steps}
            show={show}
            getVisibleSteps={getVisibleSteps}
            updateRef={updateRef}
        >
        <WizardBreadcrumb
            mode={mode}
            onClose={onCancel}
        />
            {children}
            <WizardCrud.Item eventKey={-1000}>
                <WizardFeedback
                    loading={loading}
                    error={error}
                    onAction={onCancel}
                />
            </WizardCrud.Item>
        <WizardNavigation
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
        </WizardProvider>
    )
}

WizardCrud.Item = WizardItem;
WizardCrud.Breadcrumb = WizardBreadcrumb;
WizardCrud.Navigation = WizardNavigation;
WizardCrud.Buttons= WizardButtons;
export default WizardCrud;