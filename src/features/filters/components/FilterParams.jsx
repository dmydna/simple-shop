import InputSelectParam from "@features/filters/components/InputSelectParam"
import BadgeParams from "@features/filters/components/BadgeParams"
import { status, category, availabilityStock } from '@utils/enums.js';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState , useMemo } from "react";
import { Button } from 'react-bootstrap';


function FilterParams({children, close, badgeParams = false}){
	
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const allParams = searchParams.toString();

	const clearParams = () => setSearchParams(prev => new URLSearchParams() ) ;
	return (
		<div className="p-3 island rounded">

			<div className="d-flex justify-content-between mb-4">
				<p style={{ lineHeight: '1.25rem' }} 
					className="fs-6 mb-0 fw-medium p-1">
					Filter by
				</p>
				<div className='d-flex gap-3'>
					{!close && (
					<span style={{padding: '2px 5px', height: '30px', lineHeight: '1.25rem'}} 
						  className="btn btn-light small text-primary fw-lighter p-1" onClick={clearParams}>
						clear
					</span>
				    )}
					{close && (
						<Button style={{ lineHeight: '1.25rem' }} onClick={close} variant="light" className="p-1">
							<i className="bi-x-lg "></i>
						</Button>
					)}
				</div>	
			</div>


			{children}


			<div className={`my-3 ${!allParams ? '': 'border-top'}`}>
				<BadgeParams />
			</div>
			{close && (
				<div className='d-flex justify-content-center gap-3'>
					<span onClick={clearParams}
						className="btn btn-sm  border rounded-3 fw-lighter" >
						<i className='bi bi-trash3 me-2'> </i>clear filters
					</span>
					<span onClick={close}
						className="btn btn-sm btn-dark  border rounded-3 fw-lighter">
						<i className='bi bi-check me-2'> </i>apply filters
					</span>
				</div>
			)}

		</div>                
		)
}



export default FilterParams;