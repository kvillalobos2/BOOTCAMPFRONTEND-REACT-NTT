import { Product } from '../models/product';
import { CartStore } from '../store/cart';

export class ProductGrid {
  private container: HTMLElement;
  private products: Product[] = [];
  private cartStore: CartStore;

  constructor(containerId: string, cartStore: CartStore) {
    const element = document.querySelector(containerId);
    if (!element) throw new Error(`Container ${containerId} not found`);
    
    this.container = element as HTMLElement;
    this.cartStore = cartStore;
  }

  private createProductElement(product: Product): HTMLDivElement {
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
    addToCartButton.dataset.productId = product.id.toString();
    addToCartButton.addEventListener('click', () => this.addToCart(product, addToCartButton));

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

  private addToCart(product: Product, button: HTMLButtonElement): void {
    this.cartStore.addItem(product);
    
    const originalText = button.textContent || '';
    button.textContent = '¡Agregado!';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);

    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = this.cartStore.getCount().toString();
    }
  }

  public setProducts(products: Product[]): void {
    this.products = products;
    this.renderProduct();
  }

  public filterProducts(searchTerm: string, category: string): void {
    let filteredProducts = this.products;

    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower)
      );
    }

    this.renderProduct(filteredProducts);
  }

  private renderProduct(productsToRender: Product[] = this.products): void {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    
    const productElements = productsToRender.map(product => 
      this.createProductElement(product)
    );
    
    this.container.append(...productElements);
  }
}