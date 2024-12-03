import { AppActions } from "../domain/actions-type";
import { ProductResponse } from "../domain/product-response";

export interface AppState {
  cart: {
    product: ProductResponse;
    quantity: number;
  }[];
  user: string | null;
}

export const initialState: AppState = {
  cart: [],
  user: null,
};

export interface DispatchObject {
  type: AppActions;
  payload?: any;
}

export const appReducer = (
  state: AppState,
  action: DispatchObject
): AppState => {
  switch (action.type) {
    case AppActions.AddToCart:
      const existingProductIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };

    case AppActions.IncrementProduct:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.product.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case AppActions.DecrementProduct:
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.product.id === action.payload) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };

    case AppActions.DeleteProduct:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case AppActions.ClearCart:
      return {
        ...state,
        cart: [],
      };
    case AppActions.SetUser:
      return {
        ...state,
        user: action.payload,
      };

    case AppActions.LogOut:
      localStorage.clear(); 
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
