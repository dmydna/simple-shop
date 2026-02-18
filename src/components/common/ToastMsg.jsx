export function SuccessMsg({message}) {
    return (
        <div className='text-success'>
           <i className="bi bi-check-circle-fill me-3"></i>
            <span>{message ||  'operacion exitosa'}</span>
        </div>
    )
}

export function ErrorMsg({message}) {
    return (
        <div className='text-warning'>
            <i className="bi bi-close-circle-fill me-3"></i>
            <span>{message ||  'hubo un error'}</span>
        </div>
    )
}