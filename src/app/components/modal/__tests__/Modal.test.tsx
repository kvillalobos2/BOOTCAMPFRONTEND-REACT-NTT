import { useGlobalAppDispatch } from '@/app/context/app-context';
import useClearCart from '@/app/hooks/useClearCart';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import { AppActions } from '@/app/domain/actions-type'; 

jest.mock('@/app/context/app-context', () => ({
  useGlobalAppDispatch: jest.fn(),
}));

jest.mock('@/app/hooks/useClearCart');

describe('Modal', () => {
  it('Should clear cart and close modal when close button is clicked', () => {
    const mockCloseModal = jest.fn(); 

    // Mock de dispatch
    const mockDispatch = jest.fn();
    (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    // Mock de useClearCart
    const mockClearCart = jest.fn(() => {
      mockDispatch({ type: AppActions.ClearCart });
    });
    (useClearCart as jest.Mock).mockReturnValue(mockClearCart);

    // Renderiza el componente
    render(<Modal closeModal={mockCloseModal} isVisible={true} />);

    fireEvent.click(screen.getByText('Cerrar'));

    expect(mockClearCart).toHaveBeenCalled();

    expect(mockCloseModal).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith({ type: AppActions.ClearCart });
  });

  it('Should not add "show" class when isVisible is false', () => {
    const mockCloseModal = jest.fn();

    // Renderiza el componente con isVisible = false
    const { container } = render(<Modal closeModal={mockCloseModal} isVisible={false} />);


    const modalDiv = container.querySelector('.modal');

    expect(modalDiv).not.toHaveClass('show');
  });
});
