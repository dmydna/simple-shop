import { bi_icons, color as Color } from "@utils/enums"

export const BASE_URL = "http://localhost:8080"
export const ENDPOINT = "api/image"


const funColor = (c) => {
  const t = c + ""
  if(t.startsWith(".")){ return Color[t] || "cccc" }
  return t
}

const funIcon = (i) => { 
  const t = i + ""
  if(t.startsWith("bi-")){ return bi_icons[t] || "F152" }
  return i 
}


export function placeholder(
  { 
    dimension = "120x120", 
    text, 
    icon, 
    fontSize, 
    background, 
    textColor, 
    fontWeight
  }){
    // Valida que text sea un string
    const finalText = text ? `text=${text}` : '';
    const finalIcon = icon ? `&icon=${funIcon(icon)}` : '';
    const finalBg   = background ?  `&background=${funColor(background)}` : '' 
    const finaltextColor = textColor ? `&textColor=${funColor(textColor)}` : ''
    const finalWeight = fontWeight ? `&fontWeight=${fontWeight}` : ''
    const finalFontSize = fontSize ? `&fontSize=${fontSize}` : ''

    return `${BASE_URL}/${ENDPOINT}/${dimension}?` 
    + finalText + finalBg +finalIcon + finalWeight + finalFontSize + finaltextColor ;
}


export const placeholderURL = {


    listing : (index = 0, color = null) => {
    return placeholder({
        "icon": "F38A",
        "dimension": "150x150",
        "fontSize": "80",
        "fontWeight": "light",
        "background": "fff",
        "textColor": color || Object.values(Color)[index % Object.values(Color).length],
    })},

    user : (index = 0, color = null) => {
    return placeholder({
        "icon": "bi-person-fill",
        "dimension": "150x150",
        "fontSize": "80",
        "fontWeight": "light",
        "background": "fff",
        "textColor": color || Object.values(Color)[index % Object.values(Color).length],
    })},

    product : (index=0 , color=null) => {
    return placeholder({
        "icon": "F7D3",
        "dimension": "150x150",
        "fontSize": "80",
        "fontWeight": "light",
        "background": "fff",
        "textColor": color || Object.values(Color)[index % Object.values(Color).length],
    })}
}