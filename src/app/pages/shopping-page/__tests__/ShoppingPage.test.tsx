import { render, screen, fireEvent, act } from '@testing-library/react';
import ShoppingPage from '../ShoppingPage';
import { AppActions } from '@/app/domain/actions-type';
import { AppState, DispatchObject } from '@/app/context/reducer';
import { shoppingCartMock } from '@/app/components/shopping-cart/__mocks__/shoppingCart';
import { useGlobalAppDispatch, useGlobalAppState } from '@/app/context/app-context';


interface Product {
    id: number;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface ShoppingCartProps {
    cart: CartItem[];
    handleIncrement: (id: number) => void;
    handleDecrement: (id: number) => void;
    handleRemove: (id: number) => void;
    calculateTotal: () => number;
}

interface FormProps {
    formData: {
        name: string;
        lastname: string;
        district: string;
        address: string;
        reference: string;
        phone: string;
    };
    errors: {
        name: string;
        lastname: string;
        district: string;
        address: string;
        reference: string;
        phone: string;
    };
    isModalVisible: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onCloseModal: () => void;
}


jest.mock('@/utils/validation', () => ({
    formValidation: () => ({
        name: '',
        lastname: '',
        district: '',
        address: '',
        reference: '',
        phone: '',
    })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

jest.mock('@/app/components/shopping-cart/ShoppingCart', () => ({
    __esModule: true,
    default: ({ handleIncrement, handleDecrement, handleRemove, calculateTotal }: ShoppingCartProps) => (
        <div data-testid="mock-shopping-cart">
            <button onClick={() => handleIncrement(1)}>Increment</button>
            <button onClick={() => handleDecrement(1)}>Decrement</button>
            <button onClick={() => handleRemove(1)}>Remove</button>
            <div data-testid="total">Total: {calculateTotal()}</div>
        </div>
    )
}));

jest.mock('@/app/components/header/Header', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-header">Header</div>
}));

jest.mock('@/app/components/form/Form', () => ({
    __esModule: true,
    default: ({ formData, isModalVisible, onSubmit, onChange, onCloseModal }: FormProps) => (
        <form data-testid="mock-form" onSubmit={onSubmit}>
            <input
                data-testid="name-input"
                name="name"
                value={formData.name}
                onChange={onChange}
            />
            <input
                data-testid="lastname-input"
                name="lastname"
                value={formData.lastname}
                onChange={onChange}
            />
            <input
                data-testid="district-input"
                name="district"
                value={formData.district}
                onChange={onChange}
            />
            <input
                data-testid="address-input"
                name="address"
                value={formData.address}
                onChange={onChange}
            />
            <input
                data-testid="reference-input"
                name="reference"
                value={formData.reference}
                onChange={onChange}
            />
            <input
                data-testid="phone-input"
                name="phone"
                value={formData.phone}
                onChange={onChange}
            />
            <button type="submit">Submit</button>
            {isModalVisible && (
                <button onClick={onCloseModal}>Close Modal</button>
            )}
        </form>
    )
}));

const mockState: AppState = {
    cart: shoppingCartMock,
};

const mockDispatch: React.Dispatch<DispatchObject> = jest.fn();

jest.mock('@/app/context/app-context', () => ({
    useGlobalAppState: jest.fn(),
    useGlobalAppDispatch: jest.fn()
}));


describe('ShoppingPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useGlobalAppState as jest.Mock).mockReturnValue(mockState);
        (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        console.log = jest.fn();
    });

    it('Should renders all main components', () => {
        render(<ShoppingPage />);

        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-shopping-cart')).toBeInTheDocument();
        expect(screen.getByTestId('mock-form')).toBeInTheDocument();
    });

    it('Should handle cart actions correctly', () => {
        render(<ShoppingPage />);

        fireEvent.click(screen.getByText('Increment'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: AppActions.IncrementProduct,
            payload: 1
        });

        fireEvent.click(screen.getByText('Decrement'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: AppActions.DecrementProduct,
            payload: 1
        });

        fireEvent.click(screen.getByText('Remove'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: AppActions.DeleteProduct,
            payload: 1
        });
    });

    it('Should calculate total correctly', () => {
        render(<ShoppingPage />);

        const total = mockState.cart.reduce((sum, item) =>
            sum + (item.product.price * item.quantity), 0);

        expect(screen.getByText(`Total: ${total}`)).toBeInTheDocument();
    });


    it('Should handle form submission correctly and opens modal', async () => {
        render(<ShoppingPage />);

        await act(async () => {
            fireEvent.change(screen.getByTestId('name-input'), {
                target: { name: 'name', value: 'John' }
            });
            fireEvent.change(screen.getByTestId('lastname-input'), {
                target: { name: 'lastname', value: 'Doe' }
            });
            fireEvent.change(screen.getByTestId('district-input'), {
                target: { name: 'district', value: 'District 1' }
            });
            fireEvent.change(screen.getByTestId('address-input'), {
                target: { name: 'address', value: '123 Main St' }
            });
            fireEvent.change(screen.getByTestId('reference-input'), {
                target: { name: 'reference', value: 'Near Park' }
            });
            fireEvent.change(screen.getByTestId('phone-input'), {
                target: { name: 'phone', value: '1234567890' }
            });
        });

        // Submit form
        await act(async () => {
            fireEvent.submit(screen.getByTestId('mock-form'));
        });

        // Check console.log was called with correct data
        expect(console.log).toHaveBeenCalledWith({
            nombre: 'John',
            apellido: 'Doe',
            distrito: 'District 1',
            direccion: '123 Main St',
            referencia: 'Near Park',
            telefono: '1234567890',
            total: expect.any(Number),
            productos: expect.any(Array)
        });

        //modal is visible
        expect(screen.getByText('Close Modal')).toBeInTheDocument();
    });


    describe('ShoppingPage Modal and Navigation', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            (useGlobalAppState as jest.Mock).mockReturnValue(mockState);
            (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        });

        it('closes modal and navigates to home when closing modal', async () => {
            render(<ShoppingPage />);

            await act(async () => {
                fireEvent.change(screen.getByTestId('name-input'), {
                    target: { name: 'name', value: 'John' }
                });
                fireEvent.change(screen.getByTestId('lastname-input'), {
                    target: { name: 'lastname', value: 'Doe' }
                });
                fireEvent.change(screen.getByTestId('district-input'), {
                    target: { name: 'district', value: 'District 1' }
                });
                fireEvent.change(screen.getByTestId('address-input'), {
                    target: { name: 'address', value: '123 Main St' }
                });
                fireEvent.change(screen.getByTestId('reference-input'), {
                    target: { name: 'reference', value: 'Near Park' }
                });
                fireEvent.change(screen.getByTestId('phone-input'), {
                    target: { name: 'phone', value: '1234567890' }
                });
            });

            // Submit form to show modal
            await act(async () => {
                fireEvent.submit(screen.getByTestId('mock-form'));
            });

            // Verify modal is visible
            const closeModalButton = screen.getByText('Close Modal');
            expect(closeModalButton).toBeInTheDocument();

            // Click close modal button
            await act(async () => {
                fireEvent.click(closeModalButton);
            });


        });
    })

});