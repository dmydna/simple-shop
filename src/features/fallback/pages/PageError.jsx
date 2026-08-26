import CenterLayout from "@/components/layout/CenterLayout";
import FallbackEmpty from "@f/fallback/FallbackEmpty";

export default function PageError({error, handle}){
    return (
        <CenterLayout>
            <FallbackError error={error} handle={handle}/>
        </CenterLayout>
    )
}