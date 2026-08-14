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
      filters[key] = value;
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

