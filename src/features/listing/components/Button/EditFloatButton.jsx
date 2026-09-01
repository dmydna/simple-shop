import { HoverIcon } from "@/components/common/FloatButtonCollection"
import { URL_LISTING_CRUD } from "@/utils/links"
import { useNavigate } from "react-router-dom"

export default function EditFloatButton({item}){
	
	const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`${URL_LISTING_CRUD}?mode=edit${item.meta.status == 'DRAFT' ? '.draft' : ''}&id=${item.id}`)
    }


	return (
        <HoverIcon
           className="border rounded-circle bg-wh01" 
           action={handleEdit}
           icon="pencil"
        />
	)
}