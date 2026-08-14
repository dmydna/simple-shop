import { generatePath } from "react-router-dom";
import listingData from "./data/listings.snapshot.json"
import productData from "./data/products.snapshot.json"
import userData from "./data/users.snapshot.json"
import {buildPageResponse, applyFilters, applySorting, extractPaginationParams} from "./utils"


// Variable en memoria para simular el usuario logueado actualmente en el mock

export let currentLoggedUser = 'admin'; 
export const setCurrentLoggedUser = (username) => {
  currentLoggedUser = username;
};


export const processUser = (u) => ({
  ...u, password: u.username + "1234"
})


export const db = {

  users:    [...userData.content.map( processUser )],
  products: [...productData.content ],
	listings: [...listingData.content ],
	favorites: [],
	orders: [],


	generateId(collection){
		return this[collection].length;
	},

  getIndex(collection, id){
    return this[collection].findIndex(i => i.id == id);
  },

	save(collection, data){
		const id = this.generateId(collection);
		this[collection].push({id: id, ...data});
		return this[collection].find((item)=> item.id === id)
	},


  find(collection, filterFn, mapperFn = null) {
    if(mapperFn){ return mapperFn(this[collection].find(filterFn)) }
    return this[collection].find(filterFn);
  },
  

  deleteFrom(collection, filterFn){
    const updated =  this.update(
      collection, filterFn, data => ({ id: "__" + data.id, deleted: true }) 
    ) 
    return updated?.deleted || false
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
    const index = this.getIndex(collection, data.id);
    console.log("DB", index)
    if (index > -1) {
      this[collection][index] = updateFn(this[collection][index])
    }
    return this[collection][index];
  },


}