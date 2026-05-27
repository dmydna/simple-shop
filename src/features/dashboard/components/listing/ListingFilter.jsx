import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"


function ListingFilter({close}){
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Status />
			<SelectParams.Tags />
			<SelectParams.AvalabilityStock />
			<SelectParams.Category />
			<SelectParams.RangePrice />
		</FilterParams>
		)
}


export default ListingFilter;