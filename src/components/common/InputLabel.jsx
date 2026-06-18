export function InputLabel({errors, rows, type, label, placeholder, isDisabled, as, register}){


	return(
		<Form.Group className="w-100 position-relative">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                placeholder={placeholder || `Ingrese ${name}`}
                // React Hook Form maneja el valor y el onChange automáticamente
                {...register(name)} 
                disabled={isDisabled}
                spellCheck="false"
                style={as === "textarea" ? { minHeight: '100px', resize: 'vertical' } : {}}
                as={as || "input"}
                rows={rows || 8}
                // Si el campo tiene error, añadimos clase visual (opcional)
                isInvalid={!!errors[name]}
            />
    	</Form.Group>
	)
}