

export const MSG_LISTING_DELETE   = ({id}) => (
        	<div className="mt-2 small">
        	<p className="mb-2">
        	    <b>[ELIMINAR]</b> {` la publicacion ${id? `#${id}`: ''} causa:`} 
        	</p>
        	<ul className="text-start">
        	   <li> Perdida de accesso de la informacion </li>
        	   <li> Borrado de imagenes</li>
        	   <li> Nose borraran datos de auditoria</li>
        	</ul>
        	</div>
        )

export const MSG_LISTING_INACTIVE = ({id}) => (
        <div className="mt-2 small">
        <p className="mb-2">
            <b>[OCULTAR]</b> {` la publicacion ${id? `#${id}`: ''} causa:`} 
        </p>
        <ul className="text-start">
           <li> Accesso restringido de la informacion para los usuarios </li>
           <li> No se cancelan operaciones de compras pendientes </li>
        </ul>
        </div>
    )

export const MSG_LISTING_ACTIVE = ({id}) => (
        <div className="mt-2 small">
        <p className="mb-2">
            <b>[MOSTRAR]</b> {` la publicacion ${id ? `#${id}`: ''} causa:`} 
        </p>
        <ul className="text-start">
           <li> Accesso publico de la informacion para los usuarios </li>
           <li> Habilita todas las funciones de compra y usuario </li>
        </ul>
        </div>
    )


export const MSG_PRODUCT_INACTIVE = ({id}) => (
    <div className="mt-2 small">
    <p  style={{ paddingLeft: "2rem"}} className="mb-2 text-start">
        <b>desactivar</b> {` el producto ${id ? `#${id}`: ''}`}
        <br/>
        <span>causa:</span> 
    </p>
     <p style={{ paddingLeft: "2rem"}} className="mb-2 text-start"> Inahabilita ( status: inactive ) todas las publicaciones ( listing ) con el producto asociado </p>
    </div>
)