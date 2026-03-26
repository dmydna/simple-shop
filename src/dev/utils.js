export const BASE_URL = "http://localhost:8080"
export const ENDPOINT = "api/image"

export const symbol = {
   "code0" : "%7B%20%7D", // { }
   "code1" : "< />",      
   "arr"   : "%40" ,      // @
   "hash"  :  "%23" ,     // #
}

export const color ={
     "plain"    : "2999FFB",
     "melon"    : "FFE5B4",
     "menta"    : "B2F2BB",
     "lavanda"  : "C7CEEA",
     "limon"    : "FFFACD",
     "rosa"     : "FFD6E0",
     "cielo"    : "B5D8F7",
     "lila"     : "E6CCFF",
     "coral"    : "FFCBA4",
     "aqua"     : "B2EBF2",
     "manteca"  : "FFF5B7",
     "salmon"   : "FFB7B2",
     "pera"     : "D4F1A0",
     "malva"    : "F2C4CE",
     "celeste"  : "C9E8FF",
     "durazno"  : "FFDAC1",
} 


export function ImgGenApi(dimension, background, text, size, color){
    return `${BASE_URL}/${ENDPOINT}/${dimension}`+
           `?background=${background}` +
           `&text=${text}` +
           `&fontSize=${size}` +
           `&fontColor=${color}`
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