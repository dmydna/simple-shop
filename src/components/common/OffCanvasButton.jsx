import { Card } from "react-bootstrap";
import { IconTintyColor } from "@/components/common/IconTintyColor";
import { IconTint, Tintify } from "@/components/common/FloatButtonCollection";
import { useUrlState } from "@/hooks/useUrlState";
import { useUrlParams } from "@/hooks/useUrlParams";


export default function OffCanvasButton({icon, className}){
	
    const { setSearchParams } = useUrlState()
    const {dialogParam} = useUrlParams()


	const handle = () => {
        if(dialogParam && dialogParam == 'offCanvas'){
            setSearchParams(prev => ({...prev, dialog: null }))
        }else{
            setSearchParams(prev => ({...prev, dialog: 'offCanvas' }))

        }
    }

	return (
        <div className={`${className} position-absolute`} onClick={handle} 
            style={{top: '15px', right: '10px'}}>
            <IconTint icon={icon || "three-dots-vertical"} />
        </div>
	)
}