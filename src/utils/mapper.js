

export const toCreateOrder = (cartItems) => {
    let totalAmount = 0;
    let totalQuantity = 0;
    return {
        "items": cartItems.map((item) => {
            totalAmount += item?.price;
            totalQuantity += item?.cantidad;
            return {
                "productId": item?.productId,
                "listingId": item?.id,
                "name": item?.productName,
                "quantity": item?.cantidad,
                "priceAtPurchase": item?.price
            }
        }),
        "totalAmount": totalAmount,
        "totalQuantity": totalQuantity,
    }

}



export function toCreateProduct(data) {
    const dimensions = {
        width: data.width,
        height: data.height,
        depth: data.depth
    }

    return {
        name: data.name,
        sku: data.sku,
        brand: data.brand,
        weight: data.weight,
        dimensions: dimensions,
        category: data.category,
        tags: data.tags
    }
}



export function toUpdateProduct(data) {
    const dimensions = {
        width: data.width,
        height: data.height,
        depth: data.depth
    }

    return ({
        name: data.name,
        brand: data.brand,
        weight: data.weight,
        status: data.status,
        rating: data.rating,
        dimensions: dimensions,
        category: data.category,
        tags: data.tags
    })
}



export function toCreateListing(data) {
    return {
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        images: data.images,
        thumbnail: data.thumbnail,
        sku: data.sku
    }
}


export function toUpdateListing(data) {
    return {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        discountPercentage: data.discountPercentage,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        availabilityStatus: data.availabilityStatus,
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        images: data.images,
        thumbnail: data.thumbnail
    }
}
