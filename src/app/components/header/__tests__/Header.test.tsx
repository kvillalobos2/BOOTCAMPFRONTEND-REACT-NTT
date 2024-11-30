import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useGlobalAppState } from '@/app/context/app-context';
import { mockCart } from '../__mocks__/cart';

jest.mock('@/app/context/app-context', () => ({
    useGlobalAppState: jest.fn(),
  }));
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

describe('Header Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (useGlobalAppState as jest.Mock).mockReturnValue({
      cart: mockCart,
    });
  });

  it('Should render the cart link with the total items count', () => {
    renderWithRouter(<Header />);

    const cartLink = screen.getByLabelText(/Ver carrito de compras - 5 productos/i);
    expect(cartLink).toBeInTheDocument();

    const cartCount = screen.getByText('5');
    expect(cartCount).toBeInTheDocument();
  });

  it('Should display 0 items in the cart if is empty', () => {
    (useGlobalAppState as jest.Mock).mockReturnValue({
      cart: [],
    });

    renderWithRouter(<Header />);

    const cartLink = screen.getByLabelText(/Ver carrito de compras - 0 productos/i);
    expect(cartLink).toBeInTheDocument();

    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
  });

  
});
