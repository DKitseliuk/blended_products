import { LOCAL_STORAGE_KEYS, THEME } from "./constants";

function addProductToCart(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) ?? [];
    listId.push(id);    
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(listId));
}
 
function removerProductFromCart(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)).filter(item => item !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(listId));
}

function isProductInCart(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) ?? [];
    return listId.includes(id);
}

function productsNumberInCart() {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) ?? [];
    return listId.length;
}

function productsIdFromCart() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) ?? [];
}


function addProductToWishlist(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST)) ?? [];
    listId.push(id);    
    localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(listId));
}

function removeProductFromWishlist(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST)).filter(item => item !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(listId));
}

function isProductInWishlist(id) {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST)) ?? [];
    return listId.includes(id);
}

function productsNumberInWishlist() {
    const listId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST)) ?? [];
    return listId.length;
}

function productsIdFromWishlist() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST)) ?? [];    
}

function setCurrentTheme(newThemeColor) {
    if (newThemeColor === THEME.LIGHT) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEME.LIGHT);
    } else {
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEME.DARK);
    }
}

function getCurrentTheme() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) ?? THEME.LIGHT;
}


export {
    addProductToCart,
    removerProductFromCart,
    isProductInCart,
    productsNumberInCart,
    productsIdFromCart,    
    addProductToWishlist,
    removeProductFromWishlist,
    isProductInWishlist,
    productsNumberInWishlist,
    productsIdFromWishlist,
    setCurrentTheme,
    getCurrentTheme
}