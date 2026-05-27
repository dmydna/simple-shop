function CartIcon({icon, variant, scale, opacity}){

    return (
           <span 
                className="mb-3 position-relative d-block mx-auto" 
                style={{height: '8rem', width: '6rem', opacity:  opacity || '1', scale: scale || '.9'}}>
              <i className="bi bi-cart3 icn-xl "></i>
              <i 
                style={{transform: 'translate(-135%, -55%)', fontSize: '3rem'}} 
                className={`tail-${variant || 'dark'} z-index-10 position-absolute p-0 ${icon || 'bi-x-circle-fill'}`}></i>
            </span> 

   )
}

export default CartIcon;
