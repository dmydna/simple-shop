import { CRUD } from "@utils/enums.js";

//@deprecated
export const WIZARD_CONFIG = [
    { key: 'OPTIONS_CREATE', url: 'Crear Producto',
        skipIf: (mode) => mode === CRUD.UPDATE },
    { key: 'OPTIONS_UPDATE', url: 'Editar Producto',
        skipIf: (mode) => mode === CRUD.CREATE },
    { key: 'BASICS',        url: 'Informacion Basica' },
];
