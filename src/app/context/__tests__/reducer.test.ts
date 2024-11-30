import { AppActions } from "@/app/domain/actions-type";

import { appReducer, AppState, initialState } from "../reducer";
import { productResponseMock } from "@/app/services/__mocks__/product";

const productResponseMock2 = {
  ...productResponseMock,
  id: 3,
};

describe("appReducer", () => {
  describe("AddToCart", () => {
    it("Should add a new product to cart", () => {
      const action = {
        type: AppActions.AddToCart,
        payload: productResponseMock,
      };

      const newState = appReducer(initialState, action);

      expect(newState.cart).toHaveLength(1);
      expect(newState.cart[0]).toEqual({
        product: productResponseMock,
        quantity: 1,
      });
    });

    it("Should initialize with an empty cart", () => {
      const initialState: AppState = { cart: [] };
      expect(initialState.cart).toHaveLength(0);
    });

    it("Should increment quantity if product already exists", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.AddToCart,
        payload: productResponseMock,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(1);
      expect(newState.cart[0].quantity).toBe(2);
    });
  });

  describe("IncrementProduct", () => {
    it("Should increment product quantity", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.IncrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart[0].quantity).toBe(2);
    });

    it("Should keep other products unchanged when incrementing one product", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
          {
            product: productResponseMock2,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.IncrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(2);
      expect(newState.cart[0].quantity).toBe(2);
      expect(newState.cart[1].quantity).toBe(1);
    });

    it("Should handle increment for non-existent product", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.IncrementProduct,
        payload: 999, // Non-existent product ID
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toEqual(currentState.cart);
    });
  });

  describe("DecrementProduct", () => {
    it("Should decrement product quantity when greater than 1", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 2,
          },
        ],
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart[0].quantity).toBe(1);
    });

    it("Should remove product when quantity becomes 0", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(0);
    });

    it("Should keep other products unchanged when decrementing one product", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 2,
          },
          {
            product: productResponseMock2,
            quantity: 3,
          },
        ],
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(2);
      expect(newState.cart[0].quantity).toBe(1);
      expect(newState.cart[1].quantity).toBe(3);
    });

    it("Should handle decrement for non-existent product", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: 999, // Non-existent product ID
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toEqual(currentState.cart);
    });

    it("Should return the product unchanged if quantity is not zero after decrementing", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 2,
          },
        ],
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(1);
      expect(newState.cart[0].product).toEqual(productResponseMock);
      expect(newState.cart[0].quantity).toBe(1);
    });
  });
  describe("DeleteProduct", () => {
    it("Should remove product from cart", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock2,
            quantity: 1,
          },
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.DeleteProduct,
        payload: productResponseMock2.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(1);
      expect(newState.cart[0].product.id).toBe(productResponseMock.id);
    });
  });

  describe("ClearCart", () => {
    it("Should clear all products from cart", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: AppActions.ClearCart,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toHaveLength(0);
    });
  });

  describe("Default case", () => {
    it("Should return the current state for an unknown action type", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
      };

      const action = {
        type: "UNKNOWN_ACTION" as AppActions, // Tipo desconocido
      };

      const newState = appReducer(currentState, action);

      expect(newState).toBe(currentState); // El estado no debe cambiar
    });
  });
});
