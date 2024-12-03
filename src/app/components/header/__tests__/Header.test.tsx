import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useGlobalAppState, useGlobalAppDispatch } from '@/app/context/app-context';
import { mockCart } from '../__mocks__/cart';

jest.mock('@/app/context/app-context', () => ({
  useGlobalAppState: jest.fn(),
  useGlobalAppDispatch: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Header Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGlobalAppState as jest.Mock).mockReturnValue({
      cart: mockCart,
      user: 'John Doe',
    });
    (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

   
    Object.defineProperty(global, 'localStorage', {
      value: {
        clear: jest.fn(),
      },
      writable: true,
    });
    Object.defineProperty(global, 'sessionStorage', {
      value: {
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it('Should render the cart link with the total items count', () => {
    renderWithRouter(<Header />);

    const cartLink = screen.getByLabelText(/Ver carrito de compras - 5 productos/i);
    expect(cartLink).toBeInTheDocument();

    const cartCount = screen.getByText('5');
    expect(cartCount).toBeInTheDocument();
  });

  it('Should display 0 items in the cart if it is empty', () => {
    (useGlobalAppState as jest.Mock).mockReturnValue({
      cart: [],
      user: 'John Doe',
    });

    renderWithRouter(<Header />);

    const cartLink = screen.getByLabelText(/Ver carrito de compras - 0 productos/i);
    expect(cartLink).toBeInTheDocument();

    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
  });

  it('Should display a welcome message if user is logged in', () => {
    renderWithRouter(<Header />);

    const welcomeMessage = screen.getByText(/Bienvenido:/i);
    expect(welcomeMessage).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('Should display the logout button if user is logged in', () => {
    renderWithRouter(<Header />);

    const logoutButton = screen.getByRole('button', { name: /Cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it('Should clear localStorage, sessionStorage, and dispatch logout on logout button click', () => {
    renderWithRouter(<Header />);

    const logoutButton = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalledTimes(1);
    expect(sessionStorage.clear).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOG_OUT' });
  });
});
