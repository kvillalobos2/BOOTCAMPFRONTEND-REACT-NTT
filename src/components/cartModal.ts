import { Product } from '../models/product';
import { CartStore } from '../store/cart';

export class CartModal {
  private modal: HTMLDivElement;
  private cartStore: CartStore;

  constructor(cartStore: CartStore) {
    this.cartStore = cartStore;
    this.modal = this.createModal();
    this.setupEventListeners();
  }

  private createModal(): HTMLDivElement {
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'cart-modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'cart-modal-header';

    const title = document.createElement('h2');
    title.textContent = 'Carrito de Compras';

    const closeButton = document.createElement('button');
    closeButton.className = 'cart-close';
    closeButton.textContent = '×';

    const cartItems = document.createElement('div');
    cartItems.className = 'cart-items';

    modalHeader.appendChild(title);
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(cartItems);
    cartModal.appendChild(modalContent);

    document.body.appendChild(cartModal);
    return cartModal;
  }

  private createCartItemElement(product: Product, index: number): HTMLDivElement {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const img = document.createElement('img');
    img.className = 'cart-item-image';
    img.src = product.thumbnail;
    img.alt = product.title;

    const details = document.createElement('div');
    details.className = 'cart-item-details';

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const removeButton = document.createElement('button');
    removeButton.className = 'cart-item-remove';
    removeButton.onclick = () => {
      this.cartStore.removeItem(index);
      this.renderCart();
      this.updateCartCount();
    };

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash';
    removeButton.appendChild(trashIcon);

    details.appendChild(title);
    details.appendChild(price);
    
    cartItem.appendChild(img);
    cartItem.appendChild(details);
    cartItem.appendChild(removeButton);

    return cartItem;
  }

  private setupEventListeners(): void {
    const closeButton = this.modal.querySelector('.cart-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.toggle());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.toggle();
    });
  }

  public renderCart(): void {
    const cartItems = this.modal.querySelector('.cart-items');
    if (!cartItems) return;

    while (cartItems.firstChild) {
      cartItems.removeChild(cartItems.firstChild);
    }

    const items = this.cartStore.getItems();
    if (items.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No hay productos en el carrito';
      cartItems.appendChild(emptyMessage);
      return;
    }
    
    items.forEach((product, index) => {
      const cartItem = this.createCartItemElement(product, index);
      cartItems.appendChild(cartItem);
    });
  }

  public toggle(e?: Event): void {
    if (e) e.preventDefault();
    this.modal.style.display = this.modal.style.display === 'block' ? 'none' : 'block';
    if (this.modal.style.display === 'block') {
      this.renderCart();
    }
  }

  private updateCartCount(): void {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = this.cartStore.getCount().toString();
    }
  }
}