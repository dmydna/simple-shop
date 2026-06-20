import { useMemo } from "react";

export default function JSONFileDetails({ file, content }) {
	

	const [totalReviews, totalUsers, totalProducts, totalListings] = useMemo(() => {
		let countReviews = 0
		let users = [];
		if (content && content.length > 0) {
			for (let { reviews } of content) {
				if (reviews.length != 0) {
					for (let { username } of reviews) {
						if (!users.includes(username)) {
							users.push(username)
						}
					}
					countReviews += reviews.length;
				}
			}            
		}

		return [countReviews || 0, users.length || 0, content?.length || 0, content?.length || 0]
	}, [content])

	return (
		<div className="w-100">
			<p style={{
    			background: "#f8f9fa",
    			padding: "5px 10px",
    			border: "1px solid #e2e2e2",
    			borderRadius: "5px",
    			fontWeight: "400!important"
			}}>
				{file.name}
			</p>

			<div style={{ 
				marginTop: '10px',
				marginBottom: '0px', 
				padding: '10px', 
				background: '#f8f9fa', 
				borderRadius: '4px',
				border: '1px solid #dee2e6',
				maxHeight: '200px',
				overflowY: 'auto',
				fontSize: '0.85rem',
				fontFamily: 'monospace',
				textAlign: 'start'
			}}>
				<p className='small mb-2'><strong>Publicaciones:</strong> {totalListings}</p>
				<p className='small mb-2'><strong>Reseñas:</strong> {totalReviews}</p>
				<p className='small mb-2'><strong>Usuarios:</strong> {totalUsers} </p>
				<p className='small mb-2'><strong>Productos:</strong> {totalProducts}</p>
				<p className='small mb-2'>Se crearan un <strong>total</strong> {totalProducts + totalListings + totalUsers + totalReviews} nuevos elementos </p>
			</div>
                                        
		</div>
	)
}