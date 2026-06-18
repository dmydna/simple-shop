import { z } from 'zod';


export const CompleteUserRegister = z.object({
  firstName: z.string().min(1, "campo no valido").default(""),
  lastName:  z.string().min(1, "campo no valido").default(""),
  address:   z.string().min(1, "direccion no valido").default(""),
  phone:     z.string().min(1, "telefono es obligatorio").default(""),
  email:     z.string().email("formato de correo inválido").default(""),
});

export const RegisterUser = z.object({
  username: z.string().min(1, "El nombre es obligatorio"),
  password: z.string().min(4,"contraseña debe contener mas de 4 caracteres"),
});


export const ProductDTO = z.object({
  name: z.string().min(1, "Nombre requerido").default(""),
  category: z.string().default(""),
  brand: z.string().default(""),
  depth: z.coerce.number().min(0, "La medida no puede ser negativa").default(0), 
  width: z.coerce.number().min(0, "La medida no puede ser negativa").default(0),
  higth: z.coerce.number().min(0, "La medida no puede ser negativa").default(0),  
  tags:  z.array(z.string()).default([]),
  sku:   z.string().min(1, "sku requerido").default(""),
})

export const ListingDTO = z.object({
  title: z.string().min(1, "Título requerido").default(""),
  description: z.string().min(1, "Descripción requerida").default(""),
  price: z.coerce.number().min(0, "El precio no puede ser negativo").default(0), // .coerce convierte string "10" a 10
  discountPercentage:  z.coerce.number().min(0).max(100, "El descuento no puede superar el 100%").default(0),
  warrantyInformation: z.string().default(""),
  shippingInformation: z.string().default(""),
  availabilityStatus:  z.string().default(""),
  minimumOrderQuantity: z.coerce.number().int().min(1, "El precio no puede ser negativo").default(1),
  images: z.array(z.string()).default([]),
  productId: z.coerce.number().int().default(0),
  productName: z.string().default(""),
  sku: z.string().min(1, "sku requerido").default(""),
  weight: z.coerce.number().int().default(0),
  stock: z.coerce.number().int().min(0, "El precio no puede ser negativo").default(0),
  category: z.string().default(""),
  tags: z.array(z.string()).default([])
  // returnPolicy: z.string().default(""),
  // brand: z.string().default(""),
  // thumbnail: z.string().default(""),
});


// Opcional: Inferir el tipo si usas TypeScript
// export type ProductDTO = z.infer<typeof ProductDTO>;