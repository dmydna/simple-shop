import {useEffect, useRef, useState} from "react";

export const useTagsList = (array) => {
    const [list, setList] = useState(array);
    const [tag, setTag] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef(null);

    // Foco automático al abrir el input
    useEffect(() => {
        if (isAdding) inputRef.current?.focus();
    }, [isAdding]);

    const deleteTag = (indexToDelete) => {
        setList(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    const handleSave = () => {
        // Sin espacios
        const cleanTag = tag.trim();
        // Sin repetidos
        if (cleanTag && !list.includes(cleanTag)) {
            setList([...list, cleanTag]);
        }
        setTag("");
        setIsAdding(false);
    };

    return {
        list, setList, deleteTag, tag, setTag, isAdding ,setIsAdding, handleSave
    }
}