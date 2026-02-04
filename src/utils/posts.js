

const category = Object.freeze({
    GROCERIES: "groceries",
    FURNITURE: "furniture",
    FRAGRANCE:"fragrances",
    BEAUTY:"beauty"
});

const tags = Object.freeze({
    GROCERIES: "groceries",
    FURNITURE: "furniture",
    FRAGRANCE:"fragrances",
    BEAUTY:"beauty",
    FRUITS: "fruits",
    VEGATBLES: "vegetables",
    BEVERAGES: "beverages ",
    DESSERTS: "desserts",
    CONDIMENTS: "condiments",
    SEAFOOD: "seafood"

});


const step = Object.freeze({
    WELCOME: 0,
    PUBLICATION: 1,
    OPTIONS: 2,
    TABLE: 3,
    PRODUCT: 4,
    DETAILS: 5,
    UPLOAD: 6,
});

const stepUrl = Object.freeze({
    WELCOME:     '/panel/welcome',
    PUBLICATION: '/panel/publication',
    OPTIONS:     '/panel/options',
    TABLE:       '/panel/productTable',
    PRODUCT:     '/panel/product',
    DETAILS:     '/panel/details',
    UPLOAD:      '/panel/imageUpload',
});


const stepUrlMap = {
    [step.WELCOME]: stepUrl.WELCOME,
    [step.PUBLICATION]: stepUrl.PUBLICATION,
    [step.OPTIONS]: stepUrl.OPTIONS,
    [step.TABLE]: stepUrl.TABLE,
    [step.PRODUCT]: stepUrl.PRODUCT,
    [step.DETAILS]: stepUrl.DETAILS,
    [step.UPLOAD]: stepUrl.UPLOAD,
}





const visibility = Object.freeze({
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    HIDDEN: "HIDDEN"
});

export {category, tags, visibility, step, stepUrl, stepUrlMap};