import PageLoading from "@/features/fallback/pages/PageLoading.jsx";
import { useUrlParams } from "@/hooks/useUrlParams.js";
import { AppStatus } from "@common/AppStatus.jsx";
import { useEffect } from "react";

export default function ListingContextLayout({children, placeholder, ...props}){
	
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

    const {allParams} = useUrlParams()

	return(
	    <AppStatus
          loading={props.loading}
          onRetry={props.fetchData}
          error={props.error}
          placeholder={placeholder || <PageLoading />}
          isEmpty={ props.totalElements === 0 && (!allParams || allParams.length == 0)}
      	> {children}
      	</AppStatus>
	)
}