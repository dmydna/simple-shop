// src/routes/paths.js

// 1. Definimos las bases de manera centralizada
const BASES = {
  long:  { user: '/user', products: '/products', dashboard: '/dashboard', 
           cart: '/cart', contacts: '/contacts', faq: '/faqs' },
           
  short: { user: '/u',    products: '/p',        dashboard: '/d' }
};

// 2. Una única función que genera la estructura de rutas según las bases que reciba
const createRouteDictionary = (prefixes) => ({
  home: '/',
  cart: prefixes.cart,
  contacts: prefixes.contacts,
  faq:  prefixes.faqs,
  products: {
    root:   prefixes.products,
    filter: `${prefixes.products}/filter`,
    post:   (hash) => `${prefixes.products}/${hash || ':hash'}`,
  },
  user: {
    root:      prefixes.user,
    favorite:  `${prefixes.user}/favorite`,
    account:   `${prefixes.user}/account`,
    overview:  `${prefixes.user}/overview`,
    purchases: `${prefixes.user}/purchases`,
    reviews:   `${prefixes.user}/reviews`,
    profile:   `${prefixes.user}/profile`,
    dashboard: `${prefixes.user}/dashboard`
  }
});

// 3. Exportamos los dos diccionarios limpios e idénticos en estructura
export const PATHS = createRouteDictionary(BASES.long);
export const PATHS_SHORT = createRouteDictionary(BASES.short);