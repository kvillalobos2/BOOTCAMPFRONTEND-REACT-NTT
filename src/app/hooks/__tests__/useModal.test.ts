import { renderHook, act } from "@testing-library/react";
import { useModal } from "../useModal";

describe("useModal hook", () => {
  it("Should start with isModalVisible as false", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isModalVisible).toBe(false);
  });

  it("Should set isModalVisible to true when openModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalVisible).toBe(true);
  });

  it("Should set isModalVisible when handleModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleModal();
    });
    expect(result.current.isModalVisible).toBe(true);

    act(() => {
      result.current.handleModal();
    });
    expect(result.current.isModalVisible).toBe(false);
  });

  it("Should set isModalVisible to false when closeModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalVisible).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalVisible).toBe(false);
  });
});
