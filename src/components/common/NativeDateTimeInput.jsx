import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const NativeDateTimeInput = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    // El input nativo devuelve "YYYY-MM-DDTHH:mm". 
    // Añadimos ":00" para asegurar compatibilidad con Java LocalDateTime (segundos).
    const formatted = value ? `${value}:00` : '';
    setSelectedDate(formatted);
    // console.log("Valor para Java:", formatted);
  };

  return (
    <FloatingLabel label="Fecha y Hora" className="mb-3">
      <Form.Control
        type="datetime-local"
        value={selectedDate ? selectedDate.slice(0, 16) : ''} // Mostramos solo hasta minutos al usuario
        onChange={handleChange}
        placeholder="Selecciona fecha y hora"
      />
    </FloatingLabel>
  );
};

export default NativeDateTimeInput;