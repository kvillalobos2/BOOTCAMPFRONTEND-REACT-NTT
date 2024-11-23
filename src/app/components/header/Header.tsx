import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; 
import { RiStore2Line } from 'react-icons/ri'; 
import './Header.css';

const Header: React.FC = () => {
  return(
  <header className="header">

    <a href="#" className="header__brand" aria-label="My Market Home">
      <RiStore2Line size={30} className="header__brand-icon" aria-hidden="true" />
      <span className="header__brand-text">My Market</span>
    </a>


    <a href="#" className="header__cart" aria-label="Ver carrito de compras">
      <FaShoppingCart size={24} className="header__cart-icon" aria-hidden="true" />
      <span className="header__cart-count" aria-live="polite">0</span>
    </a>
  </header>
  );
};

export default Header;
