
import { FC } from "react";
import "./ShoppingCart.css";
import { ProductInCart } from "../../domain/product-response";
import { FaTrash } from "react-icons/fa";

interface ShoppingCartProps {
  cart: ProductInCart[];
  handleIncrement: (productId: number) => void;
  handleDecrement: (productId: number) => void;
  handleRemove: (productId: number) => void;
  calculateTotal: () => number;
}

const ShoppingCart: FC<ShoppingCartProps> = ({
  cart,
  handleIncrement,
  handleDecrement,
  handleRemove,
  calculateTotal,
}) => {
  return (
    <div className="cart">
      <div className="cart__header">
        <div className="cart__title-container">
          <span className="cart__icon">🛒</span>
          <h2 className="cart__title">Mis compras</h2>
        </div>
      </div>

      <div className="cart__grid-header">
        <div className="cart__grid-header-product">PRODUCTO</div>
        <div className="cart__grid-header-price">PRECIO</div>
        <div className="cart__grid-header-quantity">CANTIDAD</div>
      
      </div>

      {cart.length === 0 ? (
        <p className="cart__empty">Tu carrito está vacío.</p>
      ) : (
        <div className="cart__items">
          {cart.map((item) => (
            <div key={item.product.id} className="cart__item">
              <div className="cart__product-info">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="cart__product-image"
                />
                <div className="cart__product-details">
                  <h3 className="cart__product-title">{item.product.title}</h3>
                </div>
              </div>

              <div className="cart__price">
                <span>${item.product.price.toFixed(2)}</span>
              </div>

              <div className="cart__quantity-controls">
                <button
                  className="cart__quantity-button cart__quantity-button--decrease"
                  onClick={() => handleDecrement(item.product.id)}
                >
                  -
                </button>
                <span className="cart__quantity">{item.quantity}</span>
                <button
                  className="cart__quantity-button cart__quantity-button--increase"
                  onClick={() => handleIncrement(item.product.id)}
                >
                  +
                </button>
              </div>

              <div className="cart__actions">
                <button
                  className="cart__delete-button"
                  onClick={() => handleRemove(item.product.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart__footer">
          <div className="cart__total">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
