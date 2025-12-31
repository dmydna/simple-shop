import { listingService as productService } from "../services/listingService";
import { productDataList } from "./productDataList";

export const handleCreateAll = async () => {
    let success = false;
  
    while (!success) {
      try {
        // 1. Verificar existencia JUSTO ANTES de intentar crear
        const existing = await productService.getAll();
        if (existing && existing.length > 0) {
          console.log("⚠️ Los productos ya están en la base de datos.");
          success = true; // Salimos del bucle porque ya están ahí
          break;
        }
  
        console.log("📤 Intentando carga masiva...");
        await productService.createBulk(productDataList);
        
        success = true;
        console.log("✅ Carga masiva completada");
  
      } catch (error) {
        console.error("❌ Fallo en el intento. Reintentando en 2s...", error);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  
    // Ejecutar una sola vez al final del éxito
    return success;
  };