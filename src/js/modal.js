import { MODAL_BUTTONS_TEXT_CONTENT } from "./constants";
import { initialCartPage, initialWishlistPage } from "./handlers";
import refs from "./refs";
import { udpateCartProductsNumber, udpateWishlistProductsNumber } from "./render-function";
import { addProductToCart, addProductToWishlist, isProductInCart, isProductInWishlist, removeProductFromWishlist, removerProductFromCart } from "./storage";

let productId;

export function openModal(id) {
    productId = id;
    refs.modal.classList.add("modal--is-open");
    if (isProductInWishlist(id)) changeWishlistButtonText(true);
    if (isProductInCart(id)) changeCartButtonText(true);    
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscKey);
    refs.modal.addEventListener("click", onBackdrop);
    refs.modalCloseButton.addEventListener("click", onCloseButton);
    refs.modalWishlistButton.addEventListener("click", onWishlistButton);
    refs.modalCartButton.addEventListener("click", onCartlistButton);
}

function closeModal() {
    productId = null;
    refs.modal.classList.remove("modal--is-open");
    document.body.style.overflow = "";
    changeWishlistButtonText(false);
    changeCartButtonText(false);
    if (window.location.pathname.includes('wishlist.html')) {
        initialWishlistPage();
    }
    if (window.location.pathname.includes('cart.html')) {
        initialCartPage();
    }    
    window.removeEventListener("keydown", onEscKey);
    refs.modal.removeEventListener("click", onBackdrop);
    refs.modalCloseButton.removeEventListener("click", onCloseButton);
    refs.modalWishlistButton.removeEventListener("click", onWishlistButton);
    refs.modalCartButton.removeEventListener("click", onCartlistButton);
}

function onEscKey(event) {
    if (event.code === "Escape") {
        closeModal();
    }
}

function onBackdrop(event) {
    if (event.target === refs.modal) {
        closeModal();
    }
}

function onCloseButton() {    
        closeModal();
}

function onWishlistButton(event) {    

    if (event.currentTarget.textContent.trim() === MODAL_BUTTONS_TEXT_CONTENT.ADD_TO_WISHLIST) {
        addProductToWishlist(productId);        
        changeWishlistButtonText(true);
    } else {
        removeProductFromWishlist(productId);        
        changeWishlistButtonText(false);
    };

    udpateWishlistProductsNumber();
}

function onCartlistButton(event) {    

    if (event.currentTarget.textContent.trim() === MODAL_BUTTONS_TEXT_CONTENT.ADD_TO_CART) {
        addProductToCart(productId);        
        udpateCartProductsNumber();
        changeCartButtonText(true);

    } else {
        removerProductFromCart(productId);
        udpateCartProductsNumber();
        changeCartButtonText(false);
    };
    
}

function changeCartButtonText(isInCart) {
    if (isInCart) {
        refs.modalCartButton.textContent = MODAL_BUTTONS_TEXT_CONTENT.REMOVE_FROM_CART;
    } else {
        refs.modalCartButton.textContent = MODAL_BUTTONS_TEXT_CONTENT.ADD_TO_CART;
    }
}

function changeWishlistButtonText(isInWishlist) {
    if (isInWishlist) {
        refs.modalWishlistButton.textContent = MODAL_BUTTONS_TEXT_CONTENT.REMOVE_FROM_WISHLIST;
    } else {
        refs.modalWishlistButton.textContent = MODAL_BUTTONS_TEXT_CONTENT.ADD_TO_WISHLIST;
    }
}