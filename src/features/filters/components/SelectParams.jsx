import InputSelectParam from "@features/filters/components/InputSelectParam"
import InputRangeParam  from "@features/filters/components/InputRangeParam"
import InputCheckParam  from "@features/filters/components/InputCheckParam"
import InputSelectCheckParam from "@features/filters/components/InputSelectCheckParam"
import { status, category, availabilityStock, userStatus, role } from '@utils/enums.js';
import { useMemo } from "react";


const AvalabilityStock = () => {
	return(
		<InputSelectParam
			label="availability" 
			name="availabilityStock" 
			Enum={availabilityStock} 
		/>
	)	
}



const SelectByEnum = ({content, name}) => {

  // Extraer etiquetas únicas de los listings
  const Tags = useMemo(() => {
    const res = new Set();
    for(let tag in content){
        res.add(tag);
    };
    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [content]);

	return(
		<InputSelectCheckParam
			className="mb-2"
			name={name} 
			array={Tags}
		/>
	)	
}


const Tags = ({content}) => {

  // Extraer etiquetas únicas de los listings
  const Tags = useMemo(() => {
    const res = new Set();
    content.forEach(({ tags }) => {
      if (tags && Array.isArray(tags)) {
        tags.forEach(tag => res.add(tag));
      }
    });
    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [content]);

	return(
		<InputCheckParam
			className="mb-2"
			name="tags" 
			array={Tags}
		/>
	)	
}

const Status = () => {
	return(
		<InputSelectParam
			name="status" 
			Enum={status}  
		/>
	)	
}

const Role = () => {
	return(
		<InputSelectParam
			name="role" 
			Enum={role}  
		/>
	)	
}



const Category = () => {
	
	return (
		<InputSelectParam 
			name="category" 
			Enum={category} 		
		/>
	)
}



const StatusUser = () => {
	return(
		<InputSelectParam
			name="status" 
			Enum={userStatus} 
		/>
	)	
}




const RangePrice = () => {
    return(
    <InputRangeParam 
        min={0}
        max={1500}
        type={'$'}
        name={'price'}
    />       
    )
}



export default {
  AvalabilityStock, 
	Tags, 
	Status, 
	Category, 
	StatusUser, 
	RangePrice,
	Role,
	SelectByEnum
}