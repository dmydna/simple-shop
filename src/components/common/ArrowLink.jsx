import { useNavigate } from "react-router-dom";

export default function ArrowLink({to, children, variant}){
	
	const navigate = useNavigate()

	return (
        <p onClick={() => navigate(to)} 
           className={`${variant && `alert alert-${variant}`} ${!variant && 'btn btn-light' } pointer border py-3 mb-3 text-start w-100 d-flex justify-content-between`}>
           <span>{children}</span>
           <i className="bi-chevron-right"></i>
        </p>

	)
}