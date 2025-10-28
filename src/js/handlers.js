import { addActiveCategory, removeActiveCategory } from "./helpers";
import { openModal } from "./modal";
import { getCategories, getProductById, getProducts, getProductsByCategory, getProductsBySearch } from "./products-api";
import refs from "./refs";
import { clearProductsList, hideLoader, hideLoadMoreButton, hideNotFoundDiv, initialTheme, renderCategories, renderModal, renderProducts, showLoader, showLoadMoreButton, showNotFoundDiv, themeToggle, udpateCartProductsNumber, udpateWishlistProductsNumber, updateCartCount, updateCartPrice } from "./render-function";
import { productsIdFromCart, productsIdFromWishlist } from "./storage";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let currentPage;
let currentCategory;
let currentSearchValue;

export async function initialHomePage() {

    currentPage = 1;
    currentCategory = "all";
    currentSearchValue = null;

    initialTheme();
    refs.form.reset();
    udpateWishlistProductsNumber();
    udpateCartProductsNumber();
    showLoader();

    try {
        const categoryList = await getCategories();
        renderCategories(categoryList);

        const currentCategoryElement = document.querySelector(".categories__btn");
        addActiveCategory(currentCategoryElement, "categories__btn--active");
        
        const { limit, skip, products, total } = await getProducts(currentPage);
        
        if (products.length) {
            renderProducts(products);
        } else {
            showNotFoundDiv();
        }
               
        if ((limit + skip) < total) {
            showLoadMoreButton();
        }
        
    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerLoadMore() {

    currentPage++;
    hideLoadMoreButton();
    showLoader();

    try {
        const { limit, skip, products, total } = currentSearchValue ? await getProductsBySearch(currentPage, currentSearchValue) : currentCategory === "all" ? await getProducts(currentPage) : await getProductsByCategory(currentPage, currentCategory);
        renderProducts(products);

        if ((limit + skip) < total) {
            showLoadMoreButton();
        }

    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerCategory(event) {

    if (event.target.nodeName !== "BUTTON") {        
        return;
    }

    currentPage = 1;
    currentSearchValue = null;

    hideLoadMoreButton();
    hideNotFoundDiv();
    clearProductsList();

    const categories = document.querySelectorAll(".categories__btn");
    removeActiveCategory(categories, "categories__btn--active");
    addActiveCategory(event.target, "categories__btn--active");
    showLoader();

    try {
        currentCategory = event.target.textContent;
        const { limit, skip, products, total } = currentCategory === "all" ? await getProducts(currentPage) : await getProductsByCategory(currentPage, currentCategory);
        
        if (products.length) {
            renderProducts(products);
        } else {
            showNotFoundDiv();
        }

        if ((limit + skip) < total) {
            showLoadMoreButton();
        }
        
    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }  
}

export async function handlerProduct(event) {
    
    const currentEl = event.target.closest(".products__item");
    if (!currentEl) return;

    const id = Number(currentEl.dataset.id);

    try {     
        const data = await getProductById(id);
        renderModal(data);
        openModal(id);
    } catch (error) {
        console.log(error.message); 
    }
}

export async function handlerFormSubmit(event) {
    event.preventDefault();
        
    currentSearchValue = event.currentTarget.elements.searchValue.value.trim();
    if (!currentSearchValue) {
        currentSearchValue = null;
        return;
    }

    currentPage = 1;
    currentCategory = "all";

    hideLoadMoreButton();
    hideNotFoundDiv();
    clearProductsList();
    showLoader();

    const categories = document.querySelectorAll(".categories__btn");
    removeActiveCategory(categories, "categories__btn--active");

    try {
        const { limit, skip, products, total } = await getProductsBySearch(currentPage, currentSearchValue);

        if (products.length) {
            renderProducts(products);
        } else {
            showNotFoundDiv();
        }

        if ((limit + skip) < total) {
            showLoadMoreButton();
        }
        
    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }
}

export function handlerFormClearButton() {
    hideLoadMoreButton();
    hideNotFoundDiv();
    clearProductsList();
    initialHomePage();    
}

// Wishlist page
export async function initialWishlistPage() {

    initialTheme();
    refs.form.reset();
    udpateWishlistProductsNumber();
    udpateCartProductsNumber();
    clearProductsList();
    showLoader();

    const productsId = productsIdFromWishlist();

    try {
        const productsPromises = productsId.map(async productId => await getProductById(productId))
        const products = await Promise.all(productsPromises);
        
        if (products.length) {
            renderProducts(products);
        } else {
            showNotFoundDiv();
        }

    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }

}

export async function initialCartPage() {
    initialTheme();
    refs.form.reset();
    udpateWishlistProductsNumber();
    udpateCartProductsNumber();
    clearProductsList();
    showLoader();

    const productsId = productsIdFromCart();

    try {
        const productsPromises = productsId.map(async productId => await getProductById(productId))
        const products = await Promise.all(productsPromises);

        updateCartCount();
        updateCartPrice(products);
        
        if (products.length) {
            renderProducts(products);
            
        } else {
            showNotFoundDiv();
        }

    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }

}

export function handlerBuyProductsButton() {
    iziToast.success({
        message: "Products purchased successfully",
        position: "topRight",        
    })
}

export function handlerThemeButton() {
    themeToggle();
}

export function handlerScrollTopButton () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}