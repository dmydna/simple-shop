
// --- RELATIONS MAPPING DB  ---

export const metaDB = {

    orders: {
      /*  Nombre de la relacion: 
      *   Campo que se usará en la hija para hacer el match 
      *   ej: db.order_items.find( item => item.orderId == order.id ) 
      */
      name: "orderId", 
      oneToMany: [
         /** Relacion y Mappeo :
         *  (e.i: order.items = db.orders_items)
         */
        { "items": "orders_items" } 
      ],
      oneToOne: [
        { "details" : "order_details"} 
      ] 
    },

    products: {
      name: "productId",
      oneToMany: [
        {"tags": "product_tags"}
      ]
    },
    
    listings: {
      name: "listingId",
      oneToMany: [
        {"reviews": "reviews" }
      ] 
    }

  }