export const useFetchElem = ({ fetchMethod }) => {
    const { loading, setLoading, error, setError } = useFetch();
    const [currentItem, setCurrentItem] = useState({});
    const [identifier, setIdentifier] = useState(null);

    const fetchData = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchMethod(id);
            setCurrentItem(data);
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err.message || "Error al cargar el elemento");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (identifier) {
            fetchData(identifier);
        }
    }, [identifier]);

    return {
        loading, setLoading,
        error, setError,
        currentItem, setCurrentItem,
        identifier, setIdentifier,
        fetchData
    };
};