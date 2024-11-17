
import { createCartModal, toggleCart } from "./components/cartModal";
import { fetchCategories, fetchProducts, filterProducts } from "./services/api";

const cartModal = createCartModal();


async function initializeApp() {

  document.querySelector('.search-input').addEventListener('input', filterProducts );
  document.querySelector('.category-select').addEventListener('change', filterProducts);
  document.querySelector('.cart').addEventListener('click', toggleCart);
  document.querySelector('.cart-close').addEventListener('click', toggleCart);
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) toggleCart();
  });


  await Promise.all([
    fetchCategories(),
    fetchProducts()
  ]);
}

document.addEventListener('DOMContentLoaded', initializeApp);