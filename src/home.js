//Логіка сторінки Home

import { handlerLoadMore, initialHomePage, handlerCategory, handlerProduct, handlerFormSubmit, handlerFormClearButton, handlerThemeButton, handlerScrollTopButton } from "./js/handlers";
import { observer } from "./js/helpers";
import refs from "./js/refs";

document.addEventListener("DOMContentLoaded", initialHomePage);
refs.loadMoreButton.addEventListener("click", handlerLoadMore);
refs.categories.addEventListener("click", handlerCategory);
refs.productsList.addEventListener("click", handlerProduct);
refs.form.addEventListener("submit", handlerFormSubmit);
refs.formClearButton.addEventListener("click", handlerFormClearButton);
refs.themeToggleButton.addEventListener("click", handlerThemeButton);

observer.observe(refs.header);
