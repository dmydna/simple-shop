import { useState, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CRUD } from '@/utils/enums';
import * as z from 'zod';
import { ListingDTO } from '@/utils/schemas';


// FIXME: en modo draft, se debe ignorar lockedFieldsConfig
export const useCrudForm = (
    initialData, 
    initialSchema, 
    initialMode = CRUD.CREATE, 
    lockedFieldsConfig = {}
    ) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [mode, setMode] = useState(initialMode);
    const [enabledFields, setEnabledFields] = useState({});

    // --- Lógica de Estabilización Interna (Aquí es donde ocurre la magia) ---
    
    // 1. Estabilizar Schema: Si es una función, la ejecutamos. Si es objeto, lo guardamos en ref si cambia.
    // Usamos un ref para guardar la última referencia "estable" y evitar recreación en cada render.
    const schemaRef = useRef(null);
    
    // Solo actualizamos el schema si la referencia cambia realmente o si es la primera vez
    const stableSchema = useMemo(() => {

        // if (mode === CRUD.EDIT_DRAFT) { return z.object({}); }

        if (typeof initialSchema === 'function') return initialSchema();
        // Si es objeto, lo usamos directo. Si el padre pasa un objeto nuevo en cada render,
        // esto se recreará, PERO useForm lo maneja mejor si no hay cambios de valor.
        // Para ser 100% seguros contra referencias nuevas:
        if (!schemaRef.current || schemaRef.current !== initialSchema) {
            schemaRef.current = initialSchema;
        }
        return schemaRef.current || z.object({});
    }, [initialSchema, mode]); // Depende de la referencia, pero useMemo ayuda a no recrear si es igual

    // 2. Estabilizar Data: Usamos un ref para guardar el último dato válido
    // Esto evita que reset() se llame en cada render si el objeto es nuevo pero el contenido es igual
    const dataRef = useRef(initialData);
    const stableInitialData = useMemo(() => {
        // Comparamos contenido superficialmente o usamos el ref si es igual
        // Si initialData es nuevo pero tiene los mismos valores, mantenemos el anterior
        const isDifferent = JSON.stringify(initialData) !== JSON.stringify(dataRef.current);
        if (isDifferent) {
            dataRef.current = initialData;
        }
        return dataRef.current;
    }, [initialData]);


    const {
        register,
        trigger,        // <--- Método para validar manualmente
        getValues,      // <--- Método para obtener todos los datos
        // handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(stableSchema),
        defaultValues: stableInitialData || {},
        //  NOTA: 
        // dejamos la opcion validacion onSubmit (por default)
        // por compatibilidad de mode draft.
        // mode: 'onTouched', 
        // reValidateMode: 'onChange'
    });


    useEffect(() => {
        // Obtenemos los valores actuales antes de resetear
        const currentValues = getValues();
        // Resetamos con los mismos valores pero con el nuevo esquema
        reset(currentValues);
    }, [stableSchema]);


    // --- Lógica de Modos y Bloqueos ---
    const isFieldDisabled = (field) => {
        if (mode === CRUD.CREATE) return false;
        if (mode === CRUD.READ) return true;
        if (mode === CRUD.UPDATE || mode == CRUD.EDIT_DRAFT) {
            if (lockedFieldsConfig[field]) return true;
            return !enabledFields[field];
        }
        return false;
    };

    const handleEnableField = (field) => {
        if (![ CRUD.EDIT_DRAFT,CRUD.UPDATE ].includes(mode) 
            || lockedFieldsConfig[field]) return;
        setEnabledFields(prev => ({ ...prev, [field]: true }));
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        if (newMode !== CRUD.UPDATE) setEnabledFields({});
    };

    // Sincronizar reset solo cuando el contenido REAL de los datos cambia
    useEffect(() => {
        if (stableInitialData && Object.keys(stableInitialData).length > 0) {
            reset(stableInitialData);
            setEnabledFields({}); // Limpiar habilitados al cargar nuevo dato
        }
    }, [stableInitialData, reset]);


    const handleAction = async (actionCallback) => {
        // Validar todos los campos
        const isValidForm = await trigger(); 
        
        if (!isValidForm) {
            // console.log("❌ Validación fallida. Revisa los campos.");
            console.group("❌ Errores de Validación Detectados");
            console.error("Estado de errores:", errors);
            
            // Recorrer los errores para verlos más limpios en consola
            Object.keys(errors).forEach(key => {
                const error = errors[key];
                // console.log(`Campo: ${key} | Mensaje: ${error?.message}`);
            });
            console.groupEnd();
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return false; // Detener la ejecución
        }


        // Si es válido, obtenemos los datos
        const data = getValues();
        // console.log("data:",data)
        
        // Ejecutamos la acción específica (create, update, etc.)
        // Pasamos también el selectedFile si es necesario
        // console.log("selectedFile:", selectedFile)
        await actionCallback(data, selectedFile);
        return true;
    };


    return {
        register, watch, setValue, reset, errors, selectedFile, setSelectedFile,
        mode, changeMode, lockedFields: lockedFieldsConfig,
        isFieldDisabled, handleEnableField,
        getValues,
        showCopyButton: mode === CRUD.READ,
        showEditButton: mode === CRUD.UPDATE || mode == CRUD.EDIT_DRAFT,
        updateSchema: (newSchema) => { /* Lógica si se necesita cambiar schema dinámicamente */ },
        currentSchema: stableSchema, handleAction
    };
};