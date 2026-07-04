import FilterBarParams from "./FilterBarParams";
import SelectParams from "./SelectParams";

export default function FilterListing(){
	

	return(
		<FilterBarParams close={close} badgeParams={true}>
				<div className="d-flex flex-fill gap-3">
					<SelectParams.Tags className='w-100'/>
					<SelectParams.RangePrice  className='w-100'/>
				</div>
		</FilterBarParams>
	)
}