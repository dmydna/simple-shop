import { useWindowsWidth } from "@contexts/useWindowSize.jsx";
import Search from "@f/search/Search.jsx";
import { useEffect, useState } from "react";

function SearchOverlay(){

    const width = useWindowsWidth()
  
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (width >= 1300 && isActive) {
        setIsActive(false);
      }
    }, [width, isActive]);

    return (
     <div className={`${isActive ? 'header-search-overlay' : ''}`}>
      <Search toggle={isActive} setToggle={setIsActive} />
     </div>
    )
}

export default SearchOverlay;