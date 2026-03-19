import {WizardProvider} from "../contexts/WisardContext.jsx";
import WizardItem from "./WizardItem.jsx";
import WizardBreadcrumb from "./WizardBreadcrumb.jsx";
import WizardNavigation from "./WizardNavigation.jsx";
import React from "react";
import WizardButtons from "./WizardButtons.jsx";

function WizardCrud({
      children,
      steps,
      mode,
      show,
      getVisibleSteps,
      onCancel,
      onSubmit,
      updateRef }) {

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