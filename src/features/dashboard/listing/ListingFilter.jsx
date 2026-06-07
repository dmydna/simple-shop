import { useListing } from '@/features/listing/hooks/useListing';
import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"
import { availabilityStock, category, status } from '@utils/enums.js'


function ListingFilter({close}){
	const {content} = useListing()
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Tags content={content}/>
			<SelectParams.SelectByEnum name="status"      content={status} />
			<SelectParams.SelectByEnum name="avalability" content={availabilityStock}/>
			<SelectParams.SelectByEnum name="category"    content={category}/>
			<SelectParams.RangePrice />
		</FilterParams>
		)
}


export default ListingFilter;