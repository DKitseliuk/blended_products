//Логіка сторінки Cart
import { handlerProduct, initialCartPage, handlerBuyProductsButton, handlerThemeButton, handlerScrollTopButton } from "./js/handlers";
import { observer } from "./js/helpers";
import refs from "./js/refs";

document.addEventListener("DOMContentLoaded", initialCartPage);
refs.productsList.addEventListener("click", handlerProduct);
refs.cartBuyProductsButton.addEventListener("click", handlerBuyProductsButton);
refs.themeToggleButton.addEventListener("click", handlerThemeButton);
refs.scrollTopButton.addEventListener("click", handlerScrollTopButton);

observer.observe(refs.header);