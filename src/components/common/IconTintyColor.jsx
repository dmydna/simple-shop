import { Badge } from "react-bootstrap";

export function IconTintyColor({className, ico="bi-image", variant="secondary", fs="3", size=65 }){
	
	return (
			<div className={`${className} text-center text-normalize mb-3 d-flex flex-column`} >
				<div className={`mx-auto d-flex justify-content-center align-items-center bg-${variant} rounded-circle bg-opacity-10`}
					style={{width: size, height: size}}>

					<i className={`bi ${ico} fs-${fs} text-${variant}`}></i>
				
			    </div>
			</div>    	
	)
}



export function IconTint({fsize ,fs=3, size=50, icon="bi-image", variant="secondary"}) {

  return (
        <div className={`my-auto mx-auto hstack bg-${variant} bg-opacity-10 rounded-circle`} 
             style={{ width: size ,height: size }}>
             <i  className={`bi bi ${icon} mx-auto text-${variant} fs-${!fsize && fs}`} 
                style={{ fontSize: fsize }}>
              </i>
        </div>
  );
}


export function IconNotify(
  {count, fsize,variant="secondary", icon="bi-image", detail, top=0, right=0, fs=1}
  ) {
  return (
    <div className="position-relative d-inline-block">
      <i style={{fontSize: fsize}} className={`bi ${icon} fs-${!fsize && fs}`} />
      <Badge style={{ top, right }} className="rounded-pill position-absolute" bg={variant}>{count}</Badge>
      <span className="visually-hidden">{detail|| ''}</span>
    </div>
  );
}

export function TintContainer({children, size=80, variant="secondary"}) {

  return (
        <div className={`vstack mx-auto mb-3 text-secondary bg-${variant} bg-opacity-10 rounded-circle`} 
             style={{ width: size,height: size }}>
             <div className="m-auto">
             {children}
             </div>
        </div>
  );
}

