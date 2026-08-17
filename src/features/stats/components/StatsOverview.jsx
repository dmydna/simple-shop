import CarouselItems from "@/components/common/CarrouselItems";
import StatItem from "@/features/stats/components/StatItem";
import { statsService } from "@/features/stats/services/statsService.js";
import { useFetchTrigger } from "@/hooks/useFetchTrigger.js";
import { Row } from "react-bootstrap";


export default function StatsOverview() {

	const { data } = useFetchTrigger({
		fetchMethod: statsService.getStats,
		initialTriggers: { init: true }
	})


	return (

		<>
	
			    <StatItem
					title="publicaciones"
					icon="bi-sticky"
					variantStatus="success"
					status="total"
					data={data?.totalListings && "+" + data?.totalListings || 0}
				/>

				<StatItem
					title="productos"
					variant="success"
					icon="bi-box-seam"
					variantStatus="success"
					status="total"
					data={data?.products?.total && "+" + data?.products?.total || 0}
				/>

				<StatItem
					title="usuarios"
					variant="danger"
					icon="bi-person"
					variantStatus="primary"
					status="active"
					data={data?.users?.active && "+" + data?.users?.active || 0}
				/>

				<StatItem
					title="pedidos"
					variant="primary"
					icon="bi-cart3"
					variantStatus="danger"
					status="pending"
					data={data?.orders?.active && "+" + data?.orders?.active || 0}
				/>

				<StatItem
					title="ventas"
					variant="success"
					icon="bi-currency-dollar"
					status="total"
					variantStatus="success"
					data={data?.totalSales || 0}
				/>


				<StatItem
					title="reseñas"
					variant="warning"
					icon="bi-star"
					status="total"
					variantStatus="success"
					data={data?.reviews?.total && "+" + data?.reviews?.total || 0}
				/>			

		</>
	)
}