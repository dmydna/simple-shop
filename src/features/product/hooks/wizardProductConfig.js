import {CRUD} from "../../../utils/crud.js";

export const WIZARD_CONFIG = [
    { key: 'OPTIONS_CREATE', url: 'options_CREATE',
        skipIf: (mode) => mode === CRUD.UPDATE },
    { key: 'OPTIONS_UPDATE', url: 'options_UPDATE',
        skipIf: (mode) => mode === CRUD.CREATE },
    { key: 'PRODUCT',        url: 'product' },
    { key: 'PUBLICATION',    url: 'publication' },
    { key: 'DETAILS',        url: 'details' },
    { key: 'UPLOAD',         url: 'imageUpload' },
];
