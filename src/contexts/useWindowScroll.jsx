import { useState, useEffect, useRef } from 'react';

export function useWindowScroll(axis = 'y') {
  const isX = axis?.toLowerCase() === 'x';
  
  // Guardamos el estado que consume la UI
  const [isScrolled, setIsScrolled] = useState(false);

  // useRef para rastrear el estado actual sin depender del ciclo de render
  const lastState = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const currentPos = isX ? window.scrollX : window.scrollY;
      const limit = isX ? 200 : 100;
      const nextState = currentPos >= limit;

      // OPTIMIZACIÓN CON useRef:
      // Solo llamamos a setState SI Y SOLO SI el estado realmente cambió (ej. pasó de false a true).
      if (lastState.current !== nextState) {
        lastState.current = nextState;
        setIsScrolled(nextState); // Dispara re-render solo 1 vez cuando cruza el umbral
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isX]);


  return isScrolled;
}

export const useScrollY = () => useWindowScroll('y');
export const useScrollX = () => useWindowScroll('x');