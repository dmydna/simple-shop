import { z } from 'zod';

// Definición del DTO
const CreateUserDTO = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Formato de correo inválido"),
  age: z.number().int().positive("La edad debe ser un número positivo"),
});


const ListingDTO = z.object({

  // Campos básicos del producto
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  
  // Información de garantía y envío
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  returnPolicy: z.string(),
  
  // Cantidad mínima de pedido
  minimumOrderQuantity: z.number().int(), // Se asume entero
  
  // Imágenes
  images: z.array(z.string()), // Lista de strings
  thumbnail: z.string(),
  
  // Información del producto (Product)
  productId: z.number().int(), // Long en Java suele mapearse a number en JS (BigInt si es muy grande)
  productName: z.string(),
  sku: z.string(),
  brand: z.string(),
  weight: z.number().int(),
  stock: z.number().int(),
  category: z.string(),
  
  // Etiquetas
  tags: z.array(z.string())
});

// Opcional: Inferir el tipo si usas TypeScript
// export type ProductDTO = z.infer<typeof ProductDTO>;