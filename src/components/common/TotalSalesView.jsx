import { Activity, useMemo, useState } from "react";


export default function TotalSalesView({ data }) {
	
	const [hide, setHide] = useState(true)

	const totalSales = useMemo(()=>{
		if (!data?.totalSales){
			return 0
		}
		if (data?.totalSales < 1000){
			return data.totalSales.toFixed(2)
		}
		if(data?.totalSales < 99000){
			return data.totalSales.toFixed(1) 
		}
		if(data?.totalSales > 99000){
			return data.totalSales.toFixed(0) 
		} 
	},[data])

	return (
		<div className="w-100">
			<div className="display-4 mt-2">
				<i className="d-block text-center bi bi-piggy-bank fs-4"></i>
			</div>
			<div className="h2 text-center"> 
				<span class="fs-5 fw-light text-muted">$</span> 
				{hide ? (
					<>
						<span className="mx-3">...</span>
						<i onClick={() => setHide(false)} className="fs-5 bi bi-eye"></i>
					</>
				) : (
					<>
						<span className="mx-2">{totalSales}</span> 
						<i onClick={() => setHide(true)} className="fs-5 bi bi-eye-slash"></i>
					</>
				)}

			</div>
			<p className="text-muted text-center small pb-1">
				Ventas
			</p>
			<p className="text-muted text-center small pb-1"></p>
		</div>
	)
}