// HoverWrapper.jsx
import React from "react";
import { useHover } from "@contexts/HoverContext";



export default function HoverWrapper({ id, children }) {
  const { hoverState, setHoverState } = useHover();

  return (
    <div
      onMouseEnter={() => setHoverState({ state: true, key: id })}
      onMouseLeave={() => setHoverState({ state: false, key: id })}
    >
      {children(hoverState.state && hoverState.key === id)}
    </div>
  );
}
