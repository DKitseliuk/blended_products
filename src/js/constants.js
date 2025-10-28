const API_BASE_URL = "https://dummyjson.com";

const API_ENDPOINTS = {
    PRODUCTS: "/products",    
    PRODUCTS_BY_ID: "/products/",
    PRODUCTS_BY_SEARCH: "/products/search",
    CATEGORY: "/products/category/",
    CATEGORY_LIST: "/products/category-list"    
};

const MODAL_BUTTONS_TEXT_CONTENT = {    
    ADD_TO_CART: "Add to Cart",
    REMOVE_FROM_CART: "Remove from Cart",
    ADD_TO_WISHLIST: "Add to Wishlist",
    REMOVE_FROM_WISHLIST: "Remove from Wishlist"
}

const LOCAL_STORAGE_KEYS = {
    CART: "cart",
    WISHLIST: "wishlist",
    THEME: "theme",
}

const THEME = {
    LIGHT: "light",
    DARK: "dark",
}

const PER_PAGE = 12;


export { API_BASE_URL, API_ENDPOINTS, MODAL_BUTTONS_TEXT_CONTENT, LOCAL_STORAGE_KEYS, THEME, PER_PAGE };