import { Children } from "react";
import { Link } from "react-router-dom";

export default function DashLink({to, title, children, ico, variant = 'primary'}) {
	

	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3  col">
			<Link className={`text-center text-normalize mb-3 d-flex flex-column border p-4 rounded-3`} 
				to={to} data-discover="true">
				<div className={`mx-auto d-flex justify-content-center align-items-center bg-${variant} rounded-circle bg-opacity-10`}
					style={{width: 70, height: 70}}>

					<i className={`bi ${ico} fs-2 text-${variant}`}></i>
				
			    </div>	
				<span className={`text-secondary small my-2 mt-4`}>{children}</span>
			</Link>
		</div>

	)
}
