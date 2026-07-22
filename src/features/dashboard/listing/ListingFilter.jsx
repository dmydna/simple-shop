import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"
import { availabilityStock, status } from '@utils/enums.js'

// TODO: implementar filtro listing.availabilityStock
function ListingFilter({close}){
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Tags/>
{/*			<SelectParams.SelectByEnum 
				label="status" content={status} />*/}
{/*			<SelectParams.SelectByEnum 
				label="availability" content={availabilityStock}/>*/}
			<SelectParams.Category />
			<SelectParams.AvailabilityStatus />
			<SelectParams.ListingStatus />
			<SelectParams.RangePrice />
		</FilterParams>
		)
}


export default ListingFilter;