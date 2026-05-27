import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"


// TODO: implementar logica real de filtro
function ProductFilter({close}){
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Status />
			<SelectParams.Tags />
			<SelectParams.Category />
		</FilterParams>
		)
}


export default ProductFilter;