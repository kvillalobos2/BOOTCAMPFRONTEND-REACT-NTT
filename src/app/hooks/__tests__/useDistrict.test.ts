import { renderHook, act } from "@testing-library/react";
import useDistricts from "../useDistrict";
import { mockDistricts } from "../__mocks__/districtMock";

global.fetch = jest.fn();

describe("useDistrict hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return loading as true initially", () => {
    const { result } = renderHook(() => useDistricts());
    expect(result.current.loading).toBe(true);
    expect(result.current.districts).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("Should fetch and set districts on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDistricts,
    });

    const { result } = renderHook(() => useDistricts());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.districts).toEqual(mockDistricts.districts);
    expect(result.current.error).toBeNull();
  });

  it("Should set error if fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useDistricts());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.districts).toEqual([]);
    expect(result.current.error).toBe("Error al cargar distritos");
  });

  it("Should handle fetch with error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useDistricts());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.districts).toEqual([]);
    expect(result.current.error).toBe("Error al cargar distritos");
  });
});
