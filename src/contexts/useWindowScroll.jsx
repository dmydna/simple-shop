import { useState, useEffect } from "react";

export function useWindowScroll(size) {

  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollX, setScrollX] = useState(window.scrollX);

  useEffect(() => {
    function handleScroll() {  
      const y = window.scrollY
      const x = window.scrollX
      setScrollY((prev) => {
        const next = x >= 200 ? 100 : 0;
        return prev === next ? prev : next;
      });
      setScrollY((prev) => {
        const next = y >= 100 ? 100 : 0;
        return prev === next ? prev : next;
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  size = size?.toLowerCase();
  
 
  return (size === 'x'? scrollX : scrollY);
}



export const useScrollY = () => useWindowScroll('y')
export const useScrollX = () => useWindowScroll('x')
