import { addToCart } from "./cartModal";

let allProducts = [];

export function createProductElement(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
  
    if (product.discountPercentage > 0) {
      const discountBadge = document.createElement('span');
      discountBadge.className = 'discount-badge';
      discountBadge.textContent = `${product.discountPercentage}%`;
      productCard.appendChild(discountBadge);
    }
  
    const productImage = document.createElement('img');
    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    productImage.className = 'product-image';
  
    const productName = document.createElement('h3');
    productName.className = 'product-name';
    productName.textContent = product.title;
  
    const categoryLabel = document.createElement('h4');
    categoryLabel.className = 'categories';
    categoryLabel.textContent = 'Categoría:';
  
    const categoryBadge = document.createElement('p');
    categoryBadge.className = 'badge';
    categoryBadge.textContent = product.category;
  
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price}`;
  
    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'add-to-cart';
    addToCartButton.textContent = 'Añadir al carrito';
    addToCartButton.dataset.productId = product.id;
    addToCartButton.addEventListener('click', () => addToCart(product));
  
    const stock = document.createElement('p');
    stock.className = 'product-stock';
    stock.textContent = `Stock: ${product.stock} unidades`;
  
    productCard.append(
      productImage,
      productName,
      categoryLabel,
      categoryBadge,
      stock,
      price,
      addToCartButton
    );
  
    return productCard;
  }
  
  export function renderProducts(products) {
    const productsContainer = document.querySelector('.product-grid');
    
    while (productsContainer.firstChild) {
      productsContainer.removeChild(productsContainer.firstChild);
    }
    
    const productElements = products.map(createProductElement);
    productsContainer.append(...productElements);
  }

  

 