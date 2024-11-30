import { render, screen, fireEvent } from '@testing-library/react';
import SearchContainer from '../SearchContainer'; 
import { categoryResponseMock } from '@/app/services/__mocks__/category';

const mockOnCategoryChange = jest.fn();
const mockOnSearchQueryChange = jest.fn();

const defaultProps = {
  categories: categoryResponseMock,
  selectedCategory: 'all',
  searchQuery: '',
  onCategoryChange: mockOnCategoryChange,
  onSearchQueryChange: mockOnSearchQueryChange,
  placeholder: 'Buscar...',
};

describe('SearchContainer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly with default props', () => {
    render(<SearchContainer {...defaultProps} />);

   
    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar...');

    expect(screen.getByText('Todas las categorías')).toBeInTheDocument();

    categoryResponseMock.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('Should render search input with custom placeholder', () => {
    const customPlaceholder = 'Buscar productos...';
    render(<SearchContainer {...defaultProps} placeholder={customPlaceholder} />);
    
    const searchInput = screen.getByPlaceholderText(customPlaceholder);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', customPlaceholder);
  });

  it('Should render search input with initial value', () => {
    const initialSearchQuery = 'inicial';
    render(<SearchContainer {...defaultProps} searchQuery={initialSearchQuery} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
    expect(searchInput.value).toBe(initialSearchQuery);
  });

  it('Should call onCategoryChange when a category is selected', () => {
    render(<SearchContainer {...defaultProps} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'beauty' } });

    expect(mockOnCategoryChange).toHaveBeenCalledWith('beauty');
  });

  it('Should call onSearchQueryChange when the search input changes', () => {
    render(<SearchContainer {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });

    expect(mockOnSearchQueryChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchQueryChange).toHaveBeenCalledWith('Laptop');
  });

  it('Should set the selected category and search query values correctly', () => {
    render(
      <SearchContainer
        {...defaultProps}
        selectedCategory="fragrances"
        searchQuery="perfume"
      />
    );

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    const searchInput = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;

    expect(selectElement.value).toBe('fragrances');
    expect(searchInput.value).toBe('perfume');
  });

  it('Should handle empty categories', () => {
    render(
      <SearchContainer
        {...defaultProps}
        categories={[]}
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement.children).toHaveLength(1);
    expect(screen.getByText('Todas las categorías')).toBeInTheDocument();
  });


});