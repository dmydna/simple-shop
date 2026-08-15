
import { db } from "./db";

// --- PAGINATION UTILS ---

/**
 * Extrae parámetros de paginación, ordenamiento y filtros de negocio de la URL.
 */
export const extractPaginationParams = (url) => {
  const paginationKeys = new Set(['page', 'size', 'sort', 'includeTags']);
  const allParams = Object.fromEntries(url.searchParams.entries());
  
  const page = Math.max(0, parseInt(allParams.page) || 0);
  const size = parseInt(allParams.size) || 10;
  const sortParam = allParams.sort;
  
  // Filtrar solo los parámetros de negocio (los que no son de paginación)
  const filters = {};
  for (const [key, value] of Object.entries(allParams)) {
    if (!paginationKeys.has(key)) {
      filters[key] = decodeURIComponent(value.replace(/\+/g, " "));
      console.log(filters[key])
    }
  }

  return { page, size, sortParam, filters };
};

/**
 * Aplica filtros dinámicos a un array de datos.
 */
export const applyFilters = (data, filters) => {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      const itemValue = item[key];
      if (itemValue === undefined) return false;

      if (typeof value === 'string') {
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      }
      return itemValue == value;
    });
  });
};

/**
 * Aplica ordenamiento a un array de datos.
 */
export const applySorting = (data, sortParam) => {
  if (!sortParam || data.length === 0) return data;

  const [field, direction] = sortParam.split(',');
  if (!field || !Object.prototype.hasOwnProperty.call(data[0], field)) return data;

  return [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    
    if (typeof valA === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Construye el objeto de respuesta estilo Spring Page.
 */
export const buildPageResponse = (content, page, size, totalElements, sortParam) => {
  const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
  const start = page * size;

  return {
    content,
    pageable: {
      pageNumber: page,
      pageSize: size,
      sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam }, // Nota: sortParam debe estar en scope o pasarla
      offset: start,
      paged: true,
      unpaged: false
    },
    last: page === totalPages - 1,
    totalPages,
    totalElements,
    size,
    number: page,
    sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam },
    numberOfElements: content.length,
    first: page === 0,
    empty: content.length === 0
  };
};



// --- DATE UTILS ---

export const createMockDate = (date, month1Index = false) => {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Fecha inválida proporcionada a createMockDate');
  }

  const year = d.getFullYear();
  // month1Index: si es true, sumamos 1 a d.getMonth()
  const month = month1Index ? d.getMonth() + 1 : d.getMonth();
  const day = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();

  return [year, month, day, hour, min];
};


export const dateFromMockArray = (arr, month1Index = false) => {
  if (!Array.isArray(arr) || arr.length < 5) {
    throw new Error('El array debe tener al menos 5 elementos: [year, month, day, hour, min]');
  }

  const [year, monthInput, day, hour, min] = arr;
  
  // Si el mes viene en formato 1-12, restamos 1 para que JS lo entienda (0-11)
  const month = month1Index ? monthInput - 1 : monthInput;

  return new Date(year, month, day, hour, min);
};



// --- STATS UTILS ---

// HACKME: se adapta a un caso particular 
export const listCountSubfield = async (path, limit) => {
  // 1. Validar entrada
  if (!path || typeof path !== 'string') {
    console.error("listCountSubfield: Ruta inválida");
    return [];
  }

  // 2. Dividir la ruta en partes
  // Ej: "listings.meta.status" -> ["listings", "meta", "status"]
  const parts = path.split('.');
  
  if (parts.length < 2) {
    console.error("listCountSubfield: La ruta debe tener al menos 2 partes (coleccion.campo)");
    return [];
  }

  // 3. Obtener la colección base (primera parte)
  const collectionName = parts[0];
  const baseCollection = db[collectionName];

  if (!baseCollection || !Array.isArray(baseCollection)) {
    console.error(`listCountSubfield: Colección '${collectionName}' no encontrada o no es un array`);
    return [];
  }

  // 4. Definir la ruta interna para acceder al campo (sin la colección)
  const internalPath = parts.slice(1).join('.');

  // 5. Función auxiliar para navegar el objeto anidado
  const getNestedValue = (obj, pathStr) => {
    const keys = pathStr.split('.');
    let current = obj;

    for (const key of keys) {
      if (current === null || current === undefined) return undefined;
      if (!current.hasOwnProperty || !current.hasOwnProperty(key)) return undefined;
      current = current[key];
    }
    return current;
  };

  // 6. Agrupar y contar
  const group = {};

  for (const item of baseCollection) {
    // Navegamos hasta el campo final
    const value = getNestedValue(item, internalPath);

    // Si el valor no existe, no es un array, o es null/undefined, lo ignoramos
    if (value === undefined || value === null) continue;

    // Si el valor es un array (ej: status: ["active", "pending"]), contamos cada elemento individualmente
    if (Array.isArray(value)) {
      value.forEach(val => {
        if (val !== undefined && val !== null) {
          const keyName = String(val); // Convertir a string para usar como clave
          group[keyName] = (group[keyName] || 0) + 1;
        }
      });
    } else {
      // Si es un valor simple (ej: status: "active"), lo contamos directamente
      const keyName = String(value);
      group[keyName] = (group[keyName] || 0) + 1;
    }
  }

  // 7. Formatear y retornar resultados
  return Object.keys(group)
    .map(k => ({ name: k, count: group[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};


// HACKME: se adapta a un caso particular 
export const listCountSublist = async (path, limit) => {
  // 1. Validar entrada
  if (!path || typeof path !== 'string') {
    console.error("listCountSublist: Ruta inválida");
    return [];
  }

  const parts = path.split('.');
  
  if (parts.length !== 2) {
    console.error(`listCountSublist: La ruta debe tener formato "coleccion.campo". Recibido: ${path}`);
    return [];
  }

  const [collectionName, fieldName] = parts;

  // 3. Obtener la colección
  const collection = db[collectionName];
  
  if (!collection || !Array.isArray(collection)) {
    console.error(`listCountSublist: Colección '${collectionName}' no encontrada`);
    return [];
  }

  // 4. Agrupar y contar
  const group = {};

  for (const item of collection) {
    const values = item[fieldName];

    // Si el campo no existe o no es un array, lo saltamos
    if (!Array.isArray(values)) continue;

    // Iterar sobre el array de valores (tags, categories, etc.)
    for (const val of values) {
      if (val !== undefined && val !== null) {
        const keyName = String(val);
        group[keyName] = (group[keyName] || 0) + 1;
      }
    }
  }

  // 5. Formatear y retornar
  return Object.keys(group)
    .map(k => ({ name: k, count: group[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};



/*
function listCountSublist(list, sublist,limit){
  const group = {}
  const build_group = list.map(p => {
  const target = p[sublist]

  target.forEach(t => {
      if(!group[t]){ group[t] = 1 ;return; }
      group[t] ++  
    })
  })

  return Object.keys(group)
     .map( k =>  ({name: k, count:   group[k]}))
     .sort((a,b) => b.count - a.count)
     .slice(0, limit+1)   
}

function listCountSubfield(list, subfield,limit){
  const group = {}
  const build_group = list.map(p => {
  const target = p[subfield]

  if(!group[target]){ group[target] = 1; return; }
  group[target] ++  

  return Object.keys(group)
     .map( k =>  ({name: k, count:   group[k]}))
     .sort((a,b) => b.count - a.count)
     .slice(0, limit+1)   
}

*/