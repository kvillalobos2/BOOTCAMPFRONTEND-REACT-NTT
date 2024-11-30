import { useGlobalAppDispatch } from "@/app/context/app-context";
import { renderHook, act } from "@testing-library/react";
import useClearCart from "../useClearCart";
import { AppActions } from "@/app/domain/actions-type";

jest.mock("@/app/context/app-context", () => ({
  useGlobalAppDispatch: jest.fn(),
}));

describe("useClearCart hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch ClearCart action when clearCart is called", () => {
    const mockDispatch = jest.fn();
    (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useClearCart());

    act(() => {
      result.current();
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: AppActions.ClearCart });
  });

});
