import { useState } from "react";
import {CRUD} from "../utils/crud.js";

export const useForm = (initialState = {}) => {

    const [ selectedFile, setSelectedFile ] = useState([]); // Para subir Imagenes.
    const [formData, setFormData] = useState(initialState);

    const onResetForm = () => setFormData(initialState);

    const onValue = ({ target }) => {
        const { name } = target;
        return formData[name] ? formData[name] : '';
    }

    const onChange = ({ target }) => {
        const { name, value, type, checked } = target;

        let val;
        if (type === 'checkbox') {
            val = checked;
        } else if (type === 'number') {
            val = value === '' ? '' : Number(value);
        } else {
            val = value;
        }

        setFormData({
            ...formData,
            [name]: val
        });
    };
    
    return {
        ...formData,
        formData,
        onChange,
        onResetForm,
        setFormData,
        onValue,
        selectedFile, 
        setSelectedFile
    };
};