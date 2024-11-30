import { categoryResponseMock } from "../__mocks__/category";
import { getCategories } from "../category-request";

const mockFetch = (data: any, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      blob: () => Promise.resolve(data),
      clone: () => ({ ...response }),
      Text: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

describe("CategoryRequest", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  //Validar que el método getCategories haga una petición al API
  it("should get categories", async () => {
    mockFetch(categoryResponseMock);
    expect.assertions(2);
    const response = await getCategories();
    expect(response).toBeDefined();
    expect(response).toEqual(categoryResponseMock);
  });

  it("should not load categories", async () => {
    mockFetch({}, 500, false);
    try {
      await getCategories();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should get categories with error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(
        new Error("Hubo un problema al obtener las categorías.")
      );
    try {
      await getCategories();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
