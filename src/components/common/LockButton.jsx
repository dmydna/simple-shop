import React, { useState } from "react";
import {Button} from "react-bootstrap";

export default function LockButton({locked, icon, handle, className, style}) {
    // const [locked, setLocked] = useState(false);

    const handleLocked = async () => {
        // setLocked(true)
        handle()
    };

    return (
        <div   style={style || {}} className={className || {}}   onClick={handleLocked}>
            {locked ?
                (<i className="bi bi-check small bg1-hover p-2 rounded"></i>) :
                (<i className={`bi ${icon ? icon : 'bi-pencil'}  small bg1-hover p-2 rounded`}></i>)}
        </div>
    );
}