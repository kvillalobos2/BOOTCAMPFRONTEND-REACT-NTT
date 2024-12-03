import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';  // Importa MemoryRouter
import HomePage from '../HomePage';
import { getProducts } from '@/app/services/product-request';
import { getCategories } from '@/app/services/category-request';
import { AppProvider } from '@/app/context/app-context';
import { productMock } from '../__mocks__/productMock';
import { categoryMock } from '../__mocks__/categoryMock';


jest.mock('@/app/services/product-request', () => ({
  getProducts: jest.fn()
}));

jest.mock('@/app/services/category-request', () => ({
  getCategories: jest.fn()
}));

// Otros mocks
jest.mock('@/app/components/header/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('@/app/components/footer/Footer', () => () => <div data-testid="mock-footer">Footer</div>);
jest.mock('@/app/components/pagination/CircularPagination', () => () => <div data-testid="mock-pagination">Pagination</div>);

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getProducts as jest.Mock).mockResolvedValue(productMock);
    (getCategories as jest.Mock).mockResolvedValue(categoryMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderHomePage = () => {
    return render(
      <AppProvider>
        <MemoryRouter> 
          <HomePage />
        </MemoryRouter>
      </AppProvider>
    );
  };

  test('should initialize state correctly', async () => {
    
    renderHomePage();
    
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    await waitFor(() => {
      const products = screen.getAllByTestId(/^product-card-/);
      expect(products.length).toBeGreaterThan(0);
    });
  });

  test('should handle product loading error', async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(new Error('Failed to load products'));
    renderHomePage();

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toHaveTextContent(/Ocurrió un problema al cargar los productos/i);
    });
  });

  test('should handle category loading error', async () => {
    (getCategories as jest.Mock).mockRejectedValueOnce(new Error('Failed to load categories'));
    renderHomePage();

    await waitFor(() => {
      const errorMessage = screen.getByTestId('category-error');
      expect(errorMessage).toHaveTextContent(/Error al cargar las categorías/i);
    });
  });

  test('should filter products by category', async () => {
    renderHomePage();

    await waitFor(() => {
      const productCards = screen.getAllByTestId(/^product-card-/);
      expect(productCards.length).toBeGreaterThan(0);
    });

    const categorySelect = screen.getByTestId('category-select');
    fireEvent.change(categorySelect, { target: { value: 'category1' } });

    await waitFor(() => {
      const filteredProducts = screen.getAllByTestId(/^product-card-/);
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0]).toHaveTextContent('Product 1');
    });
  });

  test('should filter products by search query', async () => {
    renderHomePage();

    await waitFor(() => {
      const productCards = screen.getAllByTestId(/^product-card-/);
      expect(productCards.length).toBeGreaterThan(0);
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    await waitFor(() => {
      const filteredProducts = screen.getAllByTestId(/^product-card-/);
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0]).toHaveTextContent('Product 1');
    });
  });

  test('should combine category and search filters', async () => {
    renderHomePage();

    await waitFor(() => {
      const productCards = screen.getAllByTestId(/^product-card-/);
      expect(productCards.length).toBeGreaterThan(0);
    });

    const categorySelect = screen.getByTestId('category-select');
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(categorySelect, { target: { value: 'category1' } });
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    await waitFor(() => {
      const filteredProducts = screen.getAllByTestId(/^product-card-/);
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0]).toHaveTextContent('Product 1');
    });
  });
});
