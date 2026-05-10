import { useService } from "@hooks/useService";

export const useCrudActions = ({ service, onRefresh }) => {
    
    const { create, update, Delete, updateStatus, 
        loading, setLoading, error, success, setError, setSuccess
     } = useService({ service, onRefresh });


    const handleCreate = async (...args) => {
        await create(...args);
    };

    const handleUpdate = async (...args) => {
        await update(...args);
    };

    const handleDelete = async (...args) => {
        const MSG_ALERT = "¿Seguro que quieres eliminar este item?";
        if (window.confirm(MSG_ALERT)) {
            await Delete(...args);
        }
    };

    const handleStatus = async (...args) => {
        let MSG_ALERT = "Atencion. Esta accion puede ser irreversible. Esta seguro de continuar?";
        if (MSG_ALERT && window.confirm(MSG_ALERT)) {
            await updateStatus(...args);
        }
    };

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        handleStatus,
        setLoading,
        loading,
        error,
        success,
        setError, 
        setSuccess
    };
};
