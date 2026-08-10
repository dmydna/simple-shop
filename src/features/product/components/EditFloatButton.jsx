import { useNavigate } from "react-router-dom"
import { HoverIcon } from "./FloatButton"

export default function EditFloatButton({item}){
	
	const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/dashboard/listing-form?mode=edit${item.meta.status == 'DRAFT' ? '.draft' : ''}&hash=${item.id}`)
    }


	return (
        <HoverIcon
           className="border rounded-circle bg-wh01" 
           action={handleEdit}
           icon="pencil"
        />
	)
}