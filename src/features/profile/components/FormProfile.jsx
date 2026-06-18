import InputFloating from "@/components/common/InputFloating";
import { Children } from "react";
import { Form } from "react-bootstrap";

export default function FormProfile({children, id, formHook, submit}) {
	
	const {register, errors} = formHook

	return (
		<Form id={id} onSubmit={submit} >

			<InputFloating
				placeholder="Ingrese Nombre"
				type="text"
				name="firstName"
				register={register}
				errors={errors}
			/>

			<InputFloating
				placeholder="Ingrese Apellido"
				type="text"
				name="lastName"
				register={register}
				errors={errors}
			/>

			<InputFloating
				placeholder="Ingrese Email"
				type="text"
				name="email"
				register={register}
				errors={errors}
			/>

			<InputFloating
				placeholder="Ingrese Domicilio"
				type="text"
				name="address"
				register={register}
				errors={errors}
			/>

			<InputFloating
				placeholder="Ingrese Telefono"
				type="text"
				name="phone"
				register={register}
				errors={errors}
			/>
    
		{children}

		</Form >
	)
}