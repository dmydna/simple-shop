import PageLoading from "@/pages/fallback/PageLoading";
import { AppStatus } from "@common/AppStatus";

// Nota: Restringuir el acceso basado en el estado de listingContext.
export default function RouteLayout({children}){


    return (
      <AppStatus
          placeholder={<PageLoading />}
      >
        {children}
      </AppStatus>
    )
}