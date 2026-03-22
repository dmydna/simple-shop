import {WizardProvider} from "../contexts/WisardContext.jsx";
import WizardItem from "./WizardItem.jsx";
import WizardBreadcrumb from "./WizardBreadcrumb.jsx";
import WizardNavigation from "./WizardNavigation.jsx";
import React from "react";
import WizardButtons from "./WizardButtons.jsx";
import WizardFeedback from "./WizardFeedback.jsx";

function WizardCrud({
      children,
      steps,
      getVisibleSteps,
      onCancel,
      onSubmit,
      crudHook
}) {
    const {loading, error, crudMode, showCrud, currentItem} = crudHook
    return (
        <WizardProvider
            mode={crudMode}
            steps={steps}
            show={showCrud}
            getVisibleSteps={getVisibleSteps}
            updateRef={currentItem}
        >
        <WizardBreadcrumb mode={showCrud} onClose={onCancel} />
                {children}
            <WizardCrud.Item eventKey={-1000}>
                <WizardFeedback
                    loading={loading}
                    error={error}
                    onAction={onCancel}
                />
            </WizardCrud.Item>
        <WizardNavigation
            crudHook={crudHook}
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