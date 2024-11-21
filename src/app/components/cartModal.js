// si no le estas reasignando ning'un valor se usa const
const cart = [];
const cartModal = createCartModal();

export function createCartModal() {
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

  export function addToCart(product) {
    cart.push(product);
    updateCartCount();
    renderCart();
    
   
    const button = document.querySelector(`button[data-product-id="${product.id}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = '¡Agregado!';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    }
  }
  
  export function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
  }
  
  export function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cart.length.toString();
  }
  
  export function createCartItemElement(product, index) {
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
    removeButton.onclick = () => removeFromCart(index);
  
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
  
  export function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    while (cartItems.firstChild) {
      cartItems.removeChild(cartItems.firstChild);
    }
  
    if (cart.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No hay productos en el carrito';
      cartItems.appendChild(emptyMessage);
      return;
    }
    
    cart.forEach((product, index) => {
      const cartItem = createCartItemElement(product, index);
      cartItems.appendChild(cartItem);
    });
  }
  
  export function toggleCart(e) {
    if (e) e.preventDefault();
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    if (cartModal.style.display === 'block') {
      renderCart();
    }
  }
    

  