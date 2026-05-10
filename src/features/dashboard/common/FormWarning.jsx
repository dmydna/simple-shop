import { useForm } from "@/hooks/useForm";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function FormWarning({close}){


   const navigate = useNavigate()
   const location = useLocation();
   const urlActual = location.pathname + location.search + location.hash;

   const {formData, hash, onChange} = useForm()

   const handleSubmit = () => {
      navigate(`${location.pathname}?mode=edit&hash=${hash}`)
      close()
   }

   const handleCancel = () => {
      navigate('/dashboard')
   }

   return (
        <div className="p-3 island rounded">

            <div style={{ lineHeight: '2.5rem' }}
                className="d-flex justify-content-between mb-3">
                <p className="fs-6 mb-0 fw-medium">Editar Item</p>
            </div>

            <p className="small text-secondary">
               Para continuar, escribe el <b>hash</b> del item a editar
            </p>

            <InputGroup className="mb-3">
               <Form.Control
                  placeholder="Hash"
                  name="hash"
                  value={formData.hash || ''}
                  onChange={onChange}
               />
            </InputGroup>

            <div className='d-flex justify-content-center'>
            <Button 
                className="btn-sm"  
                onClick={handleCancel} variant='outline-dak'>
                <span className="mx-3 small">
                  Cancelar
               </span>
            </Button> 
            <Button 
               className="btn-sm rounded-4" 
               onClick={handleSubmit} variant='dark'>
                <span className="mx-3 small">
                  Aceptar
               </span>
            </Button> 
            </div>
        </div>

  )

}

export default FormWarning;
