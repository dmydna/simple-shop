import Logo from "@common/Logo.jsx";
import ListGroup from 'react-bootstrap/ListGroup';

function SiderbarAdmin() {
  return (
    <ListGroup style={{zIndex: "1050", width:"250px", paddingTop:"20px" }} className='fixed-top d-block h-100 bg-white p-3 border-end'>

    <div className='my-3 mx-2'>
        <Logo/>
    </div>
   
      <ListGroup.Item className='btn mt-5 text-start border-0 fw-medium'>
        <i className='bi bi-sliders me-3'></i>
        <span>Dashboard</span>
      </ListGroup.Item>

      <ListGroup.Item className='btn text-start border-0 fw-medium'>
        <i className='bi bi-folder me-3'></i>
        <span>Posts</span>
      </ListGroup.Item>

      <ListGroup.Item className='btn text-start border-0 fw-medium'>
        <i className='bi bi-box me-3'></i>
        <span>Product</span>
      </ListGroup.Item>

      <ListGroup.Item className='btn text-start border-0 fw-medium'>
        <i className='bi bi-person me-3'></i>
        <span>User</span>
      </ListGroup.Item>

      <ListGroup.Item className='position-absolute bottom-0 btn text-start border-0 fw-medium'>
        <i className='bi bi-box-arrow-right me-3'></i>
        <span>Salir de Dashboard</span>
      </ListGroup.Item>

    </ListGroup>
  );
}

export default SiderbarAdmin;
