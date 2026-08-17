import { useEffect} from "react";


export default function CenterLayout ({children}){
	
		const fix = ['d-flex','justify-content-center', 'align-items-center']
	    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;
        main.classList.add(...fix );
        return () => {
            main.classList.remove(...fix);
        };
    }, []);

	return <>{children}</>
}