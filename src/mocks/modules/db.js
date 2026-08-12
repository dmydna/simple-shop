import { generatePath } from "react-router-dom";
import { content } from "./data/listings.json"


const DEFAULT_PASSWORD = '1234'
const DEFAULT_USER = {
	image: '/user-default-xl.png',
  firstName: 'user',
	lastName: 'default',
	address: 'st.1234',
	phone: '9011-1011',
  password: DEFAULT_PASSWORD,
  role: 'CLIENT',
  email: 'user@example.com'
}

const userAdmin = {
	...DEFAULT_USER,
    username: 'admin',
    role: 'ADMIN',
    email: 'admin@example.com'
}

// Variable en memoria para simular el usuario logueado actualmente en el mock
export let currentLoggedUser = 'admin'; 

export const setCurrentLoggedUser = (username) => {
  currentLoggedUser = username;
};

export const db = {
  users: [
    { id: 1, ...userAdmin },
  ],
	listings: [ ...content ],
	favorites: [],
	orders: [],


	generateId(collection){
		return this[collection].lenght;
	},

  getIndex(collection, id){
    return this[collection].findIndex(u => u.id === parseInt(id));
  },

	save(collection, data){
		const id = this.generateId(collection);
		this[collection].push({id: id, ...data});
		return this[collection].find((item)=> item.id === id)
	},


  find(collection, filterFn) {
    return this[collection].find(filterFn);
  },
  
  findAll(collection, filterFn) {
    return this[collection].filter(filterFn || (() => true));
  },

  findPage(collection, request) {
    console.log("LLEGA ACA - Procesando solicitud");
    
    if (!request || !request.url) {
      console.error("Request object missing URL");
      return { content: [], totalElements: 0, totalPages: 0 };
    }

    const url = new URL(request.url);
    
    // 1. Extraer parámetros de paginación y ordenamiento
    let page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '10');
    const sortParam = url.searchParams.get('sort');

    if(page < 0){
      page = 0
    }

    // 2. Filtrar los parámetros de consulta para obtener solo los filtros de negocio
    // Creamos un Set con los nombres de los parámetros que NO son filtros
    const paginationParams = new Set(['page', 'size', 'sort', 'includeTags']);
    
    // Convertimos todos los params a un objeto para iterar
    const allParams = Object.fromEntries(url.searchParams.entries());
    
    // Creamos el objeto 'filters' con solo los parámetros desconocidos
    const filters = {};
    for (const [key, value] of Object.entries(allParams)) {
      if (!paginationParams.has(key)) {
        filters[key] = value;
      }
    }

    console.log("Filtros detectados:", filters);

    // 3. Aplicar filtros dinámicos (Spec Pattern)
    let filteredData = [...this[collection]];

    if (Object.keys(filters).length > 0) {
      filteredData = filteredData.filter(user => {
        return Object.entries(filters).every(([key, value]) => {
          const userValue = user[key];
          
          // Lógica de comparación flexible
          if (userValue === undefined) return false; // Campo no existe en el objeto

          // Si el valor del filtro es una cadena, intentamos coincidencia parcial (case-insensitive)
          // Si es un número o booleano, usamos igualdad estricta
          if (typeof value === 'string') {
            return String(userValue).toLowerCase().includes(value.toLowerCase());
          }
          
          // Para números o booleanos
          return userValue == value; 
        });
      });
    }

    // 4. Aplicar ordenamiento (si existe)
    let sortedData = filteredData;
    if (sortParam) {
      const [field, direction] = sortParam.split(',');
      if (field && sortedData.length > 0 && Object.prototype.hasOwnProperty.call(sortedData[0], field)) {
        sortedData.sort((a, b) => {
          const valA = a[field];
          const valB = b[field];
          if (typeof valA === 'string') {
            return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          if (valA < valB) return direction === 'asc' ? -1 : 1;
          if (valA > valB) return direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    // 5. Calcular índices y paginar
    const start = page * size;
    const end = start + size;
    const pageContent = sortedData.slice(start, end);

    // 6. Cálculos finales
    const totalElements = sortedData.length;
    const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);

    return {
      content: pageContent,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam },
        offset: start,
        paged: true,
        unpaged: false
      },
      last: page === totalPages - 1,
      totalPages: totalPages,
      totalElements: totalElements,
      size: size,
      number: page,
      sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam },
      numberOfElements: pageContent.length,
      first: page === 0,
      empty: pageContent.length === 0
    };
  },
  
  update(collection, id, newData) {
    const index = this[collection].findIndex(i => i.id === id);
    if (index > -1) {
      this[collection][index] = { ...this[collection][index], ...newData };
    }
    return this[collection][index];
  }


}