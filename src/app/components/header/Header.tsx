import { FC } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { RiStore2Line, RiLogoutBoxLine } from 'react-icons/ri';
import './Header.css';
import { useGlobalAppDispatch, useGlobalAppState } from '../../context/app-context';
import { ModuleRoutes } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { AppActions } from '@/app/domain/actions-type';

const Header: FC = () => {
  const { cart, user } = useGlobalAppState();
  const dispatch = useGlobalAppDispatch();
  const navigate = useNavigate();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({ type: AppActions.LogOut });
    navigate('/login');
  };

  return (
    <header className="header" >
      <Link to={`/${ModuleRoutes.Home}`} className="header__brand" aria-label="My Market Home">
        <RiStore2Line size={30} className="header__brand-icon" aria-hidden="true" />
        <span className="header__brand-text">My Market</span>
      </Link>
      {user && (
        <div className="header__user">
          <span className="header__user-welcome">
            <strong>Bienvenido:</strong> {user}
          </span>
        </div>
      )}
      <div className="header__actions">
        <Link
          to={`/${ModuleRoutes.ShoppingCart}`}
          className="header__cart"
          aria-label={`Ver carrito de compras - ${totalItems} productos`}
        >
          <FaShoppingCart size={24} className="header__cart-icon" aria-hidden="true" />
          <span className="header__cart-count" aria-live="polite">{totalItems}</span>
        </Link>
        {user && (
          <button onClick={handleLogout} className="header__logout" aria-label="Cerrar sesión">
            <RiLogoutBoxLine size={20} className="header__logout-icon" />
            <span>Cerrar sesión</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
