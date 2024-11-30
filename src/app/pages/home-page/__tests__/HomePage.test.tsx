import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getCategories } from '@/app/services/category-request';
import { productMock } from '../__mocks__/productMock';
import { categoryMock } from '../__mocks__/categoryMock';
import HomePage from '../HomePage';
import { ProductResponse } from '@/app/domain/product-response';
import { getProducts } from '@/app/services/product-request';

jest.mock('@/app/services/product-request');
jest.mock('@/app/services/category-request');
jest.mock('@/app/components/header/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('@/app/components/footer/Footer', () => () => <div data-testid="mock-footer">Footer</div>);
jest.mock('@/app/components/product/ProductCard', () => {
  return function MockProductCard({ product }: { product: ProductResponse }) {
    return <div data-testid={`product-card-${product.id}`}>{product.title}</div>;
  };
});

describe('HomePage componente ', () => {
  beforeEach(() => {

    jest.clearAllMocks();


    (getProducts as jest.Mock).mockResolvedValue(productMock);
    (getCategories as jest.Mock).mockResolvedValue(categoryMock);
  });

  test('Should render HomePage with all components', async () => {
    render(<HomePage />);


    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    });
  });

  test('Should load and display products', async () => {
    render(<HomePage />);

    expect(getProducts).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
      expect(screen.getByText('Eyeshadow Palette with Mirror')).toBeInTheDocument();
    });
  });

  test('Should load and display categories', async () => {
    render(<HomePage />);

    expect(getCategories).toHaveBeenCalled();

    await waitFor(() => {
      categoryMock.forEach(category => {
        expect(screen.getByRole('option', { name: category })).toBeInTheDocument();
      });
    });
  });

  test('Should filter products by category', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });


    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'beauty' } });

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
      expect(screen.getByText('Eyeshadow Palette with Mirror')).toBeInTheDocument();
    });
  });

  test('Should filter products by search query', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });


    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Mascara' } });

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
      expect(screen.queryByText('Eyeshadow Palette with Mirror')).not.toBeInTheDocument();
    });
  });

  test('Should handle error when loading products', async () => {

    (getProducts as jest.Mock).mockRejectedValue(new Error('Error al cargar productos'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<HomePage />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Ocurrió un problema al cargar los productos');
    });

    consoleSpy.mockRestore();
  });

  test('Should handle error when loading categories', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });


    (getCategories as jest.Mock).mockRejectedValue(new Error('No se pudo cargar las categorías'));

    render(<HomePage />);

    await waitFor(() => {

      expect(consoleSpy).toHaveBeenCalledWith('Error al cargar las categorías', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('Should display no products message when filtered results are empty', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });


    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Non-existent Product' } });


    await waitFor(() => {
      expect(screen.getByText('No hay productos disponibles')).toBeInTheDocument();
    });
  });

  test('Should combines category and search filters', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'beauty' } });


    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Mascara' } });


    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
      expect(screen.queryByText('Eyeshadow Palette with Mirror')).not.toBeInTheDocument();
    });
  });
});