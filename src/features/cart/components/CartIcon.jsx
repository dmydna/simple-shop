function CartIcon({icon, variant, scale, opacity}){

    return (
           <span className='mb-3' style={{height: '8rem', width: '6rem', opacity:  opacity || '1', scale: scale || '.9'}} 
                 className="position-relative d-block mx-auto">
              <i className="bi bi-cart3 icn-xl "></i>
              <i  style={{transform: 'translate(-135%, -55%)', fontSize: '3rem'}} 
                 class={`tail-${variant || 'dark'} z-index-10 position-absolute p-0 ${icon || 'bi-x-circle-fill'}`}></i>
            </span> 

   )
}

export default CartIcon;
