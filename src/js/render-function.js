import refs from "./refs";
import { THEME } from "./constants";
import { getCurrentTheme, productsNumberInCart, productsNumberInWishlist, setCurrentTheme } from "./storage";

function renderCategories(categories) {

    const allCategories = ["all", ...categories];

    const markup = allCategories
        .map(item => `
            <li class="categories__item">
                <button class="categories__btn" type="button">${item}</button>
            </li>
        `)
        .join("");
    
    refs.categories.innerHTML = markup;    
}

function renderProducts(products) {

    const markup = products
        .map(({ id, thumbnail, title, brand = "-", category, price }) => `
            <li class="products__item" data-id="${id}">
                <img class="products__image" src="${thumbnail}" alt="${title}"/>
                <p class="products__title">${title}</p>
                <p class="products__brand"><span class="products__brand--bold">Brand: </span>${brand}</p>
                <p class="products__category">Category: ${category}</p>
                <p class="products__price">Price: $${price}</p>
            </li>
        `)
        .join("");
    
    refs.productsList.insertAdjacentHTML("beforeend", markup);
}

function renderModal({ thumbnail, title, tags, description, shippingInformation, returnPolicy, price }) {

    const tagsMarkup = tags
        .map(tag => `
            <li class="modal-product__tags">${tag}</li>
        `)
        .join("");

    const markup = `
        <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${title}</p>
            <ul class="modal-product__tags">${tagsMarkup}</ul>
            <p class="modal-product__description">${description}</p>
            <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
            <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
            <p class="modal-product__price">Price: $${price}</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>
        `;
    
    refs.modalProduct.innerHTML = markup;
}

function clearProductsList() {
    refs.productsList.innerHTML = "";
}

function showLoadMoreButton() {
    refs.loadMoreButton.classList.remove("is-hidden");
}

function hideLoadMoreButton() {
    refs.loadMoreButton.classList.add("is-hidden");
}

function showNotFoundDiv() {
    refs.notFoundDiv.classList.add("not-found--visible");
}

function hideNotFoundDiv() {
    refs.notFoundDiv.classList.remove("not-found--visible");
}

function udpateWishlistProductsNumber() {
    refs.wishlistProductsNumber.textContent = productsNumberInWishlist();
}
function udpateCartProductsNumber() {
    refs.cartProductsNumber.textContent = productsNumberInCart();
}

function updateCartCount() {
    refs.cartProductsCount.textContent = productsNumberInCart();
}

function updateCartPrice(products) {
    const totalPrice = products.reduce((acc, { price }) => acc + price, 0);
    refs.cartProductsPrice.textContent = `$ ${totalPrice.toFixed(2)}`;
}

function showLoader() {
    refs.loader.classList.add("loader");
}

function hideLoader() {    
    refs.loader.classList.remove("loader");
}

function showScrollTopButton() {
    refs.scrollTopButton.classList.add("scroll-top-btn--visible");
};

function hideScrollTopButton() {
    refs.scrollTopButton.classList.remove("scroll-top-btn--visible");
};


function initialTheme() {
    const currentThemeColor = getCurrentTheme();

    if (currentThemeColor === THEME.DARK) {
        setCurrentTheme(THEME.DARK);
        refs.body.setAttribute("data-theme", THEME.DARK);
    } else {
        setCurrentTheme(THEME.LIGHT);
        refs.body.removeAttribute("data-theme");
    }
}

function themeToggle() {
    const currentThemeColor = getCurrentTheme();    
    
    if (currentThemeColor === THEME.LIGHT) {        
        setCurrentTheme(THEME.DARK);
        refs.body.setAttribute("data-theme", THEME.DARK);
    } else {
        setCurrentTheme(THEME.LIGHT);
        refs.body.removeAttribute("data-theme");
    }
}

export {
    renderCategories,
    renderProducts,
    renderModal,
    clearProductsList,
    showLoadMoreButton,
    hideLoadMoreButton,    
    showNotFoundDiv,
    hideNotFoundDiv,
    udpateWishlistProductsNumber,
    udpateCartProductsNumber,
    updateCartCount,
    updateCartPrice,
    showLoader,
    hideLoader,
    showScrollTopButton,
    hideScrollTopButton,
    initialTheme,
    themeToggle
};