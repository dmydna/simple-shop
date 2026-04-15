import { WizardProvider } from "../contexts/WisardContext.jsx";
import WizardButtons from "./WizardButtons.jsx";
import WizardFeedback from "./WizardFeedback.jsx";
import WizardHeader from "./WizardHeader.jsx";
import WizardItem from "./WizardItem.jsx";
import WizardNavigation from "./WizardNavigation.jsx";

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
        <WizardHeader mode={showCrud} onClose={onCancel} />
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
WizardCrud.Breadcrumb = WizardHeader;
WizardCrud.Navigation = WizardNavigation;
WizardCrud.Buttons= WizardButtons;
export default WizardCrud;