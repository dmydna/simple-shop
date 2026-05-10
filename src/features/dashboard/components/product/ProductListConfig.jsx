import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";

function ProductListConfig({close, item}){

    const navigate = useNavigate()
    const BASE_URL = "/dashboard/product-form";

    return (
        <div className="p-3 island rounded">
           
           <div style={{lineHeight: '2.5rem'}} 
                className="d-flex justify-content-between mb-4">
               <p className="fs-6 mb-0 fw-medium">Product Configuration</p>
               <Button onClick={close} variant="light" className="">
                  <i className="bi-x-lg "></i>
               </Button>
           </div>


           <ButtonLink 
               icon="bi-pencil" 
               handle={()=> navigate(`${BASE_URL}?mode=edit&id=${item.id}`)}  
            >
                Edit product
           </ButtonLink>

           <ButtonLink 
               icon="bi-copy" 
               handle={()=> navigate(`${BASE_URL}?id=${item.id}`)} 
            >
                Clone product
           </ButtonLink>


           <ButtonLink
               icon="bi-trash" 
               handle={()=> navigate('/faqs')}  
            >
                Delete product
           </ButtonLink>


           <ButtonLink 
               icon="bi-three-dots" 
               handle={()=> navigate(`${BASE_URL}?mode=edit&id=${item.id}`)} 
            >
                See more details
           </ButtonLink>

        </div>
    )
}

export default ProductListConfig;
