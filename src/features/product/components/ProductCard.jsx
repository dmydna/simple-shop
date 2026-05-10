import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorite} from "@/features/favorite/hooks/useFavorite.js"
import { toast } from "react-toastify";

function ProductCard({title, image, hash ,price, stock, id, children, className, cols, discount, imgSize, visibility = 'PUBLIC'}){

    const { createFavorite } = useFavorite()

    const handleAddFavorite = () => {
      createFavorite(id) 
      if (toast.isActive()) {
        return;
      }
      toast.success("agregado favoritos");
    };

    return(
        <Col className={`d-flex flex-column p-0 
          ${cols ? cols : 'col-12 col-sm-6 col-md-4 col-lg-3'}`}>

           <span onClick={handleAddFavorite} 
                style={{lineHeight:'0px', padding: '10px'}}
                className='btn rounded-circle white-dark-btn border position-absolute z-index-10 mt-4 ms-4'>
                <i className='bi-heart'></i> 
           </span>

           <Card className={`${className || 'm-2'}`}>
              <Link 
                className="text-decoration-none text-reset p-0"
                to={`/products/${hash}/${encodeURIComponent(title)}`}
              >
              <Card.Img   
                    src={image || "https://dummyimage.com/300x300/fff/000&text=Image+not+found"}
                    style={{ 
                      objectFit: 'contain', 
                      height: imgSize || '180px', 
                      padding: "1rem" 
                    }}
              />
              <Card.Body>
                <Card.Title 
                    className={`text-truncate-2 hover-link mb-2 fs-6 fw-semibold `}
                    style={{
                      height: "3.2rem", 
                      overflow: "hidden", 
                      textDecoration: "none", 
                    }}
                >
                   {title || "N/A"}
                </Card.Title>
                <Card.Text className="fs-4 fw-semibold  mb-1">
                  $ {price || "N/A"}  
                  <span className="mx-2 text-success fw-medium fs-6">
                    {discount ? discount + '% OFF' : ''}
                  </span>
                </Card.Text>
                <Card.Text className="small fw-medium text-secondary">
                  stock: {stock || "N/A"}
                </Card.Text>
              </Card.Body>
              </Link>
              <div className="d-flex p-2">
                {children}
              </div>
            </Card>
        </Col>
    )
}

export default ProductCard
