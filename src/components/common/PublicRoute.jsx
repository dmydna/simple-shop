
export default function PublicRoute({ children }) {

    window.scrollTo({ top: 0, behavior: 'instant'});

    return <>{children}</>
}
