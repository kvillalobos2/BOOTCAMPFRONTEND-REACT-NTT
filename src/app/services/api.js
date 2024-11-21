
import { renderProducts } from "../components/productElement";
import { categoryMapper, productMapper } from "../mappers/productMapper";

let allProducts = [];

export async function fetchProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if(!response.ok){
        throw new Error('No se pudo cargar todos los productos')
      }
      const data = await response.json();
      allProducts = data.products.map(productMapper.toViewModel);
      renderProducts(allProducts);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
  
  export async function fetchCategories() {
    try {
      const response = await fetch('https://dummyjson.com/products/category-list');
      if(!response.ok){
        throw new Error('No se pudo cargar todos las categorías')
      }
      const categories = await response.json();
      const mappedCategories = categories.map(categoryMapper.toViewModel);
      renderCategories(mappedCategories);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  // esta logica deber'ia estar aparte no mezclar las llamadas a apis y procesar datos en un mismo archivo.

  export function renderCategories(categories) {
    const categorySelect = document.querySelector('.category-select');
  
    while (categorySelect.firstChild) {
      categorySelect.removeChild(categorySelect.firstChild);
    }
    
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
  }
  
  export function filterProducts() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const selectedCategory = document.querySelector('.category-select').value;
  
    let filteredProducts = allProducts;
  
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
  
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
  
    renderProducts(filteredProducts);
  }
  

 
  