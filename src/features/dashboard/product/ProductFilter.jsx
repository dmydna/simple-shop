import { useProduct } from '@/features/product/hooks/useProduct';
import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"


// TODO: implementar logica real de filtro
function ProductFilter({close}){

	const {content} = useProduct()
	return(
		<FilterParams close={close} badgeParams={true}>
			<SelectParams.Status/>
			<SelectParams.Tags  content={content}/>
			<SelectParams.Category />
		</FilterParams>
		)
}


export default ProductFilter;