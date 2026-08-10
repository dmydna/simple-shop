import { useEffect, useMemo, useState } from "react";
import { Card } from "react-bootstrap";

export default function ImgAction({ src, className ,style, icon, action }) {
	
	const [isHovered, setIsHovered] = useState(false);

	const hoverStyle = useMemo(()=>{
		if(isHovered){
			return {scale: '.9', borderRadius: '10px'}
		}
		return {}
	},[isHovered])
	return (
		<div className="pointer" 
			onClick={action}
      		onMouseEnter={() => setIsHovered(true)}
      		onMouseLeave={() => setIsHovered(false)}
      		style={{}}
		>
			{isHovered && (
				<span
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscuro levemente
						borderRadius: '100%', // Si el botón tiene border-radius
						pointerEvents: 'none', // Permite que el clic llegue al span padre
						zIndex: 1,
						scale: .766
					}}
				/>
			)}
			<Card.Img 
				className={className} 
				src={src} 
				style={style} 
			/>
			{isHovered && (
				<i className={`bi ${icon} bg-light rounded-circle btn-sm btn`} 
					style={{ 
						position: 'absolute',
						right: '45px', 
						bottom: '45px',
						zIndex: 2
					}}
				/>
			)}
			
		</div>
	)
}