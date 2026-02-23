

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


const listingStep = Object.freeze({
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
    [listingStep.WELCOME]: stepUrl.WELCOME,
    [listingStep.PUBLICATION]: stepUrl.PUBLICATION,
    [listingStep.OPTIONS]: stepUrl.OPTIONS,
    [listingStep.TABLE]: stepUrl.TABLE,
    [listingStep.PRODUCT]: stepUrl.PRODUCT,
    [listingStep.DETAILS]: stepUrl.DETAILS,
    [listingStep.UPLOAD]: stepUrl.UPLOAD,
}





const visibility = Object.freeze({
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    HIDDEN: "HIDDEN"
});

export {category, tags, visibility, listingStep, stepUrl, stepUrlMap};