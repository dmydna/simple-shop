import { useState } from "react"
import { IconTint } from "./FloatButton"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import DeleteFloatButton from "./DeleteFloatButton"
import StatusFloatButton from "./StatusFloatButton"
import FavoriteFloatButton from "./FavoriteFloatButton"
import { useAuthContext } from "@/features/auth/contexts/AuthContext"
import EditFloatButton from "./EditFloatButton"



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