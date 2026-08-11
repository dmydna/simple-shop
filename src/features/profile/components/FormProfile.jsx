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

   		    <div className="d-flex gap-0 gap-md-3 flex-wrap flex-md-nowrap">
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Domicilio"
					type="text"
					name="address"
					register={register}
					errors={errors}
				/>
	
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Telefono"
					type="text"
					name="phone"
					register={register}
					errors={errors}
				/>
			</div>
			<InputFloating
				className={'mb-0 w-100'}
				placeholder="Ingrese Ciudad"
				type="text"
				name="city"
				register={register}
				errors={errors}
			/>

    
    		<div className="d-flex gap-0 gap-md-3 flex-wrap flex-md-nowrap">

				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Estado"
					type="text"
					name="state"
					register={register}
					errors={errors}
				/>
	
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Codigo Postal"
					type="number"
					name="zipCode"
					register={register}
					errors={errors}
				/>

			</div>

		{children}

		</Form >
	)
}