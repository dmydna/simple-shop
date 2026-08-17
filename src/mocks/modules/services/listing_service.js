import { baseService } from '@/mocks/modules/services/baseService.js';
import { db } from '@/mocks/modules/db';


const collection = 'listings';

export const listing_service = {


    ...(baseService(collection)),

    create: (data) => {
        const product = db["products"].find( p => p.sku == data.sku )
        if(!product)
            throw new Error("ERROR: SKU no valido o no existe");
        
        data.thumbnail = data.images.length != 0 ? data.images[0] : "";
        data.finalPrice = listing_service
           .calculateDiscount(data.price, data.discountPercentage)
           .finalPrice

        const response = listing_service.setStatusForStock(data)

        return db.save(collection, mapListingProduct(response, product))
    },

    calculateDiscount: (basePrice, discountPercent) => {
        if (!basePrice || !discountPercent) 
            throw new Error("Argumentos nulos al calcular precio")
        
        if (basePrice < 0) 
            throw new Error("Precio no puede ser cero")
    
        if (discountPercent < 0 || discountPercent > 100) 
            throw new Error("Descuento fuera de rango (0 a 100)")
        
        const discountAmount = basePrice * (discountPercent/100)
        const finalPrice = (basePrice - discountAmount).toFixed(2)

        return { discountAmount, finalPrice }
    },   


    setStatusForStock(listing){
        if (listing.stock == 0) {
            listing.availabilityStatus = "Out of Stock";
            listing.meta.status = "INACTIVE";
        }
        if (listing.stock < 10) {
            listing.availabilityStatus = "Low Stock";
        }

        if (listing.stock >= 10) {
            listing.availabilityStatus = "In Stock";
        }
        return listing;
    }

}


export const mapListingProduct = (listing, product) => {
    return {
         ...listing, 
         productId: product.id, 
         productName: product.name, 
         brand: product.brand,
         weight: product.weight,
         dimensions: product.dimensions,
         category: product.category,
         tags: product.tags,
    }
}
