import { handlerScrollTopButton } from "./handlers";
import refs from "./refs";
import { hideScrollTopButton, showScrollTopButton } from "./render-function";

export function removeActiveCategory(categories, activeClass ) { 
    categories.forEach(category => {
        category.classList.remove(activeClass);
    });    
}

export function addActiveCategory(activeCategory, activeClass ) {
    activeCategory.classList.add(activeClass);
}


export const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    showScrollTopButton();
    refs.scrollTopButton.addEventListener("click", handlerScrollTopButton);
  } else {
    refs.scrollTopButton.removeEventListener("click", handlerScrollTopButton);
    hideScrollTopButton();
  }
});