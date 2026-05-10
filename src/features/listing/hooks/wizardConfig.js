import {CRUD} from "../../../utils/crud.js";

// @deprecated
export const WIZARD_CONFIG = [
    { key: 'OPTIONS_CREATE', url: 'Crear  Listing' ,
        skipIf: (mode) => mode === CRUD.UPDATE },
    { key: 'OPTIONS_UPDATE', url: 'Editar Listing',
        skipIf: (mode) => mode === CRUD.CREATE },
    { key: 'PRODUCT',        url: 'Informacion Basica' },
    { key: 'PUBLICATION',    url: 'Detalles del Producto' },
    { key: 'DETAILS',        url: 'Garantia y Envio' },
    { key: 'UPLOAD',         url: 'Subir Imagenes' },
];

