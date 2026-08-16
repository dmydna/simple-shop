import ReviewButton from "@f/order/components/ReviewButton";


export default function MyOrderRating({rating,reviewId}){

	return (
		<>
		{rating && (
			<div>
				<span> {(rating || 0).toFixed(1)} </span>
				<i className="bi bi-star"></i>
			</div>
		)}
		{!rating && (
			<ReviewButton reviewId={reviewId} />
		)}

		</>
	)
}