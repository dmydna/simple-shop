import PageEmpty from "@/pages/errors/PageEmpty";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProfileHeader } from "./ProfileHeader";
import StarRating from "@common/StarRating.jsx"
import React,{useState, useMemo, useEffect} from "react";
import { ImgGenApi } from "@/dev/utils";
import { useReview } from "@/features/review/hooks/useReview";
import {useForm} from "@/hooks/useForm.js"
import PageLoading from "@common/PageLoading.jsx"
import PageError   from "@pages/errors/PageError.jsx"
import PageSuccess   from "@pages/errors/PageSuccess.jsx"



function WriteReview(){

    const [rating, setRating] = useState(2);
    const [searchParams] = useSearchParams();

    const { createReview, content, setFilters, loadingCreate, setErrorCreate, 
       errorCreate, successCreate, setSuccessCreate } = useReview()
    const { setFormData, formData, onChange } = useForm({ comment:"", rating: 0 })


    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        createReview(formData)
    }
  
    const pendingId = Number(searchParams.get('pkey'));
    
    
    const reviewInfo = useMemo(()=>{
       return content.filter(item => item.id == pendingId)[0];
    },[content])


     useEffect(()=> setFormData(
           prev=>({...prev, rating: rating, productId: reviewInfo?.productId})), 
     [rating, reviewInfo])




    return (
        <div className="">

           {loadingCreate && (<PageLoading/>)}
           
           {!loadingCreate && !errorCreate && !successCreate && (
<>
 <ProfileHeader
                className='m-0'
                title="Califica tu producto"
            />


            <Form id='reviewForm' style={{ minHeight: '190px' }} onSubmit={handleSubmit}>


                 <Form.Group className="mb-3 w-100">


         <div className='d-flex gap-3 mb-3  border-0 rounded-3 p-2 w-100'>  
              <img  style={{height: '55px', width: '55px'}} className='rounded' src={ reviewInfo?.image ||  ImgGenApi({ dimension: "45x45", background: ".menta", fontSize: "20", icon: "f244" }  )} />
              <div className="flex-fill">
                 <p className='small fw-semibold m-0'>{reviewInfo?.title}</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0'>Calificación: {rating} estrellas</p>
                  <StarRating value={rating} onChange={setRating} />
               </div>

              </div>
         </div>

    <div className='d-none d-flex justify-content-between align-items-center'>
      <p className='m-0'>Calificación: {rating} estrellas</p>
      <StarRating value={rating} onChange={setRating} />
    </div>

                </Form.Group>
<Form.Group className="mb-4 w-100">
    <FloatingLabel
        controlId="floatingComment"
        label="Comentario"
        className="mb-3"
    >
        <Form.Control
            style={{ minHeight: '100px', resize: 'vertical' }}
            as={"textarea"}
            rows={8}
            name="comment"
            placeholder="Ingresa tu comentario"
            value={formData?.comment || ''}
            onChange={onChange}


        />
    </FloatingLabel>
</Form.Group>


            </Form>
            <div className='w-100 d-flex justify-content-center'>
                <Button form='reviewForm' variant="primary" type="submit" className="my-2" >
                    Enviar
                </Button>
            </div>
</>
            )}

            {errorCreate && (<PageError handle={()=> setErrorCreate(null)} />)}
            {successCreate && (<PageSuccess handle={()=> navigate('/user/reviews')} />)}
        </div>

    )

}

export default WriteReview;
