import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';

const FloatingDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Componente personalizado para el input que renderiza el DatePicker
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Form.Control
      as="input"
      value={value || ''}
      onClick={onClick}
      ref={ref}
      placeholder="Selecciona fecha y hora"
      className="form-control pt-4 mt-3 border"
    />
  ));

  const handleChange = (date) => {
    if (date) {
      // Formato compatible con Java LocalDateTime: "yyyy-MM-dd HH:mm:ss"
      const formatted = date.toISOString().slice(0, 19).replace('T', ' ');
      setSelectedDate(formatted);
      // console.log("Valor para Java:", formatted);
    }
  };

  return (
    <FloatingLabel label="Fecha y Hora" className="mb-3">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm:ss"
        customInput={<CustomInput />}
        popperClassName="react-datepicker-popper-custom"
      />
      {/* Estilo adicional para asegurar que el label flote correctamente */}
      <style>
        {`
          .react-datepicker-wrapper {
            width: 100%;
          }
          .react-datepicker__input-container input {
            width: 100%;
            border: none;
            background: transparent;
            box-shadow: none;
          }
          /* Ajuste para que el label flote cuando hay valor */
          .form-floating > .form-control:not(:placeholder-shown) ~ label,
          .form-floating > .form-control:focus ~ label {
            transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
          }
        `}
      </style>
    </FloatingLabel>
  );
};

export default FloatingDatePicker;