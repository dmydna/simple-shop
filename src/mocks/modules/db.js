import { generatePath } from "react-router-dom";
import listingData from "./data/listings.snapshot.json"
import productData from "./data/products.snapshot.json"
import userData from "./data/users.snapshot.json"
import {buildPageResponse, applyFilters, applySorting, extractPaginationParams, createMockDate} from "./utils"
import { metaDB } from "./meta";


// Variable en memoria para simular el usuario logueado actualmente en el mock
export let currentLoggedUser = 'admin'; 
export const setCurrentLoggedUser = (username) => {
  currentLoggedUser = username;
};

// Asignar password dinamico a users
export const processUser = (u) => ({
  ...u, password: u.username + "1234"
})


export const db = {

  users:    [...userData.content.map( processUser )],
  products: [...productData.content ],
	listings: [...listingData.content ],
	favorites: [],
	orders: [],
  orders_items: [],
  reviews: [],
  product_tags :[],

  metaDB: metaDB,


  /**metodos privados**/

	__generateId(collection){
		return this[collection].length;
	},

  __getIndex(collection, id){
    return this[collection].findIndex(i => i.id == id);
  },

  __create(collection, data){
    const DATE =  createMockDate( new Date() );
    const id = this.__generateId(collection);
    const meta = {createdAt: DATE, updatedAt: null, deletedAt: null}
    this[collection].push({id: id, ...data, meta: meta});
    console.log(`[DB.SAVE] ${collection}:`, this[collection]);
    return this[collection].find((item)=> item.id === id)
  }, 
  __update(collection, filterFn, update){
    const data = this[collection].find(filterFn);
    if(!data) return null;
    const DATE =  createMockDate( new Date() );
    const {id, meta} = data;
    const index = this.__getIndex(collection, id);
    this[collection][index] = {...update, id: id, meta: {...meta, updatedAt: DATE}}
    return this[collection].find((item)=> item.id === id)
  },

  __delete(collection, filterFn){
    const data = this[collection].find(filterFn);
    if(!data) return false;
    const DATE =  createMockDate( new Date() );
    const index = this.__getIndex(collection, data.id);
    const meta =  {...data.meta, deletedAt: DATE, status: "DELETED" }
    this[collection][index] = {...data, id: `_${data.id}`, meta: meta }
    return true;
  },


  _loadRelations(entity, parentCollectionName) {
    const meta = this.metaDB[parentCollectionName];
    if (!meta) return entity;

    const parentId = entity.id;
    const relationFieldInChild = meta.name; // Ej: "orderId"

    // 1. Procesar One-to-Many
    if (meta.oneToMany) {
      meta.oneToMany.forEach(relDef => {
        // relDef es algo como: { "items": "orders_items" }
        const relationKey = Object.keys(relDef)[0];      // "items"
        const childCollectionName = relDef[relationKey]; // "orders_items"

        const childCollection = this[childCollectionName];
        if (!childCollection) return;

        // Filtrar hijos
        const relatedItems = childCollection.filter(child => child[relationFieldInChild] === parentId);

        // Asignar al padre
        entity[relationKey] = relatedItems;
      });
    }

    // 2. Procesar One-to-One
    if (meta.oneToOne) {
      meta.oneToOne.forEach(relDef => {
        // relDef es algo como: { "details": "order_details" }
        const relationKey = Object.keys(relDef)[0];      // "details"
        const childCollectionName = relDef[relationKey]; // "order_details"

        const childCollection = this[childCollectionName];
        if (!childCollection) return;

        // Buscar único hijo
        const relatedItem = childCollection.find(child => child[relationFieldInChild] === parentId);

        // Asignar al padre (o null si no existe)
        entity[relationKey] = relatedItem || null;
      });
    }

    return entity;
  },



  /**metodos publicos**/


	save(collection, data){
    if(data?.id){
        return this.__update(collection, i => i.id == data?.id, data)
    }
    return this.__create(collection, data)
	},

  find(collection, filterFn, mapperFn = null) {
    if(mapperFn){ return mapperFn(this[collection].find(filterFn)) }
    return this[collection].find(filterFn);
  },
  
  findWithRelations(collection, filterFn, mapperFn = null){
    const entity = this[collection].find(filterFn);
    if(mapperFn){ return mapperFn(this._loadRelations(entity, collection)) }
    return this._loadRelations(entity, collection)
  },


  deleteFrom(collection, filterFn){
    return this.__delete(collection, filterFn)
  },

  findAll(collection, filterFn, mapperFn = null) {
    if(mapperFn){ 
      return this[collection]
       .filter(filterFn || (() => true))
       .map(mapperFn)  
     }
    return this[collection].filter(filterFn || (() => true));
  },


  exists(collection, filterFn){
    if(this.find(collection, filterFn)){ return true; }
    return false;
  },


  findPage(collection, request, mapperFn = null) {

    if (!request || !request.url) {
      return { content: [], totalElements: 0, totalPages: 0 };
    }

    const url = new URL(request.url);
    
    // 1. Extraer parámetros
    const { page, size, sortParam, filters } = extractPaginationParams(url);
    
    // 2. Obtener datos base (de la colección o del array mapeado)
    const baseData = this[collection];
    
    if (!Array.isArray(baseData)) {
      console.warn(`Datos no son un array en ${collection}`);
      return { content: [], totalElements: 0, totalPages: 0 };
    }

    // 3. Aplicar filtros
    const filteredData = applyFilters(baseData, filters);

    // 4. Aplicar ordenamiento
    const sortedData = applySorting(filteredData, sortParam);

    // 5. Calcular paginación
    const totalElements = sortedData.length;
    const start = page * size;
    const end = start + size;
    let pageContent = sortedData.slice(start, end);

    if(mapperFn){
      pageContent = pageContent.map(mapperFn)
    }

    // 6. Construir respuesta (Pasamos sortParam explícitamente para evitar scope issues)
    return { ...buildPageResponse(pageContent, page, size, totalElements, sortParam) };
  },

  update(collection, filterFn, updateFn) {
    const data = this[collection].find(filterFn)
    const index = this.__getIndex(collection, data.id);
    if (index > -1) {
      this[collection][index] = updateFn(this[collection][index])
    }
    return this[collection][index];
  },


}