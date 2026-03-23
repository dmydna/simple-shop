import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function StepBadge({children, trigger = 'click',ico, position = 'top', style, className}) {
    return (
        <div style={style} className={className}>
                <OverlayTrigger
                    trigger={trigger}
                    key={position}
                    placement={position}
                    overlay={
                        <Popover id={`popover-positioned-${position}`}>
                            <Popover.Header as="h3"></Popover.Header>
                            <Popover.Body>
                                {children}
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button  variant="text-secondary light p-0 border-0 m-0 text-center">
                        <i className={`bi ${ico} onhover`}></i>
                    </Button>
                </OverlayTrigger>
        </div>
    );
}

export default StepBadge;