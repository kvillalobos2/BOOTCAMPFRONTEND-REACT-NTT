import { RenderResult, render, screen, fireEvent, act } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { productResponseMock } from "@/app/services/__mocks__/product";
import * as AppContext from "@/app/context/app-context";

jest.mock("@/app/context/app-context", () => ({
  useGlobalAppDispatch: jest.fn(),
  useGlobalAppState: jest.fn(),
  AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderComponent = async (): Promise<RenderResult> => {
  const component = await act(async () => 
    render(<ProductCard product={productResponseMock} />)
  );
  return component;
};

describe("ProductCard component", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (AppContext.useGlobalAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("Should render ProductCard correctly", async () => {
    await renderComponent();

    expect(screen.getByText(productResponseMock.title)).toBeInTheDocument();
    expect(screen.getByText(`Categoría: ${productResponseMock.category}`)).toBeInTheDocument();
    expect(screen.getByText(`$${productResponseMock.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${productResponseMock.stock} unidades`)).toBeInTheDocument();
  });

  it("Should not render discount badge when discountPercentage is 0", async () => {
    const productWithNoDiscount = {
      ...productResponseMock,
      discountPercentage: 0
    };
    
    await act(async () => 
      render(<ProductCard product={productWithNoDiscount} />)
    );
    
    const discountElements = screen.queryAllByText(/% OFF/);
    expect(discountElements).toHaveLength(0);
  });

  
  it("Should call addToCart action when clicking the button", async () => {
    await renderComponent();
    const button = screen.getByText("Añadir al carrito");
    
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: productResponseMock,
    });
  });

  it("Should render the product image", async () => {
    await renderComponent();
    const image = screen.getByAltText(productResponseMock.title);

    expect(image).toHaveAttribute("src", productResponseMock.thumbnail);
    expect(image).toHaveAttribute("alt", productResponseMock.title);
  });
});