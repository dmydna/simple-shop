import InputSelectParam from "@features/filters/components/InputSelectParam"
import BadgeParams from "@features/filters/components/BadgeParams"
import { useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useUrlState } from "@/hooks/useUrlState";


export default function FilterBarParams({children, close, badgeParams = false}){
	
	const {searchParams, setSearchParams, allParams} = useUrlState()

	const clearParams = () => setSearchParams({}) ;
	const applyFilters = () => setSearchParams(prev => ({...prev, filter: true}))

	return (
		<div className="">

			<div className='d-flex flex-wrap gap-3 mt-3 mt-md-0'>

			{children}

			{close && (
				<div style={{minWidth:'100px'}} className='d-flex gap-3 flex-fill'>
					<span 
						onClick={clearParams}
						style={{lineHeight: '25px',height: '37px'}} 
						className="btn btn-sm  border rounded-3 flex-fill" >
						<i className='bi bi-trash3 me-2'> </i>clear filters
					</span>
					<span 
						onClick={applyFilters}
						style={{lineHeight: '25px',height: '37px'}} 
						className="btn btn-sm btn-dark  border rounded-3 fw-lighter flex-fill">
						<i className='bi bi-check me-2'> </i>apply filters
					</span>
				</div>
			)}

			</div>
			<div className={`my-3 ${!allParams ? '': 'border-top'}`}>
				<BadgeParams blacklist = {['filter','page', 'dialog', 'tableVersion']} />
			</div>


		</div>                
		)
}
