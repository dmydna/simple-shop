import React, { useEffect, useState } from "react";
import Img0 from "../../assets/check-crop.gif"


function SuccessCheck({show, width, className, handleEnd, handleStart, time}){

    const [gif, setGif] = useState()
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)

    useEffect(()=>{
        handleStart ? handleStart() : {} 
        setStart(true)
        setGif(Img0)
    },[show])


    useEffect(()=>{
        setTimeout(()=>{
            setEnd(true)
            handleEnd ? handleEnd() : {}
        }, time? time : 0);
    })

    return(
        <div className={`${show ? '' : 'd-none' } ${className}`}>
            <img className="p-4 d-block mx-auto" width={width} src={gif}/>
        </div>
    )
}

export default SuccessCheck