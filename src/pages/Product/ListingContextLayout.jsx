import PageLoading from "@/pages/fallback/PageLoading.jsx";
import { useEffect } from "react";
import { AppStatus } from "../../components/common/AppStatus.jsx";

export default function ListingContextLayout({children, placeholder, ...props}){
	
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

	return(
	    <AppStatus
          loading={props.loading}
          onRetry={props.fetchData}
          error={props.error}
          placeholder={placeholder || <PageLoading />}
          isEmpty={ props.totalElements === 0 }
      	> {children}
      	</AppStatus>
	)
}