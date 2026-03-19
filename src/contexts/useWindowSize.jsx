import { useState, useEffect } from "react";

export function useWindowSize(size) {

  const [width, setWidth] = useState(window.innerWidth);
  const [height,setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {  
      setWidth(window.innerWidth);
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  size = size?.toLowerCase();
  
  if(size === 'breakpoint'){
    return {
      isXsm: width < 320, 
      isSm:  width < 768,
      isMd:  width < 992,
      isLg:  width < 1200, 
      isXl:  width < 1400,
      isXxl: width >= 1400,
    }
  }
      
  return (size === 'height'? height : width);
}


export const useWindowBreakpoints = () => useWindowSize('breakpoint');
export const useWindowsWidth = () => useWindowSize('width')
export const useWindowsHeight = () => useWindowSize('height')
