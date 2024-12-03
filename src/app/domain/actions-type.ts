import { Dispatch } from "react";
import { DispatchObject } from "../context/reducer";

export type AppDispatch = Dispatch<DispatchObject>;

export const enum AppActions {
  AddToCart = "ADD_TO_CART",
  DeleteProduct = "DELETE_PRODUCT",
  IncrementProduct = "INCREMENT_PRODUCT",
  DecrementProduct = "DECREMENT_PRODUCT",
  CalculateTotal = "CALCULATE_TOTAL",
  ClearCart = "CLEAR_CART",
  SetUser = "SET_USER",
  LogOut = "LOG_OUT"
}
