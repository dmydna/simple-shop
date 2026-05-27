// ENUMS Y TIPOS DEPENDIENTES (Ejemplo)
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}


export interface BanRequest{
    banExpiresAt: Date,
    banReason: string
}


export interface ProductDimensions {
  width: number;
  height: number;
  length: number;
  unit: string;
}

export interface OrderItemDto {
  productId: string;
  quantity: number;
  price: number;
}

// LISTING
export interface CreateListingDTO {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
  sku: string;
  status: Status;
}

export interface UpdateListingDTO {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  status?: Status;
  discountPercentage?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  images?: string[];
  thumbnail?: string;
}

// ORDER
export interface CreateOrderDTO {
  items: OrderItemDto[];
  totalQuantity: number;
  totalAmount: number; // BigDecimal se mapea a number o string para precisión
}

// PRODUCT
export interface CreateProductDTO {
  name: string;
  sku: string;
  brand: string;
  weight: number;
  dimensions: ProductDimensions;
  category: string;
  tags: string[];
  status: Status;
}

export interface UpdateProductDTO {
  name?: string;
  brand?: string;
  weight?: number;
  status?: Status;
  dimensions?: ProductDimensions;
  category?: string;
  tags?: string[];
}

// USER
export interface UpdateUserDTO {
  password?: string;
  email?: string;
  image?: string;
}