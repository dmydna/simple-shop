import CenterLayout from "@/components/layout/CenterLayout";

export default function PageError({error, handle}){
    return (
        <CenterLayout>
            <FallbackError error={error} handle={handle}/>
        </CenterLayout>
    )
}