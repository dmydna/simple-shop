import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useState } from "react";

export default function SortByParam({children, name}){
	
	const [sort, setSort] = useState(false);
	const {setSearchParams} = useUrlState()


	const handleToggle = () => {
		setSort(prev => !prev)
	}

	useEffect(()=>{
		setSearchParams(prev => {
			if(sort){
				return {...prev, SortBy: name || children }				
			}
			return {...prev, SortBy: null}	
		})
	},[sort])

	return (
        <div onClick={handleToggle} className='d-flex pointer'>
        <div style={{marginTop: '-4px',height:'0px'}} 
            class="d-flex flex-column me-2">
            <i class={`bi bi-caret-up${sort ? '-fill' : ''}`}></i>
            <i style={{marginTop: '-12px'}} 
            	class={`bi bi-caret-down${!sort ? '-fill' : ''}`}></i>
        </div>
        	{children}
        </div>
	)
}