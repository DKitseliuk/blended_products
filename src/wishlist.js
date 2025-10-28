//Логіка сторінки Wishlist

import { handlerProduct, handlerScrollTopButton, handlerThemeButton, initialWishlistPage } from "./js/handlers";
import { observer } from "./js/helpers";
import refs from "./js/refs";

document.addEventListener("DOMContentLoaded", initialWishlistPage);
refs.productsList.addEventListener("click", handlerProduct);
refs.themeToggleButton.addEventListener("click", handlerThemeButton);
refs.scrollTopButton.addEventListener("click", handlerScrollTopButton);

observer.observe(refs.header);