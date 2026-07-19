import { Placeholder, Row } from "react-bootstrap";
import CategoryItem from "@common/CategoryItem.jsx";
import { placeholder } from "@utils/image.js";
import { statsService } from "@/features/stats/services/statsService.js";
import { useFetchTrigger } from "@/hooks/useFetchTrigger.js";
import { Activity, useState } from "react";
import ActivityItem from "@/components/common/ActivityItem";
import { color, hexColor } from "@/utils/enums";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ActivityItemWid from "@/components/common/ActivityItemWid";
import TotalSalesView from "@/components/common/TotalSalesView";
import PlaceholderIcon from "@common/PlaceholderIcon"


const MyActivity = ({col='col-12 col-md-12 col-lg-6', container=false}) => {


  const { data } = useFetchTrigger({ 
    fetchMethod: statsService.getStats, 
    initialTriggers: {init: true} 
  })

  const [hide, setHide] = useState(true)


    return (
        <div className={` ${container ? 'mt-4 container' : '' }`}>
          <div className="w-100 d-flex flex-wrap mt-2 mb-4">
             <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                Resumen
             </span>
           </div>
           <Row className={`mb-3 d-md-flex`}> 

{/*              <ActivityItem bg={hexColor[".melon"]} count={data?.totalListings || 0}>
                <p className="text-center small pb-1">Anuncios publicados</p>
                <i className="d-block text-center bi bi-sticky fs-4"></i>
              </ActivityItem>
              <ActivityItem bg={hexColor[".menta"]} count={data?.products?.total || 0}>
                <p className="text-center small pb-1">Productos registrados</p>
                <i className="d-block text-center bi bi-box fs-4"></i>
              </ActivityItem>
              <ActivityItem bg={hexColor[".salmon"]} count={data?.users?.total || 0}>
                <p className="text-center small pb-1">Usuarios registrados</p>
                <i className="d-block text-center bi bi-person fs-4"></i>
              </ActivityItem>
              <ActivityItem count={data?.orders?.total || 0}>
                <p className="text-center small pb-1">Ordenes registradas</p>
                <i className="d-block text-center bi bi-cart3 fs-4"></i>
              </ActivityItem>
              <ActivityItem bg={hexColor[".lavanda"]} count={data?.reviews?.total || 0}>
                <p className="text-center small pb-1">Reviews</p>
                <i className="d-block text-center bi bi-star fs-4"></i>
              </ActivityItem>*/}

              <ActivityItemWid bg={hexColor[".melon"]}>
                    <div className="display-4 mt-2">
                      <i className="d-block text-center bi bi-sticky fs-4"></i>
                    </div>
                    <div className="h2 text-center"> {data?.totalListings || 0} </div>
                    <p className="text-muted text-center small pb-1">Anuncios</p>
                    <p className="text-muted text-center small pb-1">publicados</p>
              </ActivityItemWid>

              <ActivityItemWid bg={hexColor[".menta"]}>
                    <div className="display-4 mt-2">
                      <i className="d-block text-center bi bi-box fs-4"></i>
                    </div>
                    <div className="h2 text-center"> {data?.products?.total || 0} </div>
                    <p className="text-muted text-center small pb-1">Productos</p>
                    <p className="text-muted text-center small pb-1">registrados</p>
              </ActivityItemWid>

              <ActivityItemWid bg={hexColor[".salmon"]}>
                    <div className="display-4 mt-2">
                      <i className="d-block text-center bi bi-person fs-4"></i>
                    </div>
                    <div className="h2 text-center"> {data?.users?.total || 0} </div>
                    <p className="text-muted text-center small pb-1">Usuarios</p>
                    <p className="text-muted text-center small pb-1">registrados</p>
              </ActivityItemWid>

              <ActivityItemWid>
                    <div className="display-4 mt-2">
                      <i className="d-block text-center bi bi-cart3 fs-4"></i>
                    </div>
                    <div className="h2 text-center"> {data?.orders?.total || 0} </div>
                    <p className="text-muted text-center small pb-1">Ordenes</p>
                    <p className="text-muted text-center small pb-1">registradas</p>
              </ActivityItemWid>

              <ActivityItemWid bg={hexColor[".lavanda"]}>
                    <div className="display-4 mt-2">
                      <i className="d-block text-center bi bi-star fs-4"></i>
                    </div>
                    <div className="h2 text-center"> {data?.reviews?.total || 0} </div>
                    <p className="text-muted text-center small pb-1">Reseñas</p>
                    <p className="text-muted text-center small pb-1"></p>
              </ActivityItemWid>

              <ActivityItemWid bg={hexColor[".pera"]} col={'col-12 col-sm-6 col-md-4 col-lg-3'}>
                    <TotalSalesView data={data} />
              </ActivityItemWid>

           </Row>


           <h5 className="mb-4">Actividad Reciente</h5>

              <div class="list-group list-group-flush">
                  <div class="list-group-item border-0 d-flex align-items-center px-0">
                      <PlaceholderIcon className="me-3" variant={'primary'} icon={'bi-cart3'} />
                      <div class="flex-grow-1">
                          <h6 class="mb-1">Nueva orden recibida</h6>
                          <p class="text-muted small mb-0">Order #123456 from John Doe</p>
                      </div>
                      <small class="text-muted">Just now</small>
                  </div>
                  <div   class="list-group-item border-0 d-flex align-items-center px-0">
                      <PlaceholderIcon className="me-3" variant={'success'} icon={'bi-person'} />
                      <div class="flex-grow-1">
                          <h6 class="mb-1">Nuevo usuario registrado</h6>
                          <p class="text-muted small mb-0">User ID: #987654</p>
                      </div>
                      <small class="text-muted">2 min ago</small>
                  </div>
          </div>

        </div>
    )
}

export default MyActivity;
