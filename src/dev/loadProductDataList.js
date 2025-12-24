import { productDataList } from "./productDataList";
import { productService } from "../services/productService";

export const handleCreateAll = async () => {
  try {
      // 1. Verificar si ya existen productos (esperando la respuesta)
      const existingProducts = await productService.getAll();
      
      // Si la lista tiene elementos, cancelamos la carga masiva
      if (existingProducts && existingProducts.length > 0) {
          console.log("⚠️ Ya existen productos en la base de datos. Operación cancelada.");
          return;
      }

      let success = false;
      
      // 2. Bucle de reintento hasta el éxito
      while (!success) {
          try {
              console.log("📤 Intentando carga masiva...");
              await productService.createBulk(productDataList);
              
              success = true; 
              await fetchData(); // Refresca la UI
              handleCloseModal();
              console.log("✅ Carga masiva completada con éxito");
          } catch (error) {
              console.error("❌ Error de red o servidor. Reintentando en 2s...", error);
              await new Promise(resolve => setTimeout(resolve, 2000));
          }
      }
  } catch (error) {
      console.error("❌ Error al verificar productos existentes:", error);
  }
};