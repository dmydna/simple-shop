import { useService } from "../../hooks/useService";

export const useCrudActions = ({ service, onRefresh }) => {
    const { createWithImage, update, Delete, updateVisibility, loading, error }
        = useService({ service, onRefresh });


    const handleCreate = async (data, file) => {
        await createWithImage(data, file);
    };

    const handleUpdate = async (id, data, file) => {
        await update(id, data, file);
    };

    const handleDelete = async (id) => {
        const MSG_ALERT = "¿Seguro que quieres eliminar este item?";
        if (window.confirm(MSG_ALERT)) {
            await Delete(id);
        }
    };

    const handleVisibility = async (item) => {
        const MSG_ALERT = "¿Seguro que quieres ocultar/mostrar este item?";
        if (window.confirm(MSG_ALERT)) {
            const str_visibility = item.visibility === visibility.HIDDEN
                ? visibility.PUBLIC
                : visibility.HIDDEN;
            await updateVisibility(item.id, str_visibility);
        }
    };

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        handleVisibility,
        loading,
        error
    };
};