import { useUrlState } from "@/hooks/useUrlState";
import { useMemo } from "react";
import { Modal } from "react-bootstrap";




export default function ModalParam({ children, param, inverse = false }) {


    const { searchParams, setSearchParams } = useUrlState();

    // 1. Extraer Key y Valores Esperados en un solo paso
    const { key, expectedValues } = useMemo(() => {
        // console.log(param)
        if (!param) return { key: null, expectedValues: [] };

        const [k, rawValue] = param.split('=');
        
        // Normalizar el valor esperado a un array
        let values = [];
        if (Array.isArray(rawValue)) {
            values = rawValue;
        } else if (typeof rawValue === 'string') {
            // Soporta "val1,val2" o "val1"
            values = rawValue.split(',').map(v => v.trim()).filter(v => v !== '');
        } else if (rawValue !== undefined) {
            values = [rawValue];
        }

        return { key: k, expectedValues: values };
    }, [param]);

    // 2. Obtener valor actual de la URL
    const currentUrlValue = key ? searchParams[key] : null;
    let matches = false;
    
    if (expectedValues.length > 0) {
        matches = expectedValues.includes(currentUrlValue);
    } else if (key) {
        // Caso especial: param="dialog" (sin valor) -> mostrar si existe la clave
        matches = currentUrlValue !== null;
    }

    // Aplicar inversa si se requiere
    const show = inverse ? !matches : matches;

    // 4. Función de cierre
    const close = () => {
        setSearchParams(prev => {
            const next = { ...prev };
            next[key]= null
            return next;
        });
    };

    // Si no hay key válida, no mostramos nada (o podrías mostrar children siempre)
    if (!key) return null;

    return (
        <Modal
            show={show}
            onHide={close}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="p-0">
                {children(close)}
            </Modal.Body>
        </Modal>
    );
}