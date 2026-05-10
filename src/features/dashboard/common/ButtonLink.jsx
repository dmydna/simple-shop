function ButtonLink({ handle, icon,children, className, visible=true, role }) {

    return (
        <>
            {visible && (
                <p onClick={handle || {}}
                    className={`btn bg-light border py-2 mb-2 text-start w-100 d-flex justify-content-between ${className}`}>
                    <div className="fw-medium">
                        <i className={`bi ${icon} me-3`}></i>
                        <span className="small">{children}</span>
                    </div>
                    <i className="bi-chevron-right"></i>
                </p>
            )}
        </>
    )
}

export default ButtonLink