
import { ProductService } from './services/api';
import { categoryMapper } from './mappers/categoryMapper';
import { CartStore } from './store/cart';
import { CartModal } from './components/cartModal';
import { ProductGrid } from './components/productGrid';
import { ApiResponse } from './types/apiResponse';
import { ApiProduct } from './models/product';
import { productMapper } from './mappers/productMapper';


async function initializeApp(): Promise<void> {
  const cartStore = new CartStore();
  const cartModal = new CartModal(cartStore);
  const productGrid = new ProductGrid('.product-grid', cartStore);

  const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  const categorySelect = document.querySelector('.category-select') as HTMLSelectElement;
  const cartButton = document.querySelector('.cart');

  if (!searchInput || !categorySelect || !cartButton) {
    throw new Error('Required DOM elements not found');
  }

  searchInput.addEventListener('input', () => {
    productGrid.filterProducts(searchInput.value, categorySelect.value);
  });

  categorySelect.addEventListener('change', () => {
    productGrid.filterProducts(searchInput.value, categorySelect.value);
  });

  cartButton.addEventListener('click', (e) => cartModal.toggle(e));

  try {
    const [categoriesResponse, productsResponse]: [ApiResponse<string[]>, ApiResponse<{ products: ApiProduct[] }>] = await Promise.all([
      ProductService.getCategories(),
      ProductService.getAll()
    ]);

    if (categoriesResponse.success && productsResponse.success) {
      const categories = categoriesResponse.data.map(categoryMapper.toViewModel); 
      const products = productsResponse.data.products.map(productMapper.toViewModel);

    
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Todas las categorías';
      categorySelect.appendChild(defaultOption);

      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.label;
        categorySelect.appendChild(option);
      });

      productGrid.setProducts(products);
    } else {
      console.error('Error al cargar los datos:', categoriesResponse.error, productsResponse.error);
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);
