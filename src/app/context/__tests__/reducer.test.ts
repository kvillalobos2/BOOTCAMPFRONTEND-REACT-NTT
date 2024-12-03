import { AppActions } from "@/app/domain/actions-type";
import { appReducer, AppState, initialState } from "../reducer";
import { productResponseMock } from "@/app/services/__mocks__/product";

const productResponseMock2 = { ...productResponseMock, id: 3 };

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

    it("Should increment quantity if product already exists", () => {
      const currentState: AppState = {
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
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
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
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
          { product: productResponseMock, quantity: 1 },
          { product: productResponseMock2, quantity: 1 },
        ],
        user: null
      };

      const action = {
        type: AppActions.IncrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart[0].quantity).toBe(2);
      expect(newState.cart[1].quantity).toBe(1);
    });

    it("Should handle increment for non-existent product", () => {
      const currentState: AppState = {
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
      };

      const action = {
        type: AppActions.IncrementProduct,
        payload: 999, 
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toEqual(currentState.cart);
    });
  });

  describe("DecrementProduct", () => {
    it("Should decrement product quantity when greater than 1", () => {
      const currentState: AppState = {
        cart: [{ product: productResponseMock, quantity: 2 }],
        user: null
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
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
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
          { product: productResponseMock, quantity: 2 },
          { product: productResponseMock2, quantity: 3 },
        ],
        user: null
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: productResponseMock.id,
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart[0].quantity).toBe(1);
      expect(newState.cart[1].quantity).toBe(3);
    });

    it("Should handle decrement for non-existent product", () => {
      const currentState: AppState = {
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
      };

      const action = {
        type: AppActions.DecrementProduct,
        payload: 999, 
      };

      const newState = appReducer(currentState, action);

      expect(newState.cart).toEqual(currentState.cart);
    });
  });

  describe("DeleteProduct", () => {
    it("Should remove product from cart", () => {
      const currentState: AppState = {
        cart: [
          { product: productResponseMock2, quantity: 1 },
          { product: productResponseMock, quantity: 1 },
        ],
        user: null
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
          { product: productResponseMock, quantity: 1 },
          { product: productResponseMock, quantity: 1 },
        ],
        user: null
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
        cart: [{ product: productResponseMock, quantity: 1 }],
        user: null
      };

      const action = {
        type: "UNKNOWN_ACTION" as AppActions, 
      };

      const newState = appReducer(currentState, action);

      expect(newState).toBe(currentState); 
    });
  });

  describe("SetUser", () => {
    it("Should set the user to the payload value", () => {
      const currentState: AppState = {
        cart: [],
        user: null,
      };
  
      const action = {
        type: AppActions.SetUser,
        payload: "John Doe",
      };
  
      const newState = appReducer(currentState, action);
  
      expect(newState.user).toBe("John Doe");
    });
  
    it("Should keep the previous cart state when setting the user", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
        user: null,
      };
  
      const action = {
        type: AppActions.SetUser,
        payload: "Jane Doe",
      };
  
      const newState = appReducer(currentState, action);
  
      expect(newState.cart).toHaveLength(1); 
      expect(newState.user).toBe("Jane Doe");
    });
  });
  
  describe("LogOut", () => {
    it("Should clear the user and cart on logout", () => {
     
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
        user: "John Doe",
      };
  
      const action = {
        type: AppActions.LogOut,
      };
  
      const newState = appReducer(currentState, action);
  
      expect(newState.user).toBeNull(); 
      expect(newState.cart).toHaveLength(0); 
    });
  
    it("Should reset the state to the initial state", () => {
      const currentState: AppState = {
        cart: [
          {
            product: productResponseMock,
            quantity: 1,
          },
        ],
        user: "Jane Doe",
      };
  
      const action = {
        type: AppActions.LogOut,
      };
  
      const newState = appReducer(currentState, action);
  
      expect(newState).toEqual(initialState); 
    });
  });
  
});
