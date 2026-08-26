export const ProfileHeader = ({title, subtitle, className}) => {
    return (
        <div className={`${className || 'mb-5'}`}>
            <p className="h5">{title || ''}</p>
            <p
                style={{ opacity: '.5' }}
                className="muted">
                {subtitle || ''}
            </p>
        </div>
    )
}
