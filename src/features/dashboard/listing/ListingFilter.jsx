import { useListing } from '@/features/listing/hooks/useListing';
import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"
import { availabilityStock, category, status } from '@utils/enums.js'

// TODO: implementar filtro listing.availabilityStock
function ListingFilter({close}){
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Tags/>
			<SelectParams.SelectByEnum label="status"      content={status} />
			<SelectParams.SelectByEnum label="avalability" content={availabilityStock}/>
			<SelectParams.SelectByEnum label="category"    content={category}/>
			<SelectParams.RangePrice />
		</FilterParams>
		)
}


export default ListingFilter;