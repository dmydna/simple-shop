import PlaceholderIcon from "@/components/common/PlaceholderIcon";
import { Tintify } from "@/features/product/components/FloatButton";
import { useNavigate } from "react-router-dom";

export default function RemovableListItem({
	className, 
	remove, 
	title,  
	description, 
	toUrl,
	thumbnail,
	icon=null,
	variant=null
}){
	
	const navigate = useNavigate()

	return (
		<Tintify 
			action={()=> navigate(toUrl)} 
			style={{lineHeight: '1rem'}} 
			className={'d-block text-start'}
		>
        	<div class={`list-group-item border-0 d-flex align-items-center px-0 ${className}`}>
        	    { thumbnail && !icon && <img className="rounded me-3" width={55} height={55} src={thumbnail} />}
        	    { icon && !thumbnail && <PlaceholderIcon className="me-3" variant={variant} icon={icon} />}
        	    <div class="flex-grow-1">
        	        <h6 class="mb-1">{title}</h6>
        	        <p class="text-muted small mb-0">{description || ''}</p>
        	    </div>
        	    {remove && (
        	    	<span
        	    		style={{zIndex:100}}
        	    	    onClick={(e) => { e.stopPropagation(); remove() }}
        	    	    className='small btn btn-sm  btn-light rounded-circle'>
        	    	    <i className='bi-x-lg'></i>
        	    	</span>
        	    )}

        	</div>
    	</Tintify>
	)
}