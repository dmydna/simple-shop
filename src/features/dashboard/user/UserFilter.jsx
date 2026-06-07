import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"

// TODO: implementar logica real de filtro
function UserFilter({close}){
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.StatusUser/>
			<SelectParams.Role />
		</FilterParams>
		)
}


export default UserFilter;