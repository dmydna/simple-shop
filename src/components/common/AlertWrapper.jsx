import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function AlertWrapper({dismissible, title, message, variant}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant ||  'danger'} 
             onClose={() => setShow(false)} 
             dismissible={dismissible || false}>
        <small>
          {message}
        </small>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertWrapper;