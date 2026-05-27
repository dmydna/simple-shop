import InputSelectParam from "@features/filters/components/InputSelectParam"
import InputRangeParam  from "@features/filters/components/InputRangeParam"
import InputCheckParam  from "@features/filters/components/InputCheckParam"
import { status, category, availabilityStock, userStatus, role } from '@utils/enums.js';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState , useMemo } from "react";
import { useListing } from "@features/listing/hooks/useListing";


const AvalabilityStock = () => {
	return(
		<InputSelectParam
			label="availability" 
			name="availabilityStock" 
			Enum={availabilityStock} 
		/>
	)	
}


const Tags = () => {
  const { content } = useListing();

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
	Role
}