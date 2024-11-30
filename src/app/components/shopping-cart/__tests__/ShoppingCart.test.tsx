import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingCart from "../ShoppingCart";
import { shoppingCartMock } from "../__mocks__/shoppingCart";

const mockHandleIncrement = jest.fn();
const mockHandleDecrement = jest.fn();
const mockHandleRemove = jest.fn();
const mockCalculateTotal = jest.fn(() => 40.0);


describe("ShoppingCart component", () => {

    it("Should render shopping cart with products and total", () => {
        render(
            <ShoppingCart
                cart={shoppingCartMock}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );

        // Verificar productos
        expect(screen.getByText("Producto 1")).toBeInTheDocument();
        expect(screen.getByText("Producto 2")).toBeInTheDocument();

        // Verificar precios y cantidades
        expect(screen.getByText("$10.00")).toBeInTheDocument();
        expect(screen.getByText("$20.00")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        
        expect(screen.getByText("Total: $40.00")).toBeInTheDocument();
    });

    it("Should show a message when the shopping cart is empty", () => {
        render(
            <ShoppingCart
                cart={[]}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );

        expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
    });

    it("Should call handleIncrement and handleDecrement when clicking on the buttons", () => {
        render(
            <ShoppingCart
                cart={shoppingCartMock}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );

        const incrementButton = screen.getAllByText("+")[0];
        const decrementButton = screen.getAllByText("-")[0];

        fireEvent.click(incrementButton);
        fireEvent.click(decrementButton);

       
        expect(mockHandleIncrement).toHaveBeenCalledWith(1);
        expect(mockHandleDecrement).toHaveBeenCalledWith(1);
    });


    it("Should call handleIncrement and handleDecrement when clicking on the buttons", () => {
        render(
            <ShoppingCart
                cart={shoppingCartMock}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );

        const incrementButton = screen.getAllByText("+")[0];
        const decrementButton = screen.getAllByText("-")[0];

        fireEvent.click(incrementButton);
        fireEvent.click(decrementButton);

      
        expect(mockHandleIncrement).toHaveBeenCalledWith(shoppingCartMock[0].product.id);
        expect(mockHandleDecrement).toHaveBeenCalledWith(shoppingCartMock[0].product.id);
    });

    it("Should calculate correctly the total", () => {
        render(
            <ShoppingCart
                cart={shoppingCartMock}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );

        expect(mockCalculateTotal).toHaveBeenCalled();
    });

    it("Should call handleRemove when clicking delete button", () => {
        render(
            <ShoppingCart
                cart={shoppingCartMock}
                handleIncrement={mockHandleIncrement}
                handleDecrement={mockHandleDecrement}
                handleRemove={mockHandleRemove}
                calculateTotal={mockCalculateTotal}
            />
        );
    
        const removeButton = document.querySelector('.cart__delete-button');
        if (!removeButton) throw new Error('Delete button not found');
        
        fireEvent.click(removeButton);
    
        expect(mockHandleRemove).toHaveBeenCalledWith(shoppingCartMock[0].product.id);
    });

});