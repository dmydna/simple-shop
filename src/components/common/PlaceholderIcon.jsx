export default function PlaceholderIcon({
	height='40px', 
	width='40px', 
	variant='primary', 
	opacity='10', 
	className='',
	fontSize='',
	icon}){
	
	return (
        <span style={{width: width, height: height}} 
             class={`d-inline-flex justify-content-center 
             align-items-center bg-${variant} bg-opacity-${opacity} 
             rounded-circle ${className}`}>
             <i class={`bi ${icon} ${fontSize} text-${variant}`}></i>
        </span>
	)
}