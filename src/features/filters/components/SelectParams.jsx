import InputSelectParam from "@features/filters/components/InputSelectParam"
import InputRangeParam  from "@features/filters/components/InputRangeParam"
import InputCheckParam  from "@features/filters/components/InputCheckParam"
import InputSelectCheckParam from "@features/filters/components/InputSelectCheckParam"
import { status, category, availabilityStock, userStatus, role } from '@utils/enums.js';
import { useMemo } from "react";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { statsService } from "@/features/stats/services/statsService";


const AvalabilityStock = () => {
	return(
		<InputSelectParam
			label="availability" 
			name="availabilityStock" 
			Enum={availabilityStock} 
		/>
	)	
}



const SelectByEnum = ({content, label, cols, textStyle, multiseleccion}) => {

  // Extraer etiquetas únicas de los listings
  const Tags = useMemo(() => {
    const res = new Set();
    for(let tag in content){
        res.add(tag);
    };
    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [content]);

	return(
		<InputCheckParam
			multiselection={multiseleccion}
			className="mb-2"
			cols={multiseleccion  ? cols : 1}
			textStyle={multiseleccion  ? textStyle : 'uppercase'}
			name={label} 
			array={Tags}
		/>
	)	
}






const SelectByStats = ({type, label, cols, textStyle, multiseleccion}) => {

	const {data, loading, error} = useFetchTrigger({ 
        fetchMethod: statsService.getTop, 
        initialTriggers: {limit:15, type: type} 
  })

  // Extraer etiquetas únicas de los listings
  const Tags = useMemo(() => {
    const res = new Set();
    data?.forEach( ({name, count}) => {
        res.add(`${name}(${count})`);
    });
    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [data]);

	return(
		<InputCheckParam
			multiselection={multiseleccion}
			className="mb-2"
			cols={multiseleccion  ? cols : 1}
			textStyle={multiseleccion  ? textStyle : 'uppercase'}
			name={label || type} 
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
	Tags : ()=>SelectByStats({
	  cols: 2, 
	  type:"tags", 
	  multiseleccion: true
	}),
	Category : ()=>SelectByStats({ 
	  cols: 1, 
	  type:"categories", 
	  textStyle: "uppercase",
	}),
	Status, 
	StatusUser, 
	RangePrice,
	Role,
	SelectByEnum,
  SelectByStats
}