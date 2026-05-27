import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

export default function FloatingInputSelect(){
	

    const [selected, setSelected] = useState('4');

	return (
    <Form.Select value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="1">Usuarios (file*)</option>
            <option value="2">Productos (file*)</option>
            <option value="3">Publicaciones (file*)</option>
    </Form.Select>
    )
}