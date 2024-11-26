import { AppActions } from "../domain/actions-type";
import { ProductResponse } from "../domain/product-response";

export interface AppState {
  cart: {
    product: ProductResponse;
    quantity: number;
  }[];
}

export const initialState: AppState = {
  cart: [],
};

export interface DispatchObject {
  type: AppActions;
  payload?: any;
}

export const appReducer = (state: AppState, action: DispatchObject): AppState => {
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
      // usemos llaves para mejorar la legiblidad
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case AppActions.DecrementProduct:
      // usemos llaves para mejorar la legiblidad
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
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

    default:
      return state;
  }
};
