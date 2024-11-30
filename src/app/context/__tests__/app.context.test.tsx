
import React from "react";
import { renderHook } from "@testing-library/react";
import { AppProvider, useGlobalAppState, useGlobalAppDispatch } from "../app-context";

describe("AppContext", () => {
  describe("AppProvider Component", () => {
    it("Should render children correctly", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      );

      const { result } = renderHook(
        () => ({
          state: useGlobalAppState(),
          dispatch: useGlobalAppDispatch(),
        }),
        { wrapper }
      );

      expect(result.current.state).toBeDefined();
      expect(result.current.dispatch).toBeDefined();
    });
  });

  describe("Context Hooks", () => {
    const originalError = console.error;
    beforeAll(() => {
      console.error = jest.fn();
    });
    
    afterAll(() => {
      console.error = originalError;
    });

    it("Should throw error when useGlobalAppState is used outside provider", () => {
      expect(() => {
        renderHook(() => useGlobalAppState());
      }).toThrow("useGlobalAppState must be used within an AppProvider");
    });
    
    it("Should throw error when useGlobalAppDispatch is used outside provider", () => {
      expect(() => {
        renderHook(() => useGlobalAppDispatch());
      }).toThrow("useGlobalAppDispatch must be used within an AppProvider");
    });
    

    it("Should provide state and dispatch through context", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      );

      const { result } = renderHook(
        () => ({
          state: useGlobalAppState(),
          dispatch: useGlobalAppDispatch(),
        }),
        { wrapper }
      );

      expect(result.current.state).toHaveProperty("cart");
      expect(Array.isArray(result.current.state.cart)).toBe(true);
      expect(result.current.state.cart.length).toBe(0);
    });
  });
  
});