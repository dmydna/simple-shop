import { IconTint } from "@/components/common/FloatButtonCollection"
import { useAuthContext } from "@/features/auth/contexts/AuthContext"
import DeleteFloatButton from "@f/product/components/DeleteFloatButton"
import EditFloatButton from "@f/product/components/EditFloatButton"
import FavoriteFloatButton from "@f/product/components/FavoriteFloatButton"
import StatusFloatButton from "@f/product/components/StatusFloatButton"
import { useState } from "react"



export default function AdminFloatButton({item, style}){
	
	const {isAdmin, isAuth} = useAuthContext();
	const [hide, setHide] = useState(false);


    const handleHide = () => {
      setHide(prev => !prev)
    } 


	return (
		<div 
			style={style} 
			className={`d-flex gap-2 ${item?.meta?.status == 'DELETED' ? 'd-none' : ''}`}
		>
			{hide && (
				<div className="d-flex gap-2">
				  <DeleteFloatButton item={item} />
					<StatusFloatButton item={item} />
					<EditFloatButton   item={item} />
				</div>
			)}
			{!hide && isAuth && (
				<FavoriteFloatButton item={item} />
			)}
			{isAdmin && (
    	    	<IconTint
    	    	  className="rounded-circle align-selft-end" 
    	    	  action={handleHide}
    	    	  icon={`three-dots${hide ? '' : '-vertical'}`}
    	    	/>
			)}
    	</div>
	)
}