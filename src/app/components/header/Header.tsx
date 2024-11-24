import { FC } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { RiStore2Line } from 'react-icons/ri';
import './Header.css';
import { useGlobalAppState } from '../../context/app-context';
import { ModuleRoutes } from '../../routes/routes';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const { cart } = useGlobalAppState();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <Link to={`/${ModuleRoutes.Home}`} className="header__brand" aria-label="My Market Home">
        <RiStore2Line size={30} className="header__brand-icon" aria-hidden="true" />
        <span className="header__brand-text">My Market</span>
      </Link>

      <Link to={`/${ModuleRoutes.ShoppingCart}`} className="header__cart" aria-label={`Ver carrito de compras - ${totalItems} productos`}>
        <FaShoppingCart size={24} className="header__cart-icon" aria-hidden="true" />
        <span className="header__cart-count" aria-live="polite">{totalItems}</span>
      </Link>
    </header>
  );
};

export default Header;  