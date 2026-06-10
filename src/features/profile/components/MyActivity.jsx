import { Row } from "react-bootstrap";
import CategoryItem from "../../../components/common/CategoryItem.jsx";
import { placeholder } from "@utils/image.js";
import { statsService } from "@/features/stats/services/statsService.js";
import { useFetchTrigger } from "@/hooks/useFetchTrigger.js";

const MyActivity = ({col='col-12 col-md-12 col-lg-6', container=false}) => {


  const { data } = useFetchTrigger({ 
        fetchMethod: statsService.getStats, 
        initialTriggers: {init: true} 
  })

  
  const imgInfo =  { 
     "dimension":"150x150", 
     "text": "0",
     "fontSize": "70",
     "fontWeight":"normal",
   }

    return (
        <div className={` ${container ? 'mt-4 container' : '' }`}>
          <div className="w-100 d-flex flex-wrap mt-2 mb-4">
             <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                Actividad
             </span>
             <span style={{lineHeight: '2.3rem'}} className="text-secondary">
              ver actividad reciente
             </span>
           </div>
           <Row className={`mb-3 d-md-flex`}> 
             <CategoryItem 
               col={col}
               className="border ps-0 rounded-4"
               category="publicaciones"
               description="cantidad de publicaciones"
               link={`/dashboard/listing`}
               image={
                placeholder({ ...imgInfo, "background": ".melon", 
                  "text": (data?.totalListings > 99 ? '%2B99' : data?.totalListings) || "0"} )
                } 
             />
             <CategoryItem 
               // variant="primary"
               col={col}
               category="productos"
               className="border rounded-4"
               description="cantidad de productos"
               link={`/dashboard/product`}
               image={
                placeholder({ ...imgInfo, "background": ".lila", 
                  "text": (data?.products?.total > 99 ? '%2B99' : data?.products?.total) || "0"})
               } 
             />
             <CategoryItem 
               // variant="success"
               col={col}
               className="border rounded-4"
               category="usuarios"
               description="cantidad de usuarios"
               image={ placeholder(
                { ...imgInfo, "background": ".cielo",  
                   "text": (data?.users?.total > 99 ? '%2B99' : data?.users?.total) || "0" } 
                )}
               link={`/dashboard/clients`}
             />
             <CategoryItem 
               // variant="dark"
               col={col}
               category="orders"
               className="border pe-0 rounded-4"
               description="cantidad de ordenes"
               link={`#`}
               image={ placeholder({ ...imgInfo, "background": ".menta" } )}
             />
           </Row>
        </div>
    )
}

export default MyActivity;
