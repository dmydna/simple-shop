import CenterLayout from "@/components/layout/CenterLayout";
import FallbackIsOffline from "@/features/fallback/components/FallbackPageIsOffline";

export default function PageIsOffline(){
    return (
        <CenterLayout>
            <FallbackIsOffline/>
        </CenterLayout>
    )
}