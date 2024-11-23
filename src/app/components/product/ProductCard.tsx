import React from "react";
import { ProductResponse } from "../../domain/product-response";
import './productCard.css';

interface ProductCardI {
  product: ProductResponse;
}

const ProductCard: React.FC<ProductCardI> = ({ product }) => {
  const {
    title,
    price,
    category,
    thumbnail,
    stock,
    discountPercentage,
    id,
  } = product;

  return (
    <div className="product__card" key={id}>
      {discountPercentage > 0 && (
        <div className="product__discount">
          {discountPercentage}% OFF
        </div>
      )}
      <div className="product__header">
        <img
          src={thumbnail}
          alt={title}
          className="product__image"
          loading="lazy"
        />
      </div>
      <div className="product__body">
        <h3 className="product__title">{title}</h3>
        <span className="product__category-badge">
          <span className="product__category-text">Categoría: {category}</span>
        </span>
        <p className="product__stock">Stock: {stock} unidades</p>
        <span className="product__price">${price.toFixed(2)}</span>
        <button className="product__addToCart">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;