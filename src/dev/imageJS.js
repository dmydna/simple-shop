export const BASE_URL = "http://localhost:8080"
export const ENDPOINT = "api/image"


export const bi_icons = {
  "bi-person" : "F4E1",
  "bi-person-fill" : "F4DA",
  "bi-braces" : "F1C9",    // { }
  "bi-code"   : "F2C8",    // < > 
  "bi-code-slash": "F2C6", // < />
  "bi-hash": "F40A",        // #
  "bi-at": "F152",          // @
  "default":"F152"
}

export const symbol = {
   "code0" : "F1C9", // { }
   "code1" : "F2C6" ,      //< />
   "arr"   : "%40" ,      // @
   "hash"  :  "%23" ,     // #
}

export const color ={
     ".melon"    : "FFE5B4",
     ".menta"    : "B2F2BB",
     ".lavanda"  : "C7CEEA",
//     ".limon"    : "FFFACD",
     ".rosa"     : "FFD6E0",
     ".cielo"    : "B5D8F7",
     ".lila"     : "E6CCFF",
     ".coral"    : "FFCBA4",
     ".aqua"     : "B2EBF2",
     ".manteca"  : "FFF5B7",
     ".salmon"   : "FFB7B2",
     ".pera"     : "D4F1A0",
     ".malva"    : "F2C4CE",
     ".celeste"  : "C9E8FF",
     ".durazno"  : "FFDAC1",
} 


const funColor = (c) => {
  const t = c + ""
  if(t.startsWith(".")){ return color[t] || "cccc" }
  return t
}

const funIcon = (i) => { 
  const t = i + ""
  if(t.startsWith("bi-")){ return bi_icons[t] || "F152" }
  return i 
}


export function ImgGenApi(
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


export const handleBulk = async (service, dataList) => {
      try {
        // 1. Verificar existencia JUSTO ANTES de intentar crear
        console.log("📤 Intentando carga masiva...");
        await service.createBulk(dataList);
        console.log("✅ Carga masiva completada");

      } catch (error) {
        console.error("❌ Fallo en el intento. Reintentando en 2s...", error);
        throw error
      }
  };

  

