import React, { useState } from 'react';

const CustomSelect = () => {
  const [selected, setSelected] = useState('');

  const options = ['Amarillo', 'Rojo', 'Azul', 'Verde'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Input con el label como placeholder */}
      <input
        type="text"
        placeholder="Color"
        readOnly
        value={selected || ''}
        onClick={() => alert('Selecciona una opción')}
        style={{
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '150px',
          cursor: 'pointer'
        }}
      />

      {/* Select de opciones a la derecha */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      >
        <option value="" disabled>Selecciona</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;